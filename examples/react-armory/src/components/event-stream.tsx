import { FinderEvent, useFinderContext } from "@hitgrab/finder";
import { useCallback, useEffect, useState } from "react";
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
                const date = new Date(e.timestamp).toLocaleString("en-GB", { timeZone: "UTC" });
                return (
                    <div className="event" key={index}>
                        <b>
                            {index}) {date} - {e.event}
                        </b>
                        <div className="eventProps">
                            {Object.entries(e).map(([key, value]) => {
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
            })}
        </div>
    );
}

export { EventStream };
