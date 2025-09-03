---
sidebar_position: 1
---

# Filters

The Filters api can be accessed from `finder.filters`.

**Type Signature**

```ts
finder.filters {

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
    test(options: { rules?: FilterRule[]; values?: any; context?: FContext; isAdditive?: boolean;})

    // Test a filter rule against the items array. Useful for building input controls.
    testRule(options: { rule?: FilterRule; value?: any; context?: FContext; isAdditive?: boolean;})

    // Test every option in a filter against the items array. Useful for building input controls.
    testRuleOptions(options: { rules: FilterRule; value?: any; context?: FContext; isAdditive?: boolean;})

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
