interface EquipmentProps {
    item: Equipment;
    isSelected: boolean;
    onSelect: () => void;
}
function EquipmentCard({ item, isSelected, onSelect }: EquipmentProps) {
    return (
        <div className={`equipmentCard ${isSelected ? "armed" : ""} ${item.quantity === 0 ? "notOwned" : ""}`}>
            <b>{item.name}</b>
            <img src={item.image} alt={item.name} className="equipmentImage" />
            <div className="stats">
                Atk: <span>{item.atk}</span>
                Def: <span>{item.def}</span>
                Qty: <span>{item.quantity}</span>
                Rarity: <span>{item.rarity}</span>
            </div>
            {item.quantity > 0 && (
                <button type="button" className={isSelected ? "armed" : undefined} onClick={onSelect}>
                    {isSelected ? "ARMED" : "Arm"}
                </button>
            )}
        </div>
    );
}

function EquipmentCardSkeleton() {
    return (
        <div className="equipmentCard">
            <b>Loading...</b>
            <div className="equipmentImage placeholderImage" />
            <div className="stats">
                Atk: <span>?</span>
                Def: <span>?</span>
                Qty: <span>?</span>
                Rarity: <span>?</span>
            </div>
        </div>
    );
}

export { EquipmentCard, EquipmentCardSkeleton };
