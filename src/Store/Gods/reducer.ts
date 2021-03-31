import { createReducer } from "@reduxjs/toolkit";
import { setArchivist, setFather, setWarrior } from "./actions";
import { GodsState } from "./types";

const initialState: GodsState = {
    archiverApproval: 0,
    archiverDelta: 0,
    fatherApproval: 0,
    fatherDelta: 0,
    warriorApproval: 0,
    warriorDelta: 0,
};

export const godsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setFather, (state, action) => {
            state.fatherApproval += action.payload;
            state.fatherDelta = action.payload;
        })
        .addCase(setWarrior, (state, action) => {
            state.warriorApproval += action.payload;
            state.warriorDelta = action.payload;
        })
        .addCase(setArchivist, (state, action) => {
            state.archiverApproval += action.payload;
            state.archiverDelta = action.payload;
        });
});
