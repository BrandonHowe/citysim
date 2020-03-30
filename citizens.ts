import {Apartment, Blueprint, Farm, Office} from "./buildings";

const skills: Record<Skill, number> = {
    "software": 7,
    "medicine": 1,
    "accounting": 10,
    "farming": 4,
    "architecture": 2,
    "administration": 3,
};

type Skill = "software" | "medicine" | "accounting" | "farming" | "architecture" | "administration";

class Citizen {
    food: number;
    happiness: number;
    occupation: Office;
    residence: Apartment;
    minimumSalary: number;
    maximumRent: number;

    constructor(public name: string, private money: number, public skill: Skill) {
        this.food = 100;
        this.happiness = 100;
        this.minimumSalary = 130;
        this.maximumRent = 2.5;
        this.occupation = null;
        this.residence = null;
    }

    getHired(company: Office) {
        if (company.industry == this.skill) {
            // console.log("Industry matched")
            if (company.employedCount < company.maxEmployed) {
                // console.log("Space for employee")
                // console.log(this._minimumSalary + "|" + company.salary);
                if (this.minimumSalary < company.salary) {
                    // console.log("Salary match");
                    company.hire(this);
                    this.occupation = company;
                }
            }
        }
    }

    moveIn(location: Apartment) {
        if (this.maximumRent > location.rentPerSqft) {
            location.accept(this);
        }
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
        console.log("office");
        // 2500 sq ft, a small office.
        const officeBlueprint = new Blueprint({x: 40, y: 20, z: 40}, 2);
        return new Office(`${this.name.split(" ")[1]} Inc`, this, officeBlueprint, "software", Math.floor(Math.random() * 100) + 100, 1000);
    }

    foundFarm() {
        // 1 acre large
        const farmBluePrint = new Blueprint({x: 660, y: 10, z: 66}, 1);
        return new Farm(`${this.name.split(" ")[1]} Farms`, this, farmBluePrint, 1000);
    }
}

export {Citizen, Skill, skills};
