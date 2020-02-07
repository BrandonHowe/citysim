const skills = ["software", "doctor", "accounting", "customerservice", "insurance", "architect", "administration"]

class Citizen {
    _food: number;
    _happiness: number;
    _occupation: string;
    _residence: string;
    _minimumSalary: number;
    _maximumRent: number;
    constructor (public _name: string, public _money: number, public _skill: string) {
        this._food = 100;
        this._happiness = 100;
        this._minimumSalary = 130;
        this._maximumRent = 2.5;
        this._occupation = null;
        this._residence = null;
        // this._skill = skills[Math.random() * skills.length];
    }
    get occupation () {
        return this._occupation;
    }
    getHired (company: Office) {
        if (company.industry == this._skill) {
            // console.log("Industry matched")
            if (company.employedCount < company.maxEmployed) {
                // console.log("Space for employee")
                // console.log(this._minimumSalary + "|" + company.salary);
                if (this._minimumSalary < company.salary) {
                    // console.log("Salary match");
                    company.hire(this);
                    this._occupation = company.name;
                }
            }
        }
    }
    moveIn (location: Apartment) {
        if (this._maximumRent > location.rentPerSqft) {
            location.accept(this);
            this._residence = location.name;
        }
    }
}

class Blueprint {
    constructor (public _coords: Array<number>, public _dims: any, public _stories: number){}
    get coords () {
        return this._coords;
    }
    get dims () {
        return this._dims;
    }
    get stories () {
        return this._stories;
    }
    get sizePerFloor () {
        return this.dims.x * this._dims.y;
    }
    get totalSize () {
        return this.sizePerFloor * this._stories;
    }
    get maxPplTotal () {
        return this.totalSize / 15;
    }
}

class Building {
    constructor (public _name: string, public _dims: Blueprint){}
    get name () {
        return this._name;
    }
    get dims () {
        return this._dims;
    }
}

class Apartment extends Building {
    _apartmentsPerFloor: number;
    _totalApartments: number;
    _renters: Array<Citizen>;
    constructor (public _name: string, public _dims: Blueprint, public _apartmentSize: number, public _rentPerSqft: number){
        super(_name, _dims);
        this._renters = [];
        this._apartmentsPerFloor = this._dims.sizePerFloor / this._apartmentSize / 2;
        // divide by 2 to count for "wasted space"; this includes lobbies, hallways, etc
        this._totalApartments = this._dims.stories * this._apartmentsPerFloor;
        // 2.5 dollars per month for 1 square foot of apartment
        // average apartment 500 sq ft
    }
    get name () {
        return this._name;
    }
    get rentPerSqft () {
        return this._rentPerSqft;
    }
    get apartmentsPerFloor () {
        return this._apartmentsPerFloor;
    }
    get totalApartments () {
        return this._totalApartments;
    }
    accept (citizen: Citizen) {
        this._renters.push(citizen);
    }
}

class Office extends Building {
    // the pinnacle of capitalism
    _employed: Array<Citizen>;
    _maxEmployed: number;
    constructor (public _name: string, public _dims: Blueprint, public _industry: string, public _salary: number) {
        super(_name, _dims);
        this._employed = [];
        this._maxEmployed = this._dims.maxPplTotal;
        // console.log(this._maxEmployed)
    }
    get name () {
        return this._name;
    }
    get salary () {
        return this._salary;
    }
    get employedCount () {
        return this._employed.length;
    }
    get maxEmployed () {
        return this._maxEmployed;
    }
    get industry () {
        return this._industry;
    }
    hire (citizen: Citizen) {
        this._employed.push(citizen);
        // console.log(this._employed);
    }
}

const myApartmentBlueprint = new Blueprint ([0, 0, 0], {x: 200, y: 60, z: 200}, 6);
const myApartment = new Apartment ("Trump Apartments", myApartmentBlueprint, 500, 2.3);
// console.log(myApartment.totalApartments);

const myCompany = new Office ("Oficina", myApartmentBlueprint, "software", 200)

const myCitizen = new Citizen ("Joe", 100, "software");
myCitizen.getHired(myCompany)
console.log(myCitizen.occupation);