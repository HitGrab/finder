# Filters Mixin

:::info Looking for the rule?
See [Filter Rule](../rules/filter-rule)
:::

The Filters mixin can be accessed from `finder.filters`.

**Type Signature**

```ts
finder.filters {
    values: {[filter.id]: any}
    // Processed filter values keyed by filter rule id.
    // If the rule has a defaultValue and no local state, the default will be returned.
    // If a rule is required, the first valid option will be returned if possible.

    raw: {[filter.id]: any}
    // Raw Filter values keyed by filter rule id.
    // This is the raw state without any processing.

    activeRules: FilterRule[]
    // Flat array of active rules.
    // A filter rule is considered active if the rule has `required:true`, or has any defined value.

    rules: FilterRule[]
    // All rules, active or not. Useful for building control interfaces.

    isActive(identifier: string | FilterRule) : boolean
    // A filter rule is considered active if the rule has `required:true`, or has any defined value.

    get(identifier: string | FilterRule): any
    // The processed value for a filter rule.
    // If the rule has a defaultValue and no local state, the default will be returned.
    // If a rule is required, the first valid option will be returned if possible.

    has(identifier: string | FilterRule, optionValue?: FilterOption | any): boolean
    // Check the processed value for a filter rule or option.
    // For a boolean rule, if required or set, it will return true.
    // For rules with multiple options, you can pass an option to see if that value is selected.

    toggle(identifier: string | FilterRule, optionValue?: FilterOption | any): void
    // Toggle a boolean filter or an option for a multiple filter.

    set(identifier: string | FilterRule, value: any): void
    // Set a filter value.

    delete(identifier: string | FilterRule, value: any)
    // Delete the internal state for this rule.

    test(options: { rules?: FilterRule[]; values?: any; context?: FContext; isAdditive?: boolean;})
    // Test an array of filter rules against the items array. Useful for building input controls.

    testRule
    // Test a filter rule against the items array. Useful for building input controls.

    testRuleOptions
    // Test every option in a filter against the items array. Useful for building input controls.
}
```

**Example Usage**

```ts
function FilterControlList() {
    const finder = useFinder();
    return finder.rules.map((rule) => {
        const value = finder.filter.get(rule);
        return (
            <FilterControl
                rule={rule}
                value={value}
                onChange((incomingValue:any) => finder.filters.set(incomingValue))
                key={rule.id}
            />
        );
    })
}

```
