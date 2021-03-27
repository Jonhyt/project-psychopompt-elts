import { EnumToArray } from "./Enums";

export function RandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function RandomFromEnum(e: any) {
    return RandomFromArray(EnumToArray(e));
}

export function RandomNumberRange(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function RandomNumber(max: number) {
    return RandomNumberRange(0, max);
}

export function RandomArrayFromArray<T>(array: T[], num: number): T[] {
    let aux = [...array];
    let res: T[] = [];

    for (let i = 0; i < num; i++) {
        const item = RandomFromArray(aux);
        res.push(item);
        aux = aux.filter((a) => a !== item);
    }

    return res;
}
