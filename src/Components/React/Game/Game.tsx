import React from "react";
import { Approval } from "./Approval";
import { SoulHistory } from "./SoulHistory";
import { SoulSorting } from "./SoulSorting";

export const Game: React.FC = () => {
    return (
        <div>
            <SoulHistory />
            <SoulSorting />
            <Approval />
        </div>
    );
};
