import React from "react";
import { useSelector } from "react-redux";
import { GodNames } from "../../../Assets/SoulAssets/Gods";
import { GodController } from "../../../Lib/Gods/GodController";
import { AppState } from "../../../Store";

export const SoulSorting: React.FC = () => {
    const { currentSoul, timerRunning } = useSelector((state: AppState) => state.world);

    return (
        <div>
            {GodController.gods.map((g) => (
                <button key={g.id} onClick={() => GodController.onSort(currentSoul, g.id)} disabled={!timerRunning}>
                    {GodNames[g.id]}
                </button>
            ))}
            <button onClick={() => GodController.onSort(currentSoul)} disabled={!timerRunning}>
                Destroy
            </button>
        </div>
    );
};
