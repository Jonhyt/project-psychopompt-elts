import { createReducer } from "@reduxjs/toolkit";
import { generateSoul } from "../../Lib/Soul";
import { newSoul } from "./actions";
import { WorldState } from "./type";

const initialState: WorldState = {
    currentSoul: generateSoul(),
};

export const worldReducer = createReducer(initialState, (builder) => {
    builder.addCase(newSoul, (state) => {
        state.currentSoul = generateSoul();
    });
});
