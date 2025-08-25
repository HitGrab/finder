---
title: String Comparison
sidebar_position: 2
---

# Comparison Algorithms

Some sample algorithms are available.

## finderStringCompare

`finderStringCompare(haystack: string, needle: string, aliases?: string[] | null)`

Case-insensitive sequential string comparison with line breaks and white spaces removed.

- Searching for "pru" in "hydraulic pressure" does not match.
- Searching for "dyr" in "hydraulic pressure" does not match.
- Searching for "hydrau" in "hydraulic pressure" matches "**hydra**ulic pressure".

## finderCharacterCompare

`finderCharacterCompare(haystack: string, needle: string, aliases?: string[] | null)`

Compare if all needle characters are found in the haystack in any order.

- Searching for "pru" in "hydraulic pressure" matches "hyd**r**a**u**lic **pr**ess**ur**e".
- Searching for "hydrau" in "hydraulic pressure" matches "**hydrau**lic p**r**ess**ur**e".

## finderSequentialCharacterCompare

`finderSequentialCharacterCompare(haystack: string, needle: string, aliases?: string[] | null)`

Compare if the same characters are represented sequentially in a string.

- Searching for "pru" in "hydraulic pressure" matches "hydraulic **pr**ess**u**re"
- Searching for "dyr" in "hydraulic pressure" does not match.
- Searching for "r a s s e" in "hydraulic pressure" matches "hyd**ra**ulic pre**ss**ur**e**".
