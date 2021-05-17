import { Moment } from "moment";
import { Soul } from "../../Lib/Soul";

export interface WorldState {
    currentSoul: Soul;
    soulsLeft: number;
    day: number;
    chaos: number;
    timerStart?: Moment;
    timerEnd?: Moment;
    timerRunning: boolean;
}
