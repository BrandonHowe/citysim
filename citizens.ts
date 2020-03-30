import {Apartment, Office} from "./buildings";

class Citizen {
    food: number;
    happiness: number;
    occupation: Office;
    residence: Apartment;
    minimumSalary: number;
    maximumRent: number;
    constructor (public name: string, private money: number, public skill: string) {
        this.food = 100;
        this.happiness = 100;
        this.minimumSalary = 130;
        this.maximumRent = 2.5;
        this.occupation = null;
        this.residence = null;
        // this._skill = skills[Math.random() * skills.length];
    }
    getHired (company: Office) {
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
    moveIn (location: Apartment) {
        if (this.maximumRent > location.rentPerSqft) {
            location.accept(this);
        }
    }
    moveOut () {
        this.residence.evict(this);
    }
    payRent () {
        if (this.money > this.residence.rentPrice) {
            this.money -= this.residence.rentPrice;
            this.residence.payRent(this);
        }
    }
}

export { Citizen };
