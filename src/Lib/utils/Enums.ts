export function EnumToArray(e: any) {
    let res: number[] = [];

    for (var key in e) {
        res.push(e[key]);
    }
    res = res.slice(res.length / 2);
    console.log(res);
    return res;
}
