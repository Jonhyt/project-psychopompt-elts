import { Gods } from "../../Assets/SoulAssets/Gods";
import { store } from "../../Store";
import { newSoul } from "../../Store/World/actions";
import { Soul } from "../Soul";
import { Archivist } from "./Archivist";
import { FatherGod } from "./Father";
import { WarriorGod } from "./Warrior";

export const GodController = {
    gods: [FatherGod, WarriorGod, Archivist],
    onSort: function (soul: Soul, god?: Gods) {
        this.gods.forEach((g) => g.onSort(soul, god));
        store.dispatch(newSoul());
    },
};
