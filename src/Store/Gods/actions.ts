import { createAction } from "@reduxjs/toolkit";

export const setFather = createAction<number>("SetFather");
export const setWarrior = createAction<number>("SetWarrior");
export const setArchivist = createAction<number>("SetArchivist");
