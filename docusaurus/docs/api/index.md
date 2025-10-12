---
title: API
sidebar_position: 3
---

FinderCore is a thin wrapper that provides an imperative interface to Finder's internal state.

```ts
FinderCore<FItem, FContext> {
    items: FItem[]

    isReady: boolean;

    isEmpty: boolean;

    isLoading: boolean;

    disabled: boolean;

    state: 'loading' | 'empty' | 'groups' | 'items' | 'noMatches';

    // in milliseconds
    updatedAt: number;

    context: FContext;

    getRule(identifier: string | FinderRule): FinderRule;

    setContext(context: FContext): void;

    setIsLoading(value: boolean): void;

    setItems(items: FItem[]): void;

    setRules(rules: FinderRule[]): void;

    // Test a ruleset without committing the state change.
    test(mixins: SerializedMixins, isAdditive: boolean): FItem[]

    events: {
         // bind an event
        on: (event: FinderEventName, callback: (payload: any) => void),

        // unbind an event
        off: (event: FinderEventName, callback: (payload: any) => void),

        // trigger the passed callback while suppressing the event emitter.
        silently: (callback: (payload: any) => void): void;

        isSilent: () => boolean,
    }

    search: {
        // String that is currently being searched for. Defaults to an empty string.
        searchTerm: string

        hasSearchTerm: boolean

        hasSearchRule: boolean

        setSearchTerm(value:string): void

        // Reset searchTerm to an empty string.
        reset(): void
    };

    filters: {
        // Processed filter values keyed by filter rule id.
        // If the rule has a defaultValue and no local state, the default will be returned.
        // If a rule is required, the first valid option will be returned if possible.
        values: {[filter.id]: any}

        // Raw Filter values keyed by filter rule id.
        // This is the raw state without any processing.
        raw: {[filter.id]: any}

        // Flat array of active rules.
        // A filter rule is considered active if the rule has `required:true`, or has any defined value.
        activeRules: FilterRule[]

        // All rules, active or not. Useful for building control interfaces.
        rules: FilterRule[]

        // A filter rule is considered active if the rule has `required:true`, or has any defined value.
        isActive(identifier: string | FilterRule) : boolean

        // The processed value for a filter rule.
        // If the rule has a defaultValue and no local state, the default will be returned.
        // If a rule is required, the first valid option will be returned if possible.
        get(identifier: string | FilterRule): any

        // Check the processed value for a filter rule or option.
        // For a boolean rule, if required or set, it will return true.
        // For rules with multiple options, you can pass an option to see if that value is selected.
        has(identifier: string | FilterRule, optionValue?: FilterOption | any): boolean

        // Toggle a boolean filter or an option for a multiple filter.
        toggle(identifier: string | FilterRule, optionValue?: FilterOption | any): void

        // Set a filter value.
        set(identifier: string | FilterRule, value: any): void

        // Delete the internal state for this rule.
        delete(identifier: string | FilterRule, value: any)

        // Test an array of filter rules against the items array. Useful for building input controls.
        test(options: { rules?: FilterRule[]; values?: any; context: FContext; isAdditive?: boolean;})

        // Test a filter rule against the items array. Useful for building input controls.
        testRule(options: { rule?: FilterRule; value?: any; context: FContext; isAdditive?: boolean;})

        // Test every option in a filter against the items array. Useful for building input controls.
        testRuleOptions(rule: string | FilterRule; isAdditive?: boolean;})
    }

    sortBy: {
        // If no sort rule has been set, the first rule in the stack will be considered active.
        activeRule?: SortByRule

        // asc or desc
        sortDirection: SortDirection,

        // determine if the user has changed the value away from the default rule sort.
        userHasSetSortDirection: boolean,

        // All sorting rules. Useful for building controls.
        rules: SortByRule[];

        // set the active rule.
        set(identifier?: string | SortByRule, direction?: SortDirection): void

        setSortDirection(direction?: SortDirection): void

        // rotate between the rule default, desc, and asc.
        cycleSortDirection(): void

        // flip between desc and asc.
        toggleSortDirection(): void,

        reset(): void,
    }

    groupBy: {

        activeRule?: GroupByRule

        requireGroup: boolean

        // all defined GroupBy rules. Useful for controls.
        rules: GroupByRule[]

        groupIdSortDirection: 'asc' | 'desc'

        set(identifier?: string | GroupByRule): void

        toggle(identifier?: string | GroupByRule): void

        // Determine how groups should be sorted.
        setGroupIdSortDirection(direction?: 'asc' | 'desc')

        reset()
    }

    matches: {
        // Flat array of items that passed the search rule, all filters, have been sorted by any sortBy rules, and paginated.
        // Will be undefined if requireGroup is set.
        items?: FItem[];

        // Flat array of groups that passed the search rule, all filters, have been sorted by any sortBy rules, and paginated.
        // Will be undefined if requireGroup is NOT set.
        groups?: FinderResultGroup<FItem>[];

        numMatchedItems: number;

        numTotalItems: number;

        hasGroupByRule: boolean;
    }

    pagination: {

        page: number

        offset: number

        numItemsPerPage?: number

        numTotalItems: number

        lastPage: number;

        isPaginated: boolean
    }

}

```
