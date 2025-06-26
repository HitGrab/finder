import { PropsWithChildren, useState } from "react";

function Accordion({ children }: PropsWithChildren) {
    return <div className="accordion">{children}</div>;
}

interface AccordionItemProps extends PropsWithChildren {
    label: string;
}
Accordion.Item = function AccordionItem({ label, children }: AccordionItemProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <div className="item" data-expanded={isExpanded}>
            <button type="button" className="label" onClick={() => setIsExpanded(!isExpanded)}>
                {label}
            </button>
            <div className="accordionItemWrapper">
                <div className="accordionItemContent">
                    <div className="accordionItemPadding">{children}</div>
                </div>
            </div>
        </div>
    );
};

export { Accordion };
