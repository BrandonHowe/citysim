import {Apartment, Blueprint, Office, Farm} from "./buildings";
import {Citizen} from "./citizens";


const myFarmBlueprint = new Blueprint ({x: 660, y: 60, z: 66}, 6);
const myCitizen = new Citizen ("Joe", 100, "administration");
// const myApartment = new Apartment ("Trump Apartments", myCitizen, myApartmentBlueprint, 500, 2.3, 0);
// // console.log(myApartment.totalApartments);
//
// const myCompany = new Office ("Oficina", myCitizen, myApartmentBlueprint, "software", 200, 0);
//
// myCitizen.getHired(myCompany);
// console.log(myCitizen.occupation);

// const myFarm = new Farm("Farmie", myCitizen, myFarmBlueprint, 100);
// myFarm.buyCorn(0);
// myFarm.autoHarvest(80);
// console.log(myFarm);
