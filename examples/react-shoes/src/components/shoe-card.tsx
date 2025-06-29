import { useFinderContext } from "@hitgrab/finder";
import { range } from "lodash";

interface ShoeCardProps {
    item: Shoe;
}
function ShoeCard({ item }: ShoeCardProps) {
    const finder = useFinderContext();
    return (
        <div className="shoe" data-in-stock={item.in_stock}>
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
                <div className="name">{item.name}</div>
                <div className="price">${item.price}</div>
                <div className="rating">{range(0, item.rating).map(() => "*")}</div>
                <div className="sizes">Sizes: {item.sizes.join(", ")}</div>
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
