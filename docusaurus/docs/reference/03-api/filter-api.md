---
sidebar_position: 1
---

# Filters

## Properties

| Name        | Type                             | Description                                                                                                                                                                                                       |
| ----------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activeRules | `HydratedFilterRuleDefinition[]` | Flat array of active rules. A filter rule is considered active if the rule has `required:true`, or has any defined value.                                                                                         |
| raw         | `Record<string, any>`            | **Raw** filter values keyed by filter rule id. This is the pure internal state without any processing.                                                                                                            |
| rules       | `HydratedFilterRuleDefinition[]` | All rules, active or not. Useful for building control interfaces.                                                                                                                                                 |
| values      | `Record<string, any>`            | **Processed** filter values keyed by filter rule id. If the rule has a defaultValue and no local state, the default will be returned. If a rule is required, the first valid option will be returned if possible. |

## Methods

### add

Only applicable for rules with `multiple:true`. This appends the passed value to the rule's valur array.

```ts
finder.filters.add(id: AnyFilterRuleDefinition | string, optionValue?: FilterOption | any) => void
```

### delete

This behaves slightly differently by rule flavour.

- `boolean:true`. Rule is reset to the defaultValue or false.
- `multiple:true`. If a value was passed, that value will be deleted from the rule's value array. If no value was passed, the rule's entire value array is deleted.
- `multiple:false`. Rule is reset to the defaultValue or undefined.

```ts
finder.filters.delete(id: AnyFilterRuleDefinition | string, value?: any) => void
```

### get

Retrieve the processed value for a filter rule. If the rule has a `defaultValue` and no local state, the default will be returned. If a rule is required, the first valid option will be returned if possible.

```ts
finder.filters.get(id: AnyFilterRuleDefinition | string) => any
```

### getRule

Retrieve the hydrated version of the filter rule. Useful for building controls!

```ts
finder.filters.getRule(id: AnyFilterRuleDefinition | string) => HydratedFilterRuleDefinition | Error
```

### has

Check the processed value for a filter rule or option. For a boolean rule, if `required` or set, it will return true. For rules with defined options, you can pass an option to see if that value is selected.

```ts
finder.filters.has(id: AnyFilterRuleDefinition | string, optionValue?: FilterOption | any) => boolean
```

### isActive

Check if a rule has a value, or has `required:true`.

```ts
finder.filters.isActive(id: AnyFilterRuleDefinition | string) => boolean
```

### set

This behaves slightly differently by rule flavour.

- `boolean:true`. value must be a boolean.
- `multiple:true`. the value will be appended to the rule's existing value array.
- `multiple:false`. Set the rule's value. If the passed value is `undefined`, the rule will be reset.

```ts
finder.filters.set(id: AnyFilterRuleDefinition | string, value?: any) => void
```

### reset

ALL active rules are reset.

```ts
finder.filters.reset() => void
```

### test

This tests an array of rules and values against the current dataset without committing the change to state.

```ts
finder.filters.test(options: {
    rules: (AnyFilterRuleDefinition | string)[];
    values?: Record<string, any>;
    isAdditive?: boolean;
}) => FItem[]
```

### testRule

Test a single rule and value against the current dataset without committing the change to state.

```ts
finder.filters.testRule(rule: AnyFilterRuleDefinition | string, value: any, isAdditive?: boolean) => FItem[]
```

### testRuleOptions

Test all defined options of a rule against the current dataset without committing the change to state.

```ts
finder.filters.testRuleOptions(rule: AnyFilterRuleDefinition | string, isAdditive?: boolean) => FItem[]
```

### toggle

This behaves slightly differently by rule flavour.

- `boolean:true`. The rule is toggled on and off.
- `multiple:true`, the passed optionValue will be toggled. Other selected values will not be affected.
- `multiple:false`, the rule will be set to the passed optionValue. If the selected option is already the existing state, the rule will be reset instead.

```ts
finder.filters.toggle(id: AnyFilterRuleDefinition | string, optionValue?: FilterOption | any) => void
```

## Example Usage

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
