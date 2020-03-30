import {Citizen} from "./citizens";

class Blueprint {
    // x/z: horizontal y: vertical
    constructor (public dims: Record<string, number>, public stories: number){}
    get sizePerFloor () {
        return this.dims.x * this.dims.z;
    }
    get totalSize () {
        return this.sizePerFloor * this.stories;
    }
    get maxPplTotal () {
        return Math.floor(this.totalSize / 50);
    }
}

class Building {
    protected administrationEff: number;
    public employed: Array<Citizen>;
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
    maxEmployed: number;
    constructor (public name: string, public owner: Citizen, public dims: Blueprint, public industry: string, public salary: number, protected money: number) {
        super(name, owner, dims, money);
        this.maxEmployed = this.dims.maxPplTotal;
    }
    get employedCount () {
        return this.employed.length;
    }
    hire (citizen: Citizen) {
        this.employed.push(citizen);
    }
}

class Farm extends Building {
    plantingDay: number;
    constructor (public name: string, public owner: Citizen, public dims: Blueprint, protected money: number) {
        super(name, owner, dims, money);
        this.employed = [];
        this.administrationEff *= (this.employed.length + 1) / this.peopleNeeded;
    }
    employCitizen (citizen: Citizen) {
        if (citizen.skill === "farming") {
            this.employed.push(citizen);
            this.administrationEff = (this.owner.skill === "administration" ? 1 : 0.75) * (this.employed.length + 1) / this.peopleNeeded;
        }
    }
    get area () {
        // How many square feet does this town take up
        return this.dims.sizePerFloor;
    }
    get peopleNeeded () {
        // 4 people per acre
        return (4 * this.area / 43560) + 1;
    }
    get bushelPerSqFt () {
        // How many bushels are in 1 square foot
        return 135 / 43560;
    }
    buyCorn (day: number) {
        // To plant 1 acre of corn, it costs around $120
        this.plantingDay = day;
        const totalCost = (this.area / 43560) * 120;
        this.money -= totalCost;
    }
    autoHarvest (day: number) {
        if (day >= this.plantingDay + 80) {
            this.harvestCorn();
        }
    }
    private harvestCorn() {
        // Price of 1 dollar per bushel
        this.money += 3.46 * this.bushelPerSqFt * this.area * this.administrationEff;
        this.money = Number(this.money.toFixed(4));
    }
}

export {
    Blueprint,
    Building,
    Apartment,
    Office,
    Farm
}
