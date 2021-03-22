import React from "react";

export const SoulHistory: React.FC = () => {
    return (
        <div style={{ textAlign: "left", border: "solid 1px", width: "max-content" }}>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>Name of the Soul</td>
                    </tr>
                    <tr>
                        <th>Ocupation</th>
                        <td>Ocupation of the soul</td>
                    </tr>
                    <tr>
                        <th>Age of Death</th>
                        <td>XX</td>
                    </tr>
                    <tr>
                        <th>Cause of death</th>
                        <td>Cause of death of the person</td>
                    </tr>
                    <tr>
                        <th>Worships</th>
                        <td>God 1</td>
                    </tr>
                    <tr>
                        <th>Taboos Broken</th>
                        <td>Taboo 1, Taboo 2</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
