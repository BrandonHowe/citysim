import {Skill} from "./citizens";

const getRandomFromArr = <T>(arr: Array<T>): T => arr[Math.floor(Math.random() * arr.length)];

const weightedRandom = (obj: Record<Skill, number>): Skill => {
    const totalNum: number = Object.values(obj).reduce((acc, cur) => acc + cur);
    let randFromTotal = Math.floor(Math.random() * totalNum);
    for (const i in obj) {
        if (obj[i as Skill] >= randFromTotal) {
            return i as Skill;
        }
        randFromTotal -= obj[i as Skill];
    }
};

export {getRandomFromArr, weightedRandom};
