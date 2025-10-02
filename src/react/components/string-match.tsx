import { useMemo } from "react";
import { FinderSearchTermProp } from "../types/react-types";
import { calculateStringMatchSegments } from "../../core/search/calculate-string-match-segments";

interface StringMatchProps {
    needle: string;
    haystack: string;
    Match?: FinderSearchTermProp;
    Miss?: FinderSearchTermProp;
}

/**
 * Split a string into result segment components .
 */
function StringMatch({ needle, haystack, Match = "span", Miss }: StringMatchProps) {
    const segments = useMemo(() => calculateStringMatchSegments(haystack, needle), [haystack, needle]);

    if (segments === undefined) {
        return haystack;
    }

    return segments.map((segment, index) => {
        const key = [segment.value, index].join();
        if (segment.is_match) {
            if (typeof Match === "string") {
                return (
                    <Match data-is-match={segment.is_match} key={key}>
                        {segment.value}
                    </Match>
                );
            }
            return <Match data-is-match={segment.is_match} segment={segment} segmentIndex={index} key={key} />;
        } else if (Miss !== undefined) {
            if (typeof Miss === "string") {
                return (
                    <Miss data-is-match={segment.is_match} key={key}>
                        {segment.value}
                    </Miss>
                );
            }
            return <Miss data-is-match={segment.is_match} segment={segment} segmentIndex={index} key={key} />;
        }
        return segment.value;
    });
}

export { StringMatch };
