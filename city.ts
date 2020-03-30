import * as faker from 'faker';
import {Blueprint, Building, Farm} from "./buildings";
import {Citizen, skills} from "./citizens";
import {getRandomFromArr} from "./helpers";

class City {
    day = 0;
    buildings: Record<string, Array<Building>>;
    citizens: Array<Citizen>;
    constructor () {
        this.buildings.farms = [];
    }
    buildFarm (name: string, citizen: Citizen, blueprint: Blueprint, money: number) {
        this.buildings.farms.push(new Farm(name, citizen, blueprint, money));
    }
    newRandomCitizen(amount: number = 1) {
        for (let i = 0; i < amount; i++) {
            this.citizens.push(new Citizen(faker.name.findName(), 100, getRandomFromArr(skills)));
        }
    }
    runDay() {
        this.day++;
    }
}
