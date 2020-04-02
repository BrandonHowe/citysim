import {Blueprint} from "./buildings";
import {Citizen} from "./citizens";

class PowerPlant {
    // Watt production per sqft per hour
    employed: Citizen[] = [];
    pay: number;

    constructor(public name: string, public type: string, public dims: Blueprint, public production: number) {
        this.pay = 100;
    }

    get prodPerDay() {
        return this.dims.sizePerFloor * this.production * 8;
    }

    destroyCompany() {
        return true;
    }
}

class SolarPanel extends PowerPlant {
    constructor(public name: string, dims: Blueprint) {
        super(name, "Solar Panel", dims, 0.2);
    }
}

class WindTurbine extends PowerPlant {
    constructor(public name: string, dims: Blueprint) {
        super(name, "Wind Farm", dims, 0.4);
    }
}

class CoalFarm extends PowerPlant {
    constructor(public name: string, dims: Blueprint) {
        super(name, "Coal Plant", dims, 3);
    }
}

export {PowerPlant, CoalFarm, WindTurbine, SolarPanel};
