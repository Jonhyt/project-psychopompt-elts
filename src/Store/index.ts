import { combineReducers, createStore } from "redux";
import { godsReducer } from "./Gods/reducer";
import { GodsState } from "./Gods/types";
import { worldReducer } from "./World/reducer";
import { WorldState } from "./World/type";

export interface AppState {
    gods: GodsState;
    world: WorldState;
}

export const combinedReducer = combineReducers<AppState>({ gods: godsReducer, world: worldReducer });
export const store = createStore(combinedReducer);
