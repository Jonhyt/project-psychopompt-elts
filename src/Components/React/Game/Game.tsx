import React from "react";
import { Approval } from "./Approval";
import { SoulHistory } from "./SoulHistory";
import { SoulSorting } from "./SoulSorting";
import { World } from "./World";

export const Game: React.FC = () => {
    return (
        <div>
            <SoulHistory />
            <SoulSorting />
            <Approval />
            <World />
        </div>
    );
};
