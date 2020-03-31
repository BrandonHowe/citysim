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
    }

    sellAllSoftware () {
        for (const software of this.software) {
            if (this.day < software.releaseDay + 180) {
                const sellCopies = Math.floor(Math.random() * 300) + 400;
                console.log(`sold ${sellCopies} copies! ${software.company.money}`);
                software.company.sellSoftware(software.quality * sellCopies);
            } else {
                this.software.splice(this.software.indexOf(software), 1);
            }
        }
    }

    runDay(amount: number = 1) {
        for (let i = 0; i < amount; i++) {
            console.log(`Day ${this.day}`);
            for (const citizen of this.citizens.filter(l => l.skill === "administration")) {
                // The first step is to found any new buildings/companies
                if (this.buildings.farms.length < this.citizens.length / 23) {
                    // Build a farm if there isn't enough food
                    this.buildings.farms.push(citizen.foundFarm());
                } else if (this.unemploymentInCity / this.citizens.length > 0.4) {
                    // Build an office if the unemployment is too high
                    this.buildings.offices.push(citizen.foundOffice(this.day));
                }
            }
            for (const citizen of this.citizens.filter(l => l.skill !== "administration" && l.occupation === null)) {
                if (citizen.skill === "farming") {
                    const highestPayingFarm: Farm = <Farm>this.buildings.farms.reduce((arr: Farm, acc: Farm) => arr.pay > acc.pay || acc.employed.length >= acc.maxEmployed ? arr : acc);
                    citizen.getHired(highestPayingFarm);
                } else if (citizen.skill === "software" || citizen.skill === "accounting") {
                    const highestPayingOffice: Office = <Office>this.buildings.offices.reduce((arr: Office, acc: Office) => arr.pay >= acc.pay ? arr : acc);
                    citizen.getHired(highestPayingOffice);
                } else {
                    const emptiestOffice: Office = <Office>this.buildings.offices.reduce((arr: Office, acc: Office) => arr.employed.length <= acc.employed.length || acc.employed.filter(l => l.skill === "maintenance").length >= 5 ? arr : acc);
                    citizen.getHired(emptiestOffice);
                }
            }
            for (const office of <Office[]>this.buildings.offices) {
                office.payCitizens();
                office.changePay();
                const isBankrupt = office.checkBankruptcy(this.day);
                if (isBankrupt) {
                    this.software.splice(this.software.findIndex(l => l.company === office), 1);
                    this.buildings.offices.splice(this.buildings.offices.indexOf(office), 1);
                }
                office.developProduct(this.day);
                const software = office.releaseProduct(this.day);
                if (software) {
                    console.log("software released!");
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
myCity.newRandomCitizen(250);
myCity.runDay(366);
// console.log(myCity.buildings.farms.length);
// console.log(myCity.buildings.offices);
