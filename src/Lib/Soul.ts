import { Gods } from "../Assets/SoulAssets/Gods";
import { SoulDeaths } from "../Assets/SoulAssets/SoulDeaths";
import { SoulOcupations } from "../Assets/SoulAssets/SoulOccupations";
import { Taboos } from "../Assets/SoulAssets/Taboos";
import { EnumToArray } from "./utils/Enums";
import { RandomArrayFromArray, RandomFromArray, RandomFromEnum, RandomNumber } from "./utils/Random";

export interface Soul {
    name: string;
    occupation: number | null;
    ageDeath: number;
    causeOfDeath: number;
    worships: number[];
    taboosBroken: number[];
}

export function generateSoul() {
    const age = RandomNumber(80);
    let causeOfDeath: SoulDeaths;
    let occupation: SoulOcupations | null = null;
    let taboosBroken: number[] = [];
    let worships: number[] = [];

    if (age < 14) {
        //If character is a child
        causeOfDeath = RandomFromArray([SoulDeaths.Disease, SoulDeaths.MauledAnimals, SoulDeaths.Murdered, SoulDeaths.Starvation]);
    } else {
        //If adult
        causeOfDeath = RandomFromEnum(SoulDeaths);
        occupation = RandomFromEnum(SoulOcupations);
        taboosBroken = getTaboos();
        worships = getGods();
    }

    const res: Soul = {
        name: "TO BE IMPLEMENTED",
        ageDeath: age,
        causeOfDeath: causeOfDeath,
        occupation: occupation,
        taboosBroken: taboosBroken,
        worships: worships,
    };
    return res;
}

function getTaboos() {
    const random = RandomNumber(100);
    let numbOfTaboos = 0;
    //50% chance of breaking 1 taboo
    if (random < 50) numbOfTaboos = 1;
    //25% chance of breaking 2 taboos
    else if (random < 75) numbOfTaboos = 2;
    //5% chance of breaking 3 taboos
    else if (random < 80) numbOfTaboos = 3;
    //20% chance of never having broken a taboo

    return RandomArrayFromArray(EnumToArray(Taboos), numbOfTaboos);
}

function getGods(): number[] {
    const gods = EnumToArray(Gods);
    console.log(gods);
    const res: number[] = [];
    for (let g = 0; g < gods.length; g++) {
        if (RandomNumber(2) === 2) res.push(gods[g]);
    }
    return res;
}
