import React from "react";
import { useSelector } from "react-redux";
import { GodNames } from "../../../Assets/SoulAssets/Gods";
import { SoulDeathNames } from "../../../Assets/SoulAssets/SoulDeaths";
import { SoulOcupationNames } from "../../../Assets/SoulAssets/SoulOccupations";
import { TabooNames } from "../../../Assets/SoulAssets/Taboos";
import { AppState } from "../../../Store";

export const SoulHistory: React.FC = () => {
    const soul = useSelector((state: AppState) => state.world.currentSoul);

    return (
        <div style={{ textAlign: "left", border: "solid 1px", width: "max-content" }}>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{soul.name}</td>
                    </tr>
                    <tr>
                        <th>Ocupation</th>
                        <td>{soul.occupation !== null ? SoulOcupationNames[soul.occupation] : "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Age of Death</th>
                        <td>{soul.ageDeath}</td>
                    </tr>
                    <tr>
                        <th>Cause of death</th>
                        <td>{SoulDeathNames[soul.causeOfDeath]}</td>
                    </tr>
                    <tr>
                        <th>Worships</th>
                        <td>
                            {soul.worships.length > 0 ? soul.worships.map((g, i) => `${GodNames[g]}${soul.worships.length - 1 !== i ? ", " : ""}`) : "Atheist"}
                        </td>
                    </tr>
                    <tr>
                        <th>Taboos Broken</th>
                        <td>
                            {soul.taboosBroken.length > 0
                                ? soul.taboosBroken.map((t, i) => `${TabooNames[t]}${soul.taboosBroken.length - 1 !== i ? ", " : ""}`)
                                : "None"}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
