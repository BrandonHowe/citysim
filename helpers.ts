import {Skill} from "./citizens";

const getRandomFromArr = <T>(arr: Array<T>): T => arr[Math.floor(Math.random() * arr.length)];

const weightedRandom = (obj: Record<Skill, number>): Skill => {
    const totalNum: number = Object.values(obj).reduce((acc, cur) => acc + cur);
    let randFromTotal = Math.floor(Math.random() * totalNum);
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (obj[i] >= randFromTotal) {
                return <Skill>i;
            }
            randFromTotal -= obj[i];
        }
    }
};

export { getRandomFromArr, weightedRandom };
