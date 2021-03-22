import "../Sass/App.sass";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Workarea } from "./Game/Workarea/Workarea";
import { WorkareaDragLayer } from "./Game/Workarea/WorkareaDragLayer";

export default function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Workarea />
            <WorkareaDragLayer />
        </DndProvider>
    );
}
