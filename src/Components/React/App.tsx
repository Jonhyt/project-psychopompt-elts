import "../Sass/App.sass";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "./Game/Game";

export default function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            {/* <Workarea />
            <WorkareaDragLayer /> */}
            <Game />
        </DndProvider>
    );
}
