interface ColorSquareProps {
    color: string;
    width: string;
}
function ColorSquare({ color, width }: ColorSquareProps) {
    return (
        <div
            style={{
                aspectRatio: "1/1",
                background: `linear-gradient(-145deg, ${color}, color-mix(in srgb, ${color}, #333))`,
                width,
                border: "1px solid #ccc",
            }}
            title={color}
        />
    );
}

export { ColorSquare };
