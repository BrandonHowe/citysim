/* eslint-disable */

import * as faker from 'faker';
import {Apartment, Blueprint, Building, Farm, Office, SoftwareProduct} from "./buildings";
import {Citizen, skills} from "./citizens";
import {getRandomFromArr, weightedRandom} from "./helpers";
import {PowerPlant} from "./powerplants";

interface Buildings {
    farms: Farm[];
    offices: Office[];
    power: PowerPlant[];
    apartments: Apartment[];
}

class City {
    day = 0;
    buildings: Buildings = {
        farms: <Farm[]>[],
        offices: <Office[]>[],
        power: <PowerPlant[]>[],
        apartments: <Apartment[]>[]
    };
    citizens: Array<Citizen> = [];
    software: Array<SoftwareProduct> = [];

    constructor() {
    }

    get totalHousing(): number {
        let totalHousing = 0;
        for (const apartment of this.buildings.apartments) {
            totalHousing += apartment.totalApartments;
        }
        return totalHousing;
    }

    get powerNeeded(): number {
        let totalBuildings = this.buildings.offices.length + this.buildings.farms.length;
        return totalBuildings * 20000;
    }

    get powerGenerationInCity(): number {
        let total = 0;
        for (const plant of <PowerPlant[]>this.buildings.power) {
            total += plant.prodPerDay;
        }
        return total;
    }

    get unemploymentInCity(): number {
        return this.citizens.filter(l => l.occupation === null).length;
    }

    buildFarm(name: string, citizen: Citizen, blueprint: Blueprint, pay: number, money: number) {
        this.buildings.farms.push(new Farm(name, citizen, blueprint, pay, money));
    }

    newRandomCitizen(amount: number = 1) {
        for (let i = 0; i < amount; i++) {
            this.citizens.push(new Citizen(faker.name.findName(), 100, weightedRandom(skills)));
        }
    }

    sellAllSoftware() {
        for (const software of this.software) {
            if (this.day < software.releaseDay + 180) {
                const sellCopies = Math.floor(Math.random() * 100) + 100;
                software.company.sellSoftware(software.quality * sellCopies);
            } else {
                software.company.destroyProduct();
                this.software.splice(this.software.indexOf(software), 1);
            }
        }
    }

    get totalMoney() {
        let total = 0;
        for (const office of this.buildings.offices) {
            total += office.money;
        }
        return total;
    }

    get sustainabilityScore () {
        let score = 0;
        const powerGenScore = this.powerGenerationInCity / this.powerNeeded;
        score += 15 * ((powerGenScore > 1) ? 1 : powerGenScore);
        const powerTypeScore = this.buildings.power.filter(l => l.type !== "Coal Plant").length / (this.buildings.power.length === 0 ? 1 : this.buildings.power.length);
        score += 25 * powerTypeScore;
        const foodGenScore = this.buildings.farms.length / (this.citizens.length / 46);
        score += 40 * ((foodGenScore > 1) ? 1 : foodGenScore);
        const housingScore = this.totalHousing / this.citizens.length;
        score += (housingScore > 1 ? 1 : housingScore) * 20;
        return score;
    }

    checkImmigration() {
        if (this.totalMoney > 0) {
            this.newRandomCitizen(Math.floor(Math.random() * 20));
        }
    }

    create(arg: string) {
        const newCitizen = new Citizen (faker.name.findName(), 100, "administration");
        switch (arg) {
            case "Apartment":
                this.buildings.apartments.push(newCitizen.foundApartment());
                this.citizens.push(newCitizen);
                return true;
            case "Office":
                this.buildings.offices.push(newCitizen.foundOffice(this.day));
                this.citizens.push(newCitizen);
                return true;
            case "Farm":
                this.buildings.farms.push(newCitizen.foundFarm());
                this.citizens.push(newCitizen);
                return true;
            case "Coal Plant":
                this.buildings.power.push(newCitizen.foundPowerPlant("coal"));
                this.citizens.push(newCitizen);
                return true;
            case "Wind Farm":
                this.buildings.power.push(newCitizen.foundPowerPlant("wind"));
                this.citizens.push(newCitizen);
                return true;
            case "Solar Field":
                this.buildings.power.push(newCitizen.foundPowerPlant("solar"));
                return true;
            default:
                return false;
        }
    }

    runDay(amount: number = 1) {
        for (let i = 0; i < amount; i++) {
            for (const citizen of this.citizens.filter(l => l.skill === "administration")) {
                // The first step is to found any new buildings/companies
                if (citizen.occupation) {
                    continue;
                }
                if (this.totalHousing < this.citizens.length) {
                    if (this.citizens.length > 1000) {
                        getRandomFromArr(this.buildings.apartments).upgradeApartment();
                    } else {
                        this.buildings.apartments.push(citizen.foundApartment());
                    }
                } else if (this.buildings.farms.length < this.citizens.length / 23) {
                    // Build a farm if there isn't enough food and we don't have over 60 farms
                    if (this.buildings.farms.length < 60) {
                        this.buildings.farms.push(citizen.foundFarm());
                    } else {
                        getRandomFromArr(this.buildings.farms).upgradeFarm();
                    }
                } else if (this.powerNeeded > this.powerGenerationInCity) {
                    this.buildings.power.push(citizen.foundPowerPlant());
                } else if (this.unemploymentInCity / this.citizens.length > 0.2) {
                    // Build an office if the unemployment is too high
                    this.buildings.offices.push(citizen.foundOffice(this.day));
                }
            }
            for (const citizen of this.citizens.filter(l => l.skill !== "administration" && !l.occupation)) {
                // If they don't have a job, get one
                if (citizen.skill === "farming") {
                    if (this.buildings.farms.length > 0) {
                        const highestPayingFarm: Farm = <Farm>this.buildings.farms.reduce((arr: Farm, acc: Farm) => arr.pay > acc.pay || acc.employed.length >= acc.maxEmployed ? arr : acc);
                        citizen.getHired(highestPayingFarm);
                    }
                } else if (citizen.skill === "software" || citizen.skill === "accounting") {
                    if (this.buildings.offices.length > 0) {
                        const highestPayingOffice: Office = <Office>this.buildings.offices.reduce((arr: Office, acc: Office) => arr.pay >= acc.pay ? arr : acc);
                        citizen.getHired(highestPayingOffice);
                    }
                } else {
                    if (this.buildings.offices.length > 0) {
                        const emptiestOffice: Office = <Office>this.buildings.offices.reduce((arr: Office, acc: Office) => arr.employed.length <= acc.employed.length || acc.employed.filter(l => l.skill === "maintenance").length >= 5 ? arr : acc);
                        citizen.getHired(emptiestOffice);
                    }
                }
            }
            for (const citizen of this.citizens.filter(l => l.skill === "software" || l.skill === "accounting")) {
                // Switch jobs if it's good for them
                citizen.switchJobs(<Office[]>this.buildings.offices);
            }
            for (const office of <Office[]>this.buildings.offices) {
                // Daily office management
                office.payCitizens();
                office.changePay();
                const isBankrupt = office.checkBankruptcy(this.day);
                if (isBankrupt) {
                    this.software.splice(this.software.findIndex(l => l.company === office), 1);
                    office.owner.occupation = null;
                    this.buildings.offices.splice(this.buildings.offices.indexOf(office), 1);
                }
                office.developProduct(this.day);
                const software = office.releaseProduct(this.day);
                if (software) {
                    this.software.push({...office.currentProduct});
                }
            }
            for (const farm of <Farm[]>this.buildings.farms) {
                // Daily farm management
                farm.payCitizens();
                farm.changePay();
                const isBankrupt = farm.checkBankruptcy(this.day);
                if (isBankrupt && isNaN(farm.money)) {
                    farm.owner.occupation = null;
                    this.buildings.farms.splice(this.buildings.farms.indexOf(farm), 1);
                }
                farm.plantCorn(this.day);
                farm.autoHarvest(this.day);
            }
            for (const apartment of this.buildings.apartments) {
                apartment.collectRent();
                apartment.changeRent();
            }
            for (const citizen of this.citizens.filter(l => !l.residence)) {
                // Move in if they don't have a home
                const bestRentApartment = this.buildings.apartments.reduce((acc, cur) => acc.rentPrice < cur.rentPrice && !acc.isFull ? acc : cur);
                citizen.moveIn(bestRentApartment);
            }
            this.checkImmigration();
            this.sellAllSoftware();
            this.day++;
        }
    }
}

export {City}
