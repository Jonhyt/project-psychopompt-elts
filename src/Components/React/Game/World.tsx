import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../Store";
import { endDay, newDay } from "../../../Store/World/actions";

export const World: React.FC = () => {
    const [intv, setIntv] = useState<NodeJS.Timeout | null>(null);
    const [timer, setTimer] = useState<Moment | null>(null);
    const { chaos, soulsLeft, day, timerRunning, timerEnd, timerStart } = useSelector((state: AppState) => state.world);
    const dispatch = useDispatch();

    useEffect(() => {
        if (timerRunning) setIntv(setInterval(getTimer, 1000));
        else if (intv) {
            clearInterval(intv);
            setIntv(null);
        }
    }, [timerRunning]);

    const getTimer = () => {
        if (timerEnd && timerStart) {
            const diff = timerEnd.diff(moment());
            if (diff > 0) setTimer(moment(diff));
            else dispatch(endDay());
        }
    };

    return (
        <table style={{ border: "solid 1px" }}>
            <tbody>
                <tr>
                    <th>Chaos</th>
                    <td>{chaos}</td>
                </tr>
                <tr>
                    <th>Souls Left</th>
                    <td>{soulsLeft}</td>
                </tr>
                <tr>
                    <th>Day</th>
                    <td>{day}</td>
                </tr>
                <tr>
                    <th>Timer</th>
                    <td>{timerRunning && timer ? timer.format("mm:ss") : "00:00"}</td>
                </tr>
                <tr>
                    <td rowSpan={2}>
                        <button onClick={() => dispatch(newDay())} disabled={timerRunning}>
                            New Day
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
