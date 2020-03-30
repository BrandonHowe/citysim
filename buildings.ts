import {Citizen} from "./index";

class Blueprint {
    constructor (public dims: Record<string, number>, public stories: number){}
    get sizePerFloor () {
        return this.dims.x * this.dims.y;
    }
    get totalSize () {
        return this.sizePerFloor * this.stories;
    }
    get maxPplTotal () {
        return this.totalSize / 15;
    }
}

class Building {
    protected administrationEff: number;
    protected constructor (public name: string, public owner: Citizen, public dims: Blueprint, protected money: number) {
        this.administrationEff = owner.skill === "administration" ? 1 : 0.75;
    }
}

class Apartment extends Building {
    apartmentsPerFloor: number;
    totalApartments: number;
    private renters: Array<Citizen>;
    constructor (public name: string, public owner: Citizen, public dims: Blueprint, public apartmentSize: number, public rentPerSqft: number, protected money){
        super(name, owner, dims, money);
        this.renters = [];
        this.apartmentsPerFloor = this.dims.sizePerFloor / this.apartmentSize / 2;
        // divide by 2 to count for "wasted space"; this includes lobbies, hallways, etc
        this.totalApartments = this.dims.stories * this.apartmentsPerFloor;
        // 2.5 dollars per month for 1 square foot of apartment
        // average apartment 500 sq ft
    }
    get rentPrice () {
        return this.apartmentSize * this.rentPerSqft;
    }
    accept (citizen: Citizen) {
        if (this.renters.length < this.totalApartments) {
            this.renters.push(citizen);
            citizen.residence = this;
        }
    }
    evict(citizen: Citizen) {
        this.renters.splice(this.renters.indexOf(citizen), 1);
    }
    collectRent () {
        for (const citizen of this.renters) {
            citizen.payRent();
        }
    }
    payRent(citizen: Citizen) {
        this.money += this.rentPrice * this.administrationEff;
    }
}

class Office extends Building {
    // the pinnacle of capitalism
    employed: Array<Citizen>;
    maxEmployed: number;
    constructor (public name: string, public owner: Citizen, public dims: Blueprint, public industry: string, public salary: number, protected money: number) {
        super(name, owner, dims, money);
        this.employed = [];
        this.maxEmployed = this.dims.maxPplTotal;
    }
    get employedCount () {
        return this.employed.length;
    }
    hire (citizen: Citizen) {
        this.employed.push(citizen);
    }
}

export {
    Blueprint,
    Building,
    Apartment,
    Office
}
