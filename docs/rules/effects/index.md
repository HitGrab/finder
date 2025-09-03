# Effects

Effects let you trigger callbacks when certain Finder conditions change. While you could also use an onChange event to recreate the same functionality, effects can be invaluable tools for complex forms with connected rules.

**Rule Effects**

ruleEffects are onChange callbacks triggered when certain rules are changed. It allows you to couple related rules without adding complex onChange events.

**Search Effects**

searchEffects are triggered when the user searches for certain terms. You may want to suggest a filter, or preload data based on their search terms.
