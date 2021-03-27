import React, { CSSProperties, useCallback, useState } from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { DragItem } from "../../Interfaces/DragItem";
import { DraggableBox } from "./DraggableBox";

const style: CSSProperties = {
    width: 500,
    height: 500,
    border: "solid",
};

interface BoxMap {
    [key: string]: { top: number; left: number; title: string };
}

export const Workarea: React.FC = () => {
    const [boxes, setBoxes] = useState<BoxMap>({
        a: { top: 20, left: 80, title: "Drag me around" },
        b: { top: 180, left: 20, title: "Drag me too" },
    });

    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top },
                    },
                })
            );
        },
        [boxes]
    );

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop(item: DragItem, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset() as {
                    x: number;
                    y: number;
                };
                let left = Math.round(item.left + delta.x);
                let top = Math.round(item.top + delta.y);

                moveBox(item.id, left, top);
                return undefined;
            },
        }),
        [moveBox]
    );

    return (
        <div ref={drop} style={style}>
            {Object.keys(boxes).map((key) => (
                <DraggableBox key={key} id={key} {...boxes[key]} />
            ))}
        </div>
    );
};
