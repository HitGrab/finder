# Core Concepts

# Installation

Run `npm i @hitgrab/finder` in your repo of choice.

## Concepts

Finder is a headless interface to speed dataset manipulation.

- **Rules** are object literals that tell Finder how to interact with your item object.
  Rules can _search, filter, sort_ and _group_ data.
- **Ruleset** is a group of rules, normally sharing a common data type.
- **Items** are your dataset of strings, objects, classes or any other iterable data shape.
- **Matches** are the final result of your data manipulation, after searches, filters, sort and group rules have all been processed.
- **Context** is additional injected data that is not part of the item dataset. For example, a user's shoe size might not be part of the items dataset, but may still be relevant to sorting relevant results.
- **Effects** are a glue that that couple rules together for complex interactions. For example, two filters might be incompatible.

At it's simplest, all you need is Rules and a dataset of Items. Let's build a quick example to see how it works!
