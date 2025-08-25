import { isValidElement } from "react";
import { FinderContentRenderProp } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderEmptyProps {
    children: FinderContentRenderProp;
}
function FinderEmpty({ children: renderProp }: FinderEmptyProps) {
    const finder = useFinder();
    if (finder.state === "empty" && renderProp) {
        if (typeof renderProp === "object" && renderProp !== null && isValidElement(renderProp)) {
            return renderProp;
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component pagination={finder.pagination} context={finder.context} />;
        }

        return renderProp;
    }
    return null;
}

export { FinderEmpty };
