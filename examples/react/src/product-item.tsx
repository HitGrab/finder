import { range } from "lodash";
import { Fragment } from "react/jsx-runtime";
import { Product } from "./types";
import { ColorSquare } from "./color-square";
import { useFinderContext } from "@hitgrab/finder";

interface ProductItemProps {
    product: Product;
}
function ProductItem({ product }: ProductItemProps) {
    const finder = useFinderContext();
    const isSelected = finder.selectedItems.isSelected(product);
    return (
        <div
            style={{ display: "flex", flexDirection: "column", padding: "10px", gap: "10px", background: isSelected ? "gold" : undefined }}
            onClick={() => finder.selectedItems.toggle(product)}
        >
            <div
                style={{
                    aspectRatio: "1/1",
                    background: `linear-gradient(-145deg, ${product.image_color}, color-mix(in srgb, ${product.image_color}, #333))`,
                    width: "150px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                }}
            />
            <b>{product.label}</b>
            <div>
                Rating:
                {range(0, product.rating).map((value) => {
                    return <Fragment key={value}>*</Fragment>;
                })}
            </div>
            <div>{product.sku}</div>
            <div>{new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(product.price)}</div>
            Available in:
            <div style={{ display: "flex", gap: "5px" }}>
                {product.colors.map((color) => {
                    return <ColorSquare color={color} width="20px" key={color} />;
                })}
            </div>
            <label style={{ pointerEvents: "none" }}>
                <input checked={isSelected} type="checkbox" readOnly={true} />
                Select
            </label>
        </div>
    );
}
export { ProductItem };
