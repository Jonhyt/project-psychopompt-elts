import React from "react";
import { useSelector } from "react-redux";
import { GodNames } from "../../../Assets/SoulAssets/Gods";
import { GodController } from "../../../Lib/Gods/GodController";
import { AppState } from "../../../Store";

export const SoulSorting: React.FC = () => {
    const soul = useSelector((state: AppState) => state.world.currentSoul);

    return (
        <div>
            {GodController.gods.map((g) => (
                <button key={g.id} onClick={() => GodController.onSort(soul, g.id)}>
                    {GodNames[g.id]}
                </button>
            ))}
            <button onClick={() => GodController.onSort(soul)}>Destroy</button>
        </div>
    );
};
