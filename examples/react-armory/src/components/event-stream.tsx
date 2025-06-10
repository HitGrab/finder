import { FinderEvent } from "@hitgrab/finder";
import { useCallback, useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface EventStreamProps {
    stream: FinderEvent[];
}
function EventStream({ stream }: EventStreamProps) {
    const ref = useCallback((node: HTMLDivElement | null) => {
        if (!node) {
            return () => {};
        }

        const observer = new MutationObserver(() => {
            node.scrollTop = node.scrollHeight;
        });

        observer.observe(node, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
        };
    }, []);
    return (
        <div className="eventContainer" ref={ref}>
            <b>Event Log</b>
            {stream.map((e, index) => {
                return <EventDetails event={e} index={index} key={index} />;
            })}
        </div>
    );
}

interface EventDetailsProps {
    event: FinderEvent;
    index: number;
}
function EventDetails({ event, index }: EventDetailsProps) {
    const date = new Date(event.timestamp).toLocaleString("en-GB", { timeZone: "UTC" });
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <div className="event">
            <button type="button" onClick={() => setIsExpanded(!isExpanded)}>
                {index}) {date} - {event.event} {isExpanded === false && "(...)"}
            </button>
            <div className="eventProps">
                {isExpanded &&
                    Object.entries(event).map(([key, value]) => {
                        let transformedValue = "";
                        if (typeof value === "string" || typeof value === "number") {
                            transformedValue = String(value);
                        }
                        if (typeof value === "boolean") {
                            transformedValue = value ? "true" : "false";
                        }
                        if (transformedValue === "") {
                            transformedValue = JSON.stringify(value);
                        }

                        return (
                            <Fragment key={key}>
                                <span>{key}:</span>
                                <span>{transformedValue}</span>
                            </Fragment>
                        );
                    })}
            </div>
        </div>
    );
}

export { EventStream };
