/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { render, screen } from "@testing-library/react";
import { Finder } from "../components/finder";
import { objectItems } from "./test-constants";

import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import { searchRule } from "../../core/utils/rule-type-enforcers";
import { MockObjectItem } from "./test-types";

// append JEST DOM matchers to global expect object.
expect.extend(matchers);

const successElement = <div aria-label="OK">OK</div>;
const errorElement = <div aria-label="BAD">BAD</div>;

describe("toJSON", () => {
    test("Shows loading state", () => {
        render(
            <Finder items={[]} rules={[]} isLoading={true}>
                <Finder.Content>
                    {{
                        items: errorElement,
                        groups: errorElement,
                        loading: successElement,
                        noMatches: errorElement,
                        empty: errorElement,
                    }}
                </Finder.Content>
            </Finder>,
        );

        const ok = screen.getByLabelText("OK");
        expect(ok).toBeInTheDocument();

        const bad = screen.queryByLabelText("BAD");
        expect(bad).not.toBeInTheDocument();
    });

    test("Shows item state", () => {
        render(
            <Finder items={objectItems} rules={[]}>
                <Finder.Content>
                    {{
                        items: successElement,
                        groups: errorElement,
                        loading: errorElement,
                        noMatches: errorElement,
                        empty: errorElement,
                    }}
                </Finder.Content>
            </Finder>,
        );

        const ok = screen.getByLabelText("OK");
        expect(ok).toBeInTheDocument();

        const bad = screen.queryByLabelText("BAD");
        expect(bad).not.toBeInTheDocument();
    });

    test("Shows groups state", () => {
        render(
            <Finder items={[]} rules={[]} requireGroup={true}>
                <Finder.Content>
                    {{
                        items: errorElement,
                        groups: successElement,
                        loading: errorElement,
                        noMatches: errorElement,
                        empty: successElement,
                    }}
                </Finder.Content>
            </Finder>,
        );

        const ok = screen.getByLabelText("OK");
        expect(ok).toBeInTheDocument();

        const bad = screen.queryByLabelText("BAD");
        expect(bad).not.toBeInTheDocument();
    });

    test("Shows empty state", () => {
        render(
            <Finder items={[]} rules={[]}>
                <Finder.Content>
                    {{
                        items: successElement,
                        groups: errorElement,
                        loading: errorElement,
                        noMatches: errorElement,
                        empty: successElement,
                    }}
                </Finder.Content>
            </Finder>,
        );

        const ok = screen.getByLabelText("OK");
        expect(ok).toBeInTheDocument();

        const bad = screen.queryByLabelText("BAD");
        expect(bad).not.toBeInTheDocument();
    });

    test("Shows noMatches state", () => {
        const rules = [searchRule<MockObjectItem>({ searchFn: (item) => item.name })];
        render(
            <Finder items={objectItems} rules={rules} initialSearchTerm="not_found">
                <Finder.Content>
                    {{
                        items: errorElement,
                        groups: errorElement,
                        loading: errorElement,
                        noMatches: successElement,
                        empty: errorElement,
                    }}
                </Finder.Content>
            </Finder>,
        );

        const ok = screen.getByLabelText("OK");
        expect(ok).toBeInTheDocument();

        const bad = screen.queryByLabelText("BAD");
        expect(bad).not.toBeInTheDocument();
    });
});
