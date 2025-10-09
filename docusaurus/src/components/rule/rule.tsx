import { PropsWithChildren } from "react";

function Rule({ children }: PropsWithChildren) {
    return <div className="rule">{children}</div>;
}
export { Rule };
