import * as React from "react";
import { ElementType, isValidElement, ReactNode } from "react";
import { useFinder } from "src/hooks/use-finder";

interface FinderEmptyProps {
    children: ElementType | ReactNode;
}
function FinderEmpty({ children: renderProp }: FinderEmptyProps) {
    const finder = useFinder();
    if (finder.isEmpty && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return renderProp;
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component />;
        }

        return renderProp;
    }
    return null;
}

export { FinderEmpty };
