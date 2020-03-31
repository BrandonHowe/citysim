import * as faker from 'faker';
import {Blueprint, Building, Farm, Office, SoftwareProduct} from "./buildings";
import {Citizen, skills} from "./citizens";
import {getRandomFromArr, weightedRandom} from "./helpers";

class City {
    day = 0;
    buildings: Record<string, Array<Building>> = {
        farms: <Farm[]>[],
        offices: <Office[]>[]
    };
    citizens: Array<Citizen> = [];
    software: Array<SoftwareProduct> = [];

    constructor() {
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
        console.log(this.citizens.filter(l => l.skill === "administration").length);
    }

    sellAllSoftware () {
        for (const software of this.software) {
            if (this.day < software.releaseDay + 180) {
                const sellCopies = Math.floor(Math.random() * 100) + 100;
                console.log(`sold ${sellCopies} copies! ${software.company.money}`);
                software.company.sellSoftware(software.quality * sellCopies);
            } else {
                this.software.splice(this.software.indexOf(software), 1);
            }
        }
    }

    runDay(amount: number = 1) {
        for (let i = 0; i < amount; i++) {
            // console.log(`Day ${this.day}: ${this.buildings.offices.length} offices`);
            console.log(Array.from(<Office[]>myCity.buildings.offices, l => l.money));
            for (const citizen of this.citizens.filter(l => l.skill === "administration")) {
                // The first step is to found any new buildings/companies
                if (citizen.occupation) {
                    continue;
                }
                if (this.buildings.farms.length < this.citizens.length / 23) {
                    // Build a farm if there isn't enough food
                    this.buildings.farms.push(citizen.foundFarm());
                } else if (this.unemploymentInCity / this.citizens.length > 0.2) {
                    // Build an office if the unemployment is too high
                    this.buildings.offices.push(citizen.foundOffice(this.day));
                }
            }
            for (const citizen of this.citizens.filter(l => l.skill !== "administration" && l.occupation === null)) {
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
                citizen.switchJobs(<Office[]>this.buildings.offices);
            }
            for (const office of <Office[]>this.buildings.offices) {
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
                farm.payCitizens();
                farm.changePay();
                const isBankrupt = farm.checkBankruptcy(this.day);
                if (isBankrupt) {
                    this.buildings.farms.splice(this.buildings.farms.indexOf(farm), 1);
                }
            }
            this.sellAllSoftware();
            this.day++;
        }
    }
}

let myCity = new City();
myCity.newRandomCitizen(1000);
myCity.runDay(2000);
console.log(myCity.buildings.offices);
console.log(myCity.citizens.filter(l => l.skill === "administration").length);
console.log(myCity.unemploymentInCity);
