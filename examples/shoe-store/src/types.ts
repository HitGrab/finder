export interface Shoe {
    name: string;
    brand: string;
    image: string;
    sizes: number[];
    in_stock: boolean;
    colors: string[];
    price: number;
    rating: number;
    sku: string;
}

export interface ShoeSelectorContextProps {
    isSelected: (item: Shoe) => boolean;
    toggle: (item: Shoe) => void;
}
