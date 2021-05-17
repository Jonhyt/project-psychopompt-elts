import { createReducer } from "@reduxjs/toolkit";
import moment from "moment";
import { CONFIGS } from "../../configs";
import { generateSoul } from "../../Lib/Soul";
import { endDay, newDay, newSoul } from "./actions";
import { WorldState } from "./type";

const initialState: WorldState = {
    currentSoul: generateSoul(),
    soulsLeft: CONFIGS.startingSouls,
    day: 0,
    chaos: 0,
    timerRunning: false,
};

export const worldReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(newSoul, (state) => {
            state.soulsLeft--;
            if (state.soulsLeft <= 0) {
                state.timerRunning = false;
                state.timerStart = undefined;
                state.timerEnd = undefined;
            }
            state.currentSoul = generateSoul();
        })
        .addCase(newDay, (state) => {
            state.timerRunning = true;
            state.timerStart = moment();
            state.timerEnd = moment().add(CONFIGS.daylength, "minute").add(1, "s");
            state.day++;
            state.soulsLeft += CONFIGS.soulsPerDay;
        })
        .addCase(endDay, (state) => {
            state.timerRunning = false;
            state.timerStart = undefined;
            state.timerEnd = undefined;
            state.chaos += state.soulsLeft;
        });
});
