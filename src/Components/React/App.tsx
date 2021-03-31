import "../Sass/App.sass";
import React from "react";

import { Game } from "./Game/Game";
import { Provider } from "react-redux";
import { store } from "../../Store";

export default function App() {
    return (
        <Provider store={store}>
            <Game />
        </Provider>
    );
}
