import React from "react";
import { useSelector } from "react-redux";
import { GodNames } from "../../../Assets/SoulAssets/Gods";
import { AppState } from "../../../Store";

export const Approval: React.FC = () => {
    const { archiverApproval, archiverDelta, fatherApproval, fatherDelta, warriorApproval, warriorDelta } = useSelector((state: AppState) => state.gods);

    return (
        <div style={{ textAlign: "left", border: "solid 1px", width: "max-content" }}>
            <table>
                <tbody>
                    <Row name={GodNames[0]} values={[fatherApproval, fatherDelta]} />
                    <Row name={GodNames[1]} values={[warriorApproval, warriorDelta]} />
                    <Row name={GodNames[2]} values={[archiverApproval, archiverDelta]} />
                </tbody>
            </table>
        </div>
    );
};

const Row: React.FC<{ name: string; values: number[] }> = ({ name, values }) => {
    let sign = "";
    switch (Math.sign(values[1])) {
        case -1:
            sign = "-";
            break;
        case 1:
            sign = "+";
    }
    return (
        <tr>
            <th>{name}</th>
            <td>{`${values[0]} (${sign}${Math.abs(values[1])})`}</td>
        </tr>
    );
};
