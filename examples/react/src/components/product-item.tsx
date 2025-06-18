import { range } from "lodash";
import { Fragment } from "react/jsx-runtime";
import { ColorSquare } from "./color-square";
import { useFinderContext } from "@hitgrab/finder";
import { Product } from "@/types";

interface ProductItemProps {
    product: Product;
}
function ProductItem({ product }: ProductItemProps) {
    const finder = useFinderContext();
    const isSelected = finder.selectedItems.isSelected(product);
    return (
        <div className={["product", isSelected ? "selected" : undefined].join(" ")} onClick={() => finder.selectedItems.toggle(product)}>
            <ColorSquare color={product.image_color} width="150px" />
            <div className="details">
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
        </div>
    );
}
export { ProductItem };
