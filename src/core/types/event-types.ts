import { EVENT_SOURCE, EVENTS } from "../core-constants";
import { FinderCore } from "../finder-core";
import { FinderRule } from "./rule-types";

export type FinderTouchSource = (typeof EVENT_SOURCE)[keyof typeof EVENT_SOURCE];

interface FinderSharedEventProps {
    source: string;
    event: FinderEventName;
    timestamp: number;
    instance: FinderCore;
}
export interface FinderInitEvent extends FinderSharedEventProps {
    source: "core";
    event: "init";
}
export interface FinderFirstUserInteractionEvent extends FinderSharedEventProps {
    source: "core";
    event: "firstUserInteraction";
}
export interface FinderReadyEvent extends FinderSharedEventProps {
    source: "core";
    event: "ready";
}

export type FinderEvent = FinderInitEvent | FinderFirstUserInteractionEvent | FinderReadyEvent | FinderChangeEvent;

export type FinderOnInitCallback = (event: FinderInitEvent) => void;
export type FinderOnReadyCallback = (event: FinderReadyEvent) => void;
export type FinderOnFirstUserInteractCallback = (event: FinderFirstUserInteractionEvent) => void;
export type FinderOnChangeCallback = (event: FinderChangeEvent) => void;
export type FinderTouchCallback = (event: FinderTouchEvent) => void;

/**
 * Internal communication between mixins and core
 */
export interface FinderTouchEvent {
    source: FinderTouchSource;
    event: FinderEventName;
    current: any;
    initial: any;
    rule?: FinderRule;
}

/**
 * External type that consumers will receive
 */
export type FinderChangeEvent = FinderTouchEvent & FinderSharedEventProps;

export type FinderEventName = (typeof EVENTS)[keyof typeof EVENTS];
