import * as faker from 'faker';
import {Blueprint, Building, Farm} from "./buildings";
import {Citizen, skills} from "./citizens";
import {getRandomFromArr, weightedRandom} from "./helpers";

class City {
    day = 0;
    buildings: Record<string, Array<Building>> = {
        farms: [],
        offices: []
    };
    citizens: Array<Citizen> = [];

    constructor() {
    }

    get unemploymentInCity(): number {
        return this.citizens.filter(l => l.occupation === null).length;
    }

    buildFarm(name: string, citizen: Citizen, blueprint: Blueprint, money: number) {
        this.buildings.farms.push(new Farm(name, citizen, blueprint, money));
    }

    newRandomCitizen(amount: number = 1) {
        for (let i = 0; i < amount; i++) {
            this.citizens.push(new Citizen(faker.name.findName(), 100, weightedRandom(skills)));
        }
    }

    runDay() {
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
        this.day++;
    }
}

let myCity = new City();
myCity.newRandomCitizen(1000);
myCity.runDay();
console.log(myCity.buildings.farms.length);
console.log(myCity.buildings.offices.length);
