import React from "react";
import { FC, CSSProperties, memo } from "react";
import { Box } from "./Box";

const styles: CSSProperties = {
    display: "inline-block",
};

export interface BoxDragPreviewProps {
    title: string;
}

export const BoxDragPreview: FC<BoxDragPreviewProps> = memo(function BoxDragPreview({ title }) {
    return (
        <div style={styles}>
            <Box title={title} />
        </div>
    );
});
