import React, { useState } from "react";
import { generateSoul } from "../../../Lib/Soul";
import { SoulHistory } from "./SoulHistory";
import { SoulSorting } from "./SoulSorting";

export const Game: React.FC = () => {
    const [currentSoul, setCurrentSoul] = useState(generateSoul());

    return (
        <div>
            <SoulHistory soul={currentSoul}></SoulHistory>
            <SoulSorting></SoulSorting>
        </div>
    );
};
