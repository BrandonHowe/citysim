import {Apartment, Blueprint, Building, Farm, Office} from "./buildings";

const skills: Record<Skill, number> = {
    "software": 7,
    "medicine": 1,
    "accounting": 10,
    "farming": 4,
    "maintenance": 2,
    "administration": 3,
};

type Skill = "software" | "medicine" | "accounting" | "farming" | "maintenance" | "administration";

class Citizen {
    food: number;
    happiness: number;
    occupation: Building;
    residence: Apartment;

    constructor(public name: string, private money: number, public skill: Skill) {
        this.food = 100;
        this.happiness = 100;
        this.occupation = null;
        this.residence = null;
    }

    getHired(company: Office | Farm) {
        if (company.employed.length < company.maxEmployed) {
            company.hire(this);
        }
    }

    moveIn(location: Apartment) {
        location.accept(this);
    }

    moveOut() {
        this.residence.evict(this);
    }

    payRent() {
        if (this.money > this.residence.rentPrice) {
            this.money -= this.residence.rentPrice;
            this.residence.payRent(this);
        }
    }

    foundOffice() {
        // 2500 sq ft, a small office.
        const officeBlueprint = new Blueprint({x: 40, y: 20, z: 40}, 2);
        return new Office(`${this.name.split(" ")[1]} Inc`, this, officeBlueprint, "software", Math.floor(Math.random() * 100) + 150, 1000);
    }

    foundFarm() {
        // 1 acre large
        const farmBluePrint = new Blueprint({x: 660, y: 10, z: 66}, 1);
        return new Farm(`${this.name.split(" ")[1]} Farms`, this, farmBluePrint, Math.floor(Math.random() * 40) + 80, 1000);
    }
}

export {Citizen, Skill, skills};
