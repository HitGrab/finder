import { Shoe, ShoeSelectorContextProps } from "@/types";
import { Finder, useFinder } from "@hitgrab/finder";
import { range } from "lodash";

interface ShoeCardProps {
    item: Shoe;
}
function ShoeCard({ item }: ShoeCardProps) {
    const finder = useFinder<Shoe, ShoeSelectorContextProps>();
    const isSelected = finder.context.isSelected(item);
    return (
        <div className="shoe" data-in-stock={item.in_stock} data-selected={isSelected}>
            <div className="imagePedestal">
                <div className="image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="colorList">
                    {item.colors.map((color) => (
                        <div className="color" style={{ backgroundColor: color }} key={color} />
                    ))}
                </div>
            </div>

            <div className="details">
                <button type="button" className="brand" onClick={() => finder.filters.set("brand", [item.brand])}>
                    {item.brand}
                </button>
                <div className="name">
                    <Finder.SearchTerm>{item.name}</Finder.SearchTerm>
                </div>
                <div className="price">${item.price}</div>
                <div className="rating">{range(0, item.rating).map(() => "*")}</div>
                <div className="sizes">Sizes: {item.sizes.join(", ")}</div>
            </div>
            <div className="controls">
                {item.in_stock ? (
                    <label
                        onClick={() => {
                            finder.context.toggle(item);
                        }}
                    >
                        <input type="checkbox" checked={isSelected} readOnly={true} /> Selected
                    </label>
                ) : (
                    <label>
                        <input type="checkbox" checked={isSelected} readOnly={true} disabled={true} /> Out of Stock
                    </label>
                )}
            </div>
        </div>
    );
}

function ShoeCardSkeleton() {
    return (
        <div className="shoe">
            <div className="imagePedestal">
                <div className="image" />
            </div>

            <div className="details">
                <button type="button" className="brand">
                    Loading...
                </button>
                <div className="name">...</div>
                <div className="price">...</div>
                <div className="rating">...</div>
                <div className="sizes">Sizes: ...</div>
            </div>
        </div>
    );
}

export { ShoeCard, ShoeCardSkeleton };
