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
                software.company.sellSoftware(software.quality * 100);
            } else {
                this.software.splice(this.software.indexOf(software), 1);
            }
        }
    }

    runDay(amount: number = 1) {
        for (let i = 0; i < amount; i++) {
            for (const citizen of this.citizens.filter(l => l.skill === "administration")) {
                // The first step is to found any new buildings/companies
                if (this.buildings.farms.length < this.citizens.length / 23) {
                    // Build a farm if there isn't enough food
                    this.buildings.farms.push(citizen.foundFarm());
                } else if (this.unemploymentInCity / this.citizens.length > 0.4) {
                    // Build an office if the unemployment is too high
                    this.buildings.offices.push(citizen.foundOffice());
                }
            }
            for (const citizen of this.citizens.filter(l => l.skill !== "administration" && l.occupation === null)) {
                if (citizen.skill === "farming") {
                    const highestPayingFarm: Farm = <Farm>this.buildings.farms.reduce((arr: Farm, acc: Farm) => arr.pay > acc.pay || acc.employed.length >= acc.maxEmployed ? arr : acc);
                    citizen.getHired(highestPayingFarm);
                } else if (citizen.skill === "software" || citizen.skill === "accounting") {
                    const highestPayingOffice: Office = <Office>this.buildings.offices.reduce((arr: Office, acc: Office) => arr.pay >= acc.pay ? arr : acc);
                    citizen.getHired(highestPayingOffice);
                }
            }
            for (const office of <Office[]>this.buildings.offices) {
                office.developProduct(this.day);
                const software = office.releaseProduct(this.day);
                if (software) {
                    this.software.push(software);
                }
            }
            this.sellAllSoftware();
            this.day++;
        }
    }
}

let myCity = new City();
myCity.newRandomCitizen(250);
myCity.runDay(2);
// console.log(myCity.buildings.farms.length);
// console.log(myCity.buildings.offices);
