let react = require("react");
let react_jsx_runtime = require("react/jsx-runtime");
let lodash = require("lodash");

//#region src/core/utils/rule-type-enforcers.ts
/**
* Enforce structure for an array of rule of mixed types.
*/
function finderRuleset(rules) {
	return rules;
}
function searchRule(rule) {
	return rule;
}
function filterRule(rule) {
	return rule;
}
function sortByRule(rule) {
	return rule;
}
function groupByRule(rule) {
	return rule;
}
function ruleEffect(rules, onChange) {
	return {
		rules,
		onChange
	};
}
function searchEffect(haystack, onChange) {
	return {
		haystack,
		onChange
	};
}
function transformFilterToSingleValue(filter) {
	const composedFilter = { ...filter };
	delete composedFilter.boolean;
	delete composedFilter.multiple;
	return composedFilter;
}
function transformFilterToBoolean(filter) {
	const composedFilter = { ...filter };
	delete composedFilter.multiple;
	return {
		...composedFilter,
		boolean: true
	};
}
function transformFilterToMultiple(filter) {
	const composedFilter = { ...filter };
	delete composedFilter.boolean;
	return {
		...composedFilter,
		multiple: true
	};
}

//#endregion
//#region src/react/providers/finder-core-context.ts
const FinderCoreContext = (0, react.createContext)(null);

//#endregion
//#region src/react/hooks/use-finder.ts
function useFinder() {
	const value = (0, react.useContext)(FinderCoreContext);
	if (value === null) throw new Error("useFinder requires a FinderContext.");
	const [instance] = value;
	return instance;
}

//#endregion
//#region src/react/components/finder-content-loading.tsx
function FinderContentLoading({ children: Component }) {
	const finder = useFinder();
	if (finder.isLoading) {
		if (typeof Component === "function") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Component, {
			pagination: finder.pagination,
			context: finder.context
		});
		return Component;
	}
	return null;
}

//#endregion
//#region src/react/components/finder-content-empty.tsx
function FinderContentEmpty({ children: Component }) {
	const finder = useFinder();
	if (finder.isEmpty) {
		if (typeof Component === "function") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Component, {
			pagination: finder.pagination,
			context: finder.context
		});
		return Component;
	}
	return null;
}

//#endregion
//#region src/react/components/finder-content-no-matches.tsx
function FinderContentNoMatches({ children: Component }) {
	const finder = useFinder();
	if (finder.isEmpty === false && finder.hasMatches === false) {
		if (typeof Component === "function") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Component, {
			pagination: finder.pagination,
			context: finder.context
		});
		return Component;
	}
	return null;
}

//#endregion
//#region src/react/components/finder-content-items.tsx
function FinderContentItems({ children: Component }) {
	const finder = useFinder();
	if (finder.hasMatches && finder.matches.items) {
		if (typeof Component === "function") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Component, {
			items: finder.matches.items,
			pagination: finder.pagination,
			context: finder.context
		});
		return Component;
	}
	return null;
}

//#endregion
//#region src/react/components/finder-content-groups.tsx
function FinderContentGroups({ children: Component }) {
	const finder = useFinder();
	if (finder.hasMatches && finder.matches.groups) {
		if (typeof Component === "function") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Component, {
			groups: finder.matches.groups,
			pagination: finder.pagination,
			context: finder.context
		});
		return Component;
	}
	return null;
}

//#endregion
//#region src/react/components/finder-content.tsx
function FinderContent({ children: renderProps }) {
	if (Object.values(renderProps).length === 0) throw new Error("No render props were found.");
	return [
		renderProps.loading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FinderContentLoading, { children: renderProps.loading }, "loading"),
		renderProps.empty && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FinderContentEmpty, { children: renderProps.empty }, "empty"),
		renderProps.noMatches && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FinderContentNoMatches, { children: renderProps.noMatches }, "noMatches"),
		renderProps.items && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FinderContentItems, { children: renderProps.items }, "items"),
		renderProps.groups && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FinderContentGroups, { children: renderProps.groups }, "groups")
	];
}
FinderContent.Loading = FinderContentLoading;
FinderContent.Empty = FinderContentEmpty;
FinderContent.NoMatches = FinderContentNoMatches;
FinderContent.Items = FinderContentItems;
FinderContent.Groups = FinderContentGroups;

//#endregion
//#region src/core/search/search-string-transform.ts
/**
* Ensure haystacks and needles are formatted consistently.
*
* Transforming includes:
* 1. Convert to lowercase.
* 2. Strip all non-word and non-digit characters.
*/
function transformStringForComparison(value) {
	return value.toLowerCase().replace(/[^\w\d]+/g, "");
}

//#endregion
//#region src/core/search/calculate-character-match-indexes.ts
function calculateCharacterMatchIndexes(haystack, needle) {
	const subqueryRegex = /* @__PURE__ */ new RegExp(/"(.*?)"/g);
	let needleWithoutSubqueries = needle;
	let characterIndexes = [];
	let subquery;
	let hasFailedSubquery = false;
	while ((subquery = subqueryRegex.exec(needle)) !== null && hasFailedSubquery === false) {
		const subqueryCharacterIndexes = calculateExactStringCharacterIndexes(haystack, transformStringForComparison(String(subquery[1])));
		if (subqueryCharacterIndexes === void 0) hasFailedSubquery = true;
		else {
			characterIndexes = characterIndexes.concat(subqueryCharacterIndexes);
			needleWithoutSubqueries = needleWithoutSubqueries.replace(subquery[0], "");
		}
	}
	if (hasFailedSubquery) return;
	const sequentialCharacterIndexes = calculateSequentialCharacterIndexes(haystack, transformStringForComparison(needleWithoutSubqueries));
	if (sequentialCharacterIndexes === void 0) return;
	characterIndexes = characterIndexes.concat(sequentialCharacterIndexes);
	return characterIndexes.sort((a, b) => a - b);
}
function calculateExactStringCharacterIndexes(haystack, needle) {
	if (haystack.length < needle.length) return;
	const index = haystack.indexOf(needle);
	if (index === -1) return;
	return (0, lodash.range)(index, index + needle.length).map((characterIndex) => characterIndex);
}
function calculateSequentialCharacterIndexes(haystack, needle) {
	if (haystack.length < needle.length) return;
	const needleAsCharacterArray = Array.from(needle);
	const characterMatches = [];
	let hayStackToIterateThrough = haystack;
	let numProcessedCharacters = 0;
	let hasMismatch = false;
	for (const character of needleAsCharacterArray) {
		const indexInHaystack = hayStackToIterateThrough.indexOf(character);
		if (indexInHaystack === -1) hasMismatch = true;
		if (hasMismatch === false) {
			characterMatches.push(numProcessedCharacters + indexInHaystack);
			const numCharactersToRemove = indexInHaystack + 1;
			numProcessedCharacters += numCharactersToRemove;
			hayStackToIterateThrough = hayStackToIterateThrough.substring(numCharactersToRemove);
		}
	}
	if (hasMismatch) return;
	return characterMatches;
}

//#endregion
//#region src/core/search/string-match-haystack.ts
var StringMatchHaystack = class StringMatchHaystack {
	#transformedSegments;
	constructor(haystack) {
		this.source = haystack;
		const segments = StringMatchHaystack.composeTransformedHaystackSegments(haystack);
		this.#transformedSegments = segments;
		this.transformed = segments.map((segment) => segment.value).join("").toLowerCase();
	}
	getSourceCharacterIndex(transformedCharacterIndex) {
		let segmentStart = 0;
		return this.#transformedSegments.reduce((sourceIndex, segment) => {
			if (sourceIndex !== Infinity) return sourceIndex;
			const segmentEnd = segmentStart + segment.value.length;
			if (transformedCharacterIndex >= segmentStart && transformedCharacterIndex <= segmentEnd) {
				const relativeIndex = transformedCharacterIndex - segmentStart;
				sourceIndex = segment.index + relativeIndex;
			}
			segmentStart += segment.value.length;
			return sourceIndex;
		}, Infinity);
	}
	/**
	* We need to preserve the relationship between the source and the transformed results.
	*/
	static composeTransformedHaystackSegments(haystack) {
		const safeCharacters = haystack.matchAll(/[\w\d]+/g);
		const segments = [];
		for (const match of safeCharacters) segments.push({
			value: match[0],
			index: match.index,
			length: match[0].length
		});
		return segments;
	}
};

//#endregion
//#region src/core/search/calculate-string-match-segments.ts
/**
* Helper function to determine which specfic characters are matched inside a string.
*/
function calculateStringMatchSegments(haystack, needle) {
	return (Array.isArray(haystack) ? haystack : [haystack]).map((hay) => new StringMatchHaystack(hay)).reduce((match, haystack$1) => {
		if (match !== void 0) return match;
		const matchedCharacterIndexes = calculateCharacterMatchIndexes(haystack$1.transformed, needle);
		if (matchedCharacterIndexes === void 0) return match;
		return prettifyResultSegments(processResultSegments(haystack$1, prepareResultSegments(matchedCharacterIndexes, haystack$1.transformed)));
	}, void 0);
}
/**
* Find result segments based on the transformed Haystack value
*/
function prepareResultSegments(characterMatches, transformedHaystackString) {
	const stringToProcess = [...characterMatches];
	const matches = [];
	let iterationCount = 0;
	while (stringToProcess.length > 0 && iterationCount < 100) {
		const characterMatchIndex = stringToProcess.at(0);
		if (characterMatchIndex === void 0) throw new Error("Should never get here");
		let numSequentialIndexes = 1;
		for (let x = 1; x <= stringToProcess.length; x += 1) {
			const nextChar = stringToProcess.at(x);
			if (nextChar !== void 0 && characterMatchIndex + x === nextChar) numSequentialIndexes += 1;
		}
		const index = characterMatchIndex;
		const end = characterMatchIndex + numSequentialIndexes;
		const value = transformedHaystackString.substring(index, end);
		matches.push({
			index,
			value,
			is_match: true,
			length: value.length
		});
		stringToProcess.splice(0, numSequentialIndexes);
		iterationCount += 1;
	}
	return matches;
}
/**
* Map the transformed haystack matches back to the source string.
*/
function processResultSegments(haystack, matches) {
	return matches.reduce((acc, match, x) => {
		/**
		* If our first postive match does not begin at index zero, we prefix a negative result segment ending where the first positive match begins.
		*/
		if (x === 0 && match.index !== 0) {
			const value = haystack.source.substring(0, haystack.getSourceCharacterIndex(match.index));
			acc.push({
				index: 0,
				value,
				is_match: false,
				length: value.length
			});
		}
		const currentSegmentStart = haystack.getSourceCharacterIndex(match.index);
		const currentSegmentEnd = haystack.getSourceCharacterIndex(match.index + match.length);
		const currentSegmentValue = haystack.source.substring(currentSegmentStart, currentSegmentEnd);
		acc.push({
			index: currentSegmentStart,
			value: currentSegmentValue,
			is_match: true,
			length: currentSegmentValue.length
		});
		const nextMatch = matches.at(x + 1);
		if (nextMatch) {
			const negativeSegmentStart = haystack.getSourceCharacterIndex(match.index + match.length);
			const negativeSegmentEnd = haystack.getSourceCharacterIndex(nextMatch.index);
			const negativeSegmentValue = haystack.source.substring(negativeSegmentStart, negativeSegmentEnd);
			acc.push({
				index: negativeSegmentStart,
				value: negativeSegmentValue,
				is_match: false,
				length: negativeSegmentValue.length
			});
		} else if (currentSegmentStart + currentSegmentValue.length !== haystack.source.length) {
			const finalSegmentStart = currentSegmentStart + currentSegmentValue.length;
			const finalSegmentValue = haystack.source.substring(finalSegmentStart);
			acc.push({
				index: finalSegmentStart,
				value: finalSegmentValue,
				is_match: false,
				length: finalSegmentValue.length
			});
		}
		return acc;
	}, []);
}
/** Adjust whitespaces around segments to tightly match positive segments. */
function prettifyResultSegments(segments) {
	const regexp = /\S/;
	const prettySegments = [...segments];
	prettySegments.forEach((segment, index) => {
		if (segment.is_match) {
			const firstNonWhitespaceIndex = segment.value.search(regexp);
			if (firstNonWhitespaceIndex !== 0) {
				const previousSegment = prettySegments.at(index - 1);
				if (previousSegment) {
					previousSegment.length += firstNonWhitespaceIndex;
					previousSegment.value += segment.value.substring(0, firstNonWhitespaceIndex);
					segment.value = segment.value.substring(firstNonWhitespaceIndex);
					segment.index = segment.index + firstNonWhitespaceIndex;
				}
			}
		}
	});
	return prettySegments;
}
/**
* Determine if a characterIndexFn would return a result for a haystack.
*/
function hasCharacterIndexMatches(haystack, needle) {
	return (Array.isArray(haystack) ? haystack : [haystack]).some((hay) => {
		return calculateCharacterMatchIndexes(transformStringForComparison(hay), needle) !== void 0;
	});
}

//#endregion
//#region src/react/components/string-match.tsx
/**
* Split a string into result segment components .
*/
function StringMatch({ needle, haystack, Match = "mark", Miss }) {
	const segments = (0, react.useMemo)(() => calculateStringMatchSegments(haystack, needle), [haystack, needle]);
	if (segments === void 0) return haystack;
	return segments.map((segment, index) => {
		const key = [segment.value, index].join();
		if (segment.is_match) {
			if (typeof Match === "string") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Match, {
				"data-is-match": segment.is_match,
				children: segment.value
			}, key);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Match, {
				"data-is-match": segment.is_match,
				segment,
				segmentIndex: index
			}, key);
		} else if (Miss !== void 0) {
			if (typeof Miss === "string") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Miss, {
				"data-is-match": segment.is_match,
				children: segment.value
			}, key);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Miss, {
				"data-is-match": segment.is_match,
				segment,
				segmentIndex: index
			}, key);
		}
		return segment.value;
	});
}

//#endregion
//#region src/react/components/finder-search-term-haystack.tsx
function FinderSearchTermHaystack({ Match = "mark", Miss, children: haystack }) {
	const finder = useFinder();
	if (finder.search.hasSearchTerm === false) return haystack;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StringMatch, {
		needle: finder.search.searchTerm,
		haystack,
		Match,
		Miss
	});
}

//#endregion
//#region src/core/debounce-callback-registry.ts
function DebounceCallbackRegistry() {
	const registry = /* @__PURE__ */ new Map();
	return (rule, callback) => {
		if (rule.debounceMilliseconds === void 0) return callback();
		if (registry.has(rule) === false) registry.set(rule, (0, lodash.debounce)((cb) => cb(), rule.debounceMilliseconds));
		return registry.get(rule)?.(callback);
	};
}

//#endregion
//#region src/core/event-emitter.ts
/**
* A barebones event emitter
*/
var EventEmitter = class {
	#listeners = /* @__PURE__ */ new Map();
	#disabled = false;
	on(event, callback) {
		if (this.#listeners.has(event) === false) this.#listeners.set(event, /* @__PURE__ */ new Set());
		this.#listeners.get(event)?.add(callback);
	}
	off(event, callback) {
		if (this.#listeners.has(event) === false) return;
		if (callback === void 0) {
			this.#listeners.delete(event);
			return;
		}
		this.#listeners.get(event)?.delete(callback);
	}
	emit(event, payload) {
		if (this.#disabled) return;
		this.#listeners.get(event)?.forEach((callback) => {
			callback(payload);
		});
	}
	silently(callback) {
		this.#disabled = true;
		callback();
		this.#disabled = false;
	}
	isSilent() {
		return this.#disabled;
	}
};

//#endregion
//#region src/core/core-constants.ts
const EVENTS = {
	INIT: "init",
	FIRST_USER_INTERACTION: "firstUserInteraction",
	READY: "ready",
	CHANGE: "change",
	SET_ITEMS: "setItems",
	SET_IS_LOADING: "setIsLoading",
	SET_IS_DISABLED: "setIsDisabled",
	SET_CONTEXT: "setContext",
	SET_SEARCH_TERM: "setSearchTerm",
	RESET_SEARCH_TERM: "resetSearchTerm",
	SET_FILTER: "setFilter",
	RESET_FILTERS: "resetFilters",
	SET_SORT_BY: "setSortBy",
	SET_SORT_BY_DIRECTION: "setSortDirection",
	SET_GROUP_BY: "setGroupBy",
	SET_GROUP_SORT_BY_DIRECTION: "setGroupBySortDirection",
	SET_PAGE: "setPage",
	SET_NUM_ITEMS_PER_PAGE: "setNumItemsPerPage",
	SYNC_UPDATED_AT: "syncUpdatedAt"
};
const EVENT_SOURCE = {
	CORE: "core",
	SEARCH: "search",
	FILTERS: "filters",
	GROUP_BY: "groupBy",
	SORT_BY: "sortBy",
	PAGINATION: "pagination"
};
const ERRORS = {
	RULE_NOT_FOUND: "Finder could not locate requested rule",
	WRONG_RULE_TYPE_FOR_MIXIN: "The requested rule is not valid for this mixin.",
	NO_SEARCH_RULE_SET: "Unable to set search term; no SearchRule was found.",
	INVALID_SEARCH_TERM_TYPE: "Search terms must be strings.",
	NO_MATCHING_OPTION_FOUND_WITH_STRICT_OPTIONS: "Finder could not find a matching option with the passed value could be found. If this is intended, set 'strictOptions:false' in the rule definition.",
	SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY: "Finder could not set this filter value, as the rule requires an array.",
	ADDING_OPTION_TO_MULTIPLE_FILTER_WITHOUT_OPTION_VALUE: "Finder could not add to this filter, as no optionValue was passed.",
	DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER: "Finder could not delete an option from this filter, as it does not support multiple values.",
	SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE: "Finder could not set this filter value, as the rule requires a boolean.",
	ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER: "Finder could not add to this filter value, as the rule is a boolean.",
	TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS: "Finder could not toggle this filter rule option, as the filter does not have any options.",
	TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE: "Finder could not toggle this filter rule option, as the rule does not allow multiple values.",
	TOGGLING_OPTION_THAT_DOES_NOT_EXIST: "Finder could not toggle this filter rule option, as the option was not found.",
	TOGGLING_OPTION_WITHOUT_PASSING_OPTION: "Finder could not toggle this filter rule option, as the option was not found.",
	TOGGLING_BOOLEAN_FILTER_WITH_UNUSED_VALUE: "Finder could not toggle this filter rule option, as boolean filters do not have options.",
	TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS: "Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.",
	INVALID_RULE_WITHOUT_ID: "Init failed: Missing rule id.",
	INVALID_RULE_SHAPE: "Init failed: Malformed rule definition",
	INVALID_RULE_DUPLICATE: "Init failed: Duplicate rule id."
};

//#endregion
//#region src/core/finder-error.ts
var FinderError = class extends Error {
	constructor(message, options) {
		const extendedMessage = `${message} ${JSON.stringify({ ...options })}`;
		super(extendedMessage);
		this.name = "FinderError";
	}
};

//#endregion
//#region src/core/utils/rule-utils.ts
function isSortByRuleDefinition(rule) {
	return typeof rule === "object" && rule !== null && "sortFn" in rule;
}
function isSearchRuleDefinition(rule) {
	return typeof rule === "object" && rule !== null && "searchFn" in rule;
}
function isFilterRuleDefinition(rule) {
	return typeof rule === "object" && rule !== null && "filterFn" in rule;
}
function isFilterRuleDefinitionWithHydratedOptions(rule) {
	return isFilterRuleDefinition(rule) && typeof rule.options !== "function";
}
function isGroupByRuleDefinition(rule) {
	return typeof rule === "object" && rule !== null && "groupFn" in rule;
}
function isRuleEffectDefinition(data) {
	return typeof data === "object" && data !== null && ("rules" in data || "callback" in data);
}
function isSearchEffectDefinition(data) {
	return typeof data === "object" && data !== null && ("haystack" in data || "callback" in data);
}
function isBooleanFilterRuleDefinition(rule) {
	return isFilterRuleDefinition(rule) && rule.boolean === true;
}
function isMultipleValueFilterRuleDefinition(rule) {
	return isFilterRuleDefinition(rule) && rule.multiple === true;
}
function isSingleValueFilterRuleDefinition(rule) {
	return isFilterRuleDefinition(rule) && rule.multiple !== true && rule.boolean !== true;
}

//#endregion
//#region src/core/filters/boolean-filter-handler.ts
function BooleanFilterHandler(definition) {
	return {
		validate(value) {
			if (value !== void 0 && typeof value !== "boolean") throw new FinderError(ERRORS.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, {
				rule: definition,
				value
			});
			return true;
		},
		parse(value) {
			if (typeof value !== "boolean" && value !== void 0) return false;
			if (value === void 0) {
				if (definition.required) return true;
				if (definition.defaultValue !== void 0) return definition.defaultValue;
				return false;
			}
			return value;
		},
		has(value) {
			return this.parse(value);
		},
		toggle(value, optionValue) {
			const parsedValue = this.parse(value);
			if (typeof parsedValue !== "boolean") throw new FinderError(ERRORS.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, {
				rule: definition,
				value: parsedValue,
				optionValue
			});
			return !parsedValue;
		},
		add(value, optionValue) {
			throw new FinderError(ERRORS.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, {
				rule: definition,
				value,
				optionValue
			});
		},
		delete(value, optionValue) {
			if (optionValue !== void 0) throw new FinderError(ERRORS.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, {
				rule: definition,
				value,
				optionValue
			});
		},
		isActive(value) {
			if (definition.required) return true;
			return this.parse(value) === true;
		},
		isMatch(item, value, context) {
			return definition.filterFn(item, value, context);
		}
	};
}

//#endregion
//#region src/core/filters/multiple-filter-handler.ts
function MultipleFilterHandler(definition) {
	return {
		validate(value) {
			if (value !== void 0 && Array.isArray(value) === false) throw new FinderError(ERRORS.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, {
				rule: definition,
				value
			});
			if (definition.strictOptions && Array.isArray(definition.options) && Array.isArray(value)) {
				if (value.every((row) => {
					return definition.options?.some((option) => option.value === row);
				}) === false) throw new FinderError(ERRORS.NO_MATCHING_OPTION_FOUND_WITH_STRICT_OPTIONS, {
					rule: definition,
					value
				});
			}
			return true;
		},
		parse(value) {
			if (value === void 0) {
				if (definition.required && Array.isArray(definition.options) && definition.options.length > 0) return [definition.options.at(0)?.value];
				return [];
			}
			if (Array.isArray(value)) return value;
			throw new FinderError(ERRORS.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, {
				rule: definition,
				value
			});
		},
		has(value, optionValue) {
			if (optionValue === void 0) return Array.isArray(value) && value.length > 0;
			else if (Array.isArray(optionValue)) return optionValue.every((optionIdentifier) => this.has(definition, optionIdentifier));
			const optionToTest = definition.options?.find((option) => {
				if (typeof optionValue === "object" && "value" in optionValue) return option.value === optionValue.value;
				return option.value === optionValue;
			});
			return Array.isArray(value) && optionToTest !== void 0 && value.includes(optionToTest.value);
		},
		toggle(value, optionValue) {
			const parsedValue = this.parse(value);
			if (Array.isArray(parsedValue) === false) throw new FinderError(ERRORS.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, {
				rule: definition,
				value: parsedValue
			});
			if (optionValue === void 0) throw new FinderError(ERRORS.TOGGLING_OPTION_WITHOUT_PASSING_OPTION, { rule: definition });
			if (definition.options === void 0) throw new FinderError(ERRORS.TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS, {
				rule: definition,
				optionValue
			});
			const optionToToggle = definition.options.find((option) => {
				if (typeof optionValue === "object" && "value" in optionValue) return option.value === optionValue.value;
				return option.value === optionValue;
			});
			if (optionToToggle === void 0) throw new FinderError(ERRORS.TOGGLING_OPTION_THAT_DOES_NOT_EXIST, {
				rule: definition,
				optionValue
			});
			if (parsedValue.includes(optionToToggle.value)) return [...parsedValue.filter((row) => row !== optionToToggle.value)];
			return [...parsedValue, optionToToggle.value];
		},
		add(value, optionValue) {
			const parsedValue = this.parse(value);
			if (optionValue === void 0) throw new FinderError(ERRORS.ADDING_OPTION_TO_MULTIPLE_FILTER_WITHOUT_OPTION_VALUE, {
				rule: definition,
				optionValue
			});
			const optionToToggle = definition.options?.find((option) => {
				if (typeof optionValue === "object" && "value" in optionValue) return option.value === optionValue.value;
				return option.value === optionValue;
			});
			if (optionToToggle !== void 0) {
				if (parsedValue.includes(optionToToggle.value) === false) return [...parsedValue, optionToToggle.value];
				return parsedValue;
			}
			return [...parsedValue, optionValue];
		},
		delete(value, optionValue) {
			if (optionValue === void 0) return;
			const parsedValue = this.parse(value);
			const optionToToggle = definition.options?.find((option) => {
				if (typeof optionValue === "object" && "value" in optionValue) return option.value === optionValue.value;
				return option.value === optionValue;
			});
			if (optionToToggle !== void 0 && parsedValue.includes(optionToToggle.value)) return parsedValue.filter((value$1) => value$1 !== optionToToggle.value);
			return parsedValue.filter((row) => row !== optionValue);
		},
		isActive(value) {
			if (definition.required) return true;
			return this.parse(value).length > 0;
		},
		isMatch(item, value, context) {
			if (Array.isArray(value)) return value.some((value$1) => definition.filterFn(item, value$1, context));
			return false;
		}
	};
}

//#endregion
//#region src/core/filters/single-filter-handler.ts
function SingleFilterHandler(definition) {
	return {
		validate(value) {
			if (definition.strictOptions && Array.isArray(definition.options)) {
				if (definition.options.find((option) => {
					return option.value === value;
				}) === void 0) throw new FinderError(ERRORS.NO_MATCHING_OPTION_FOUND_WITH_STRICT_OPTIONS, {
					rule: definition,
					value
				});
			}
			return true;
		},
		parse(value) {
			if (value === void 0 && definition.required) {
				if (definition.defaultValue) return definition.defaultValue;
				if (Array.isArray(definition.options) && definition.options.length > 0) return definition.options.at(0)?.value;
			}
			return value;
		},
		has(value) {
			return value !== void 0;
		},
		toggle(value, optionValue) {
			throw new FinderError(ERRORS.TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE, {
				rule: definition,
				value,
				optionValue
			});
		},
		add(value, optionValue) {
			throw new FinderError(ERRORS.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, {
				rule: definition,
				value,
				optionValue
			});
		},
		delete(value, optionValue) {
			if (optionValue !== void 0) throw new FinderError(ERRORS.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, {
				rule: definition,
				value,
				optionValue
			});
		},
		isActive(value) {
			if (definition.required) return true;
			if (value === void 0) return false;
			if (typeof value === "string" && value.trim() === "") return false;
			return true;
		},
		isMatch(item, value, context) {
			return definition.filterFn(item, value, context);
		}
	};
}

//#endregion
//#region src/core/filters/filter-handler.ts
function makeFilterHandler(definition) {
	if (isMultipleValueFilterRuleDefinition(definition)) return MultipleFilterHandler(definition);
	if (isBooleanFilterRuleDefinition(definition)) return BooleanFilterHandler(definition);
	if (isSingleValueFilterRuleDefinition(definition)) return SingleFilterHandler(definition);
	throw new FinderError(ERRORS.INVALID_RULE_SHAPE, { definition });
}

//#endregion
//#region src/core/filters-mixin.ts
var FiltersMixin = class {
	#rawValues;
	#deps;
	constructor({ initialFilters }, deps) {
		this.#rawValues = initialFilters ?? {};
		this.#deps = deps;
	}
	set(identifier, value) {
		if (this.#deps.isDisabled()) return;
		const rule = this.getRule(identifier);
		const previousValue = this.get(identifier);
		const transformedFilterValue = typeof value === "string" && value.trim() === "" ? void 0 : value;
		makeFilterHandler(rule).validate(value);
		if (this.#rawValues[rule.id] !== void 0 && this.#rawValues[rule.id] === transformedFilterValue) return;
		this.#deps.debouncer(rule, () => {
			this.#rawValues = {
				...this.#rawValues,
				[rule.id]: transformedFilterValue
			};
			this.#deps.touch({
				source: EVENT_SOURCE.FILTERS,
				event: EVENTS.SET_FILTER,
				current: transformedFilterValue,
				initial: previousValue,
				rule
			});
		});
	}
	get rules() {
		return this.#deps.getRuleBook().rules.filter(isFilterRuleDefinitionWithHydratedOptions);
	}
	get activeRules() {
		return this.rules.filter((rule) => makeFilterHandler(rule).isActive(this.#rawValues[rule.id]));
	}
	get(identifier) {
		const rule = this.getRule(identifier);
		const value = this.#rawValues[rule.id];
		return makeFilterHandler(rule).parse(value);
	}
	has(identifier, optionValue) {
		const rule = this.getRule(identifier);
		const value = this.#rawValues[rule.id];
		return makeFilterHandler(rule).has(value, optionValue);
	}
	getRule(identifier) {
		const rule = this.#deps.getRuleBook().getRule(identifier);
		if (!isFilterRuleDefinitionWithHydratedOptions(rule)) throw new FinderError(ERRORS.WRONG_RULE_TYPE_FOR_MIXIN, { rule });
		return rule;
	}
	add(identifier, optionValue) {
		const rule = this.getRule(identifier);
		const value = this.#rawValues[rule.id];
		this.set(rule, makeFilterHandler(rule).add(value, optionValue));
	}
	delete(identifier, optionValue) {
		const rule = this.getRule(identifier);
		const value = this.#rawValues[rule.id];
		this.set(rule, makeFilterHandler(rule).delete(value, optionValue));
	}
	toggle(identifier, optionValue) {
		const rule = this.getRule(identifier);
		const value = this.#rawValues[rule.id];
		if (rule.boolean && optionValue !== void 0) throw new FinderError(ERRORS.TOGGLING_BOOLEAN_FILTER_WITH_UNUSED_VALUE, {
			rule,
			value
		});
		const toggledValue = makeFilterHandler(rule).toggle(value, optionValue);
		this.set(rule, toggledValue);
	}
	reset() {
		const previousValues = this.values;
		this.#rawValues = {};
		this.#deps.touch({
			source: EVENT_SOURCE.FILTERS,
			event: EVENTS.RESET_FILTERS,
			current: this.values,
			initial: previousValues
		});
	}
	isRuleActive(identifier) {
		const rule = this.getRule(identifier);
		const value = this.#rawValues[rule.id];
		return makeFilterHandler(rule).isActive(value);
	}
	test(options) {
		if (this.#deps.isLoading()) return [];
		if (options.isAdditive) {
			const rules = (0, lodash.uniqBy)([...this.rules, ...options.rules], "id");
			const values = {
				...this.values,
				...options.values
			};
			return this.#deps.test({ filters: {
				rules,
				values
			} }, true);
		}
		return this.#deps.test({ filters: {
			rules: options.rules,
			values: options.values ?? {}
		} });
	}
	testRule({ rule: identifier, value,...options }) {
		const rule = this.getRule(identifier);
		return this.test({
			rules: [rule],
			values: { [rule.id]: value },
			...options
		});
	}
	testRuleOptions(identifier, isAdditive) {
		if (this.#deps.isLoading()) return /* @__PURE__ */ new Map();
		const rule = this.getRule(identifier);
		if (rule.boolean) {
			const resultMap = /* @__PURE__ */ new Map();
			resultMap.set(true, this.testRule({
				rule,
				value: true
			}));
			resultMap.set(false, this.testRule({
				rule,
				value: false
			}));
			return resultMap;
		}
		if (Array.isArray(rule.options)) {
			const resultMap = /* @__PURE__ */ new Map();
			rule.options.forEach((option) => {
				let transformedOptionValue;
				if (rule.multiple) transformedOptionValue = [option.value];
				else transformedOptionValue = option.value;
				resultMap.set(option, this.testRule({
					rule,
					value: transformedOptionValue,
					isAdditive
				}));
			});
			return resultMap;
		}
		throw new FinderError(ERRORS.TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS, rule);
	}
	get values() {
		return this.rules.reduce((acc, rule) => {
			acc[rule.id] = this.get(rule);
			return acc;
		}, {});
	}
	get raw() {
		return this.#rawValues;
	}
	serialize() {
		return {
			rules: this.rules,
			values: this.values
		};
	}
	static process(options, items, context) {
		const activeRules = options.rules.filter((rule) => {
			return isFilterRuleDefinitionWithHydratedOptions(rule) && makeFilterHandler(rule).isActive(options.values[rule.id]);
		});
		if (activeRules.length === 0) return items;
		return items.filter((item) => {
			return activeRules.every((rule) => isFilterRuleDefinitionWithHydratedOptions(rule) && makeFilterHandler(rule).isMatch(item, options.values[rule.id], context));
		});
	}
};

//#endregion
//#region src/core/group-by-mixin.ts
var GroupByMixin = class {
	#groupBy;
	#groupBySortDirection;
	#deps;
	constructor({ initialGroupBy, initialGroupBySortDirection, requireGroup }, deps) {
		this.#deps = deps;
		if (initialGroupBy) this.#groupBy = this.getRule(initialGroupBy);
		this.#groupBySortDirection = initialGroupBySortDirection;
		this.requireGroup = requireGroup;
	}
	getRule(identifier) {
		const rule = this.#deps.getRuleBook().getRule(identifier);
		if (isGroupByRuleDefinition(rule) === false) throw new FinderError(ERRORS.WRONG_RULE_TYPE_FOR_MIXIN, { rule });
		return rule;
	}
	get rules() {
		return this.#deps.getRuleBook().rules.filter(isGroupByRuleDefinition);
	}
	get activeRule() {
		const defaultRule = this.requireGroup ? this.rules.at(0) : void 0;
		return this.#groupBy ?? defaultRule;
	}
	get hasGroupByRule() {
		return this.activeRule !== void 0;
	}
	get groupBySortDirection() {
		return this.#groupBySortDirection ?? this.activeRule?.defaultGroupSortDirection;
	}
	set(identifier) {
		if (this.#deps.isDisabled()) return;
		const previousRule = this.#groupBy;
		let rule;
		const isBlankString = typeof identifier === "string" && identifier.trim() === "";
		if (isBlankString) rule = void 0;
		if (isBlankString === false && identifier !== void 0) rule = this.getRule(identifier);
		if (this.#groupBy === rule) return;
		this.#groupBy = rule;
		this.#groupBySortDirection = void 0;
		this.#deps.touch({
			source: EVENT_SOURCE.GROUP_BY,
			event: EVENTS.SET_GROUP_BY,
			current: rule?.id,
			initial: previousRule?.id,
			rule
		});
	}
	setGroupSortDirection(direction) {
		const previousValue = this.#groupBySortDirection;
		this.#groupBySortDirection = direction;
		this.#deps.touch({
			source: EVENT_SOURCE.GROUP_BY,
			event: EVENTS.SET_GROUP_SORT_BY_DIRECTION,
			current: direction,
			initial: previousValue,
			rule: this.activeRule
		});
	}
	toggle(identifier) {
		const rule = this.getRule(identifier);
		if (this.activeRule === rule) {
			this.set(void 0);
			return;
		}
		this.set(rule);
	}
	reset() {
		this.setGroupSortDirection(void 0);
		this.set(void 0);
	}
	serialize() {
		return {
			rule: this.activeRule,
			groupBySortDirection: this.#groupBySortDirection
		};
	}
	static process(options, items, context) {
		const groupObject = (0, lodash.groupBy)(items, (item) => options.rule?.groupFn(item, context));
		const groups = Object.entries(groupObject).map(([id, items$1]) => ({
			id,
			items: items$1
		}));
		const hasStickyGroups = options.rule?.sticky !== void 0;
		const orderByCallbacks = [];
		const orderSortDirection = [];
		if (hasStickyGroups && options.rule) {
			orderByCallbacks.push(composeStickyGroupOrderCallback(options.rule));
			orderSortDirection.push("asc");
		}
		if (options.rule?.sortGroupFn) {
			orderByCallbacks.push(options.rule.sortGroupFn);
			orderSortDirection.push(options.groupBySortDirection ?? "asc");
		}
		if (orderByCallbacks.length > 0) return (0, lodash.orderBy)(groups, orderByCallbacks, orderSortDirection);
		return groups;
	}
};
/**
* Creates a sorting method for groupBy rule with 'sticky' header/footer groups.
*/
function composeStickyGroupOrderCallback(groupByRule$1) {
	let stickyHeaderGroupIds = [];
	if (groupByRule$1.sticky?.header !== void 0) {
		if (Array.isArray(groupByRule$1.sticky.header)) stickyHeaderGroupIds = groupByRule$1.sticky.header;
		if (typeof groupByRule$1.sticky.header === "string") stickyHeaderGroupIds = [groupByRule$1.sticky.header];
	}
	let stickyFooterGroupIds = [];
	if (groupByRule$1.sticky?.footer !== void 0) {
		if (Array.isArray(groupByRule$1.sticky.footer)) stickyFooterGroupIds = groupByRule$1.sticky.footer;
		if (typeof groupByRule$1.sticky.footer === "string") stickyFooterGroupIds = [groupByRule$1.sticky.footer];
	}
	return (group) => {
		if (stickyHeaderGroupIds.includes(group.id)) {
			const index = stickyHeaderGroupIds.findIndex((groupId) => group.id === groupId);
			return (stickyHeaderGroupIds.length - index) * -1;
		}
		if (stickyFooterGroupIds.includes(group.id)) return 1 + stickyFooterGroupIds.findIndex((groupId) => group.id === groupId);
		return 0;
	};
}

//#endregion
//#region src/core/pagination-mixin.ts
var PaginationMixin = class {
	#page;
	#deps;
	constructor({ page, numItemsPerPage }, handlers) {
		this.#page = page ?? 1;
		this.numItemsPerPage = numItemsPerPage;
		this.#deps = handlers;
	}
	setPage(value) {
		if (value !== this.#page) {
			const previousPage = this.#page;
			this.#page = value;
			this.#deps.touch({
				source: EVENT_SOURCE.PAGINATION,
				event: EVENTS.SET_PAGE,
				current: { page: this.#page },
				initial: { page: previousPage }
			});
		}
	}
	setNumItemsPerPage(value) {
		if (value !== this.numItemsPerPage) {
			const previousValue = this.numItemsPerPage;
			this.numItemsPerPage = value;
			this.#deps.touch({
				source: EVENT_SOURCE.PAGINATION,
				event: EVENTS.SET_NUM_ITEMS_PER_PAGE,
				current: { numItemsPerPage: this.numItemsPerPage },
				initial: { numItemsPerPage: previousValue }
			});
		}
	}
	get lastPage() {
		if (this.numItemsPerPage === void 0) return;
		return Math.ceil(this.#deps.getItems().length / this.numItemsPerPage);
	}
	get numTotalItems() {
		return this.#deps.getItems().length;
	}
	get page() {
		if (this.numItemsPerPage && this.lastPage) return (0, lodash.clamp)(this.#page, 1, this.lastPage);
		return this.#page;
	}
	get offset() {
		if (this.numItemsPerPage && this.lastPage) return ((0, lodash.clamp)(this.#page, 1, this.lastPage) - 1) * this.numItemsPerPage;
		return 0;
	}
	serialize() {
		return {
			page: this.#page,
			numItemsPerPage: this.numItemsPerPage
		};
	}
	static process(options, items) {
		if (options.numItemsPerPage === void 0) return items;
		const lastPage = Math.ceil(items.length / options.numItemsPerPage);
		const offset = ((0, lodash.clamp)(options.page, 1, lastPage) - 1) * options.numItemsPerPage;
		return items.slice(offset, offset + options.numItemsPerPage);
	}
};

//#endregion
//#region src/core/search/search-score.ts
function calculateSearchScore(indexes, haystack) {
	const percentOfHaystackMatched = indexes.length / haystack.length;
	let longestSequentialSequence = 1;
	let numSequentialIndexes = 1;
	let lastIndex = 0;
	for (let x = 0; x < indexes.length; x += 1) {
		if (lastIndex !== void 0 && indexes.at(x) === lastIndex + 1) {
			numSequentialIndexes += 1;
			if (numSequentialIndexes >= longestSequentialSequence) longestSequentialSequence = numSequentialIndexes;
		}
		lastIndex = indexes.at(x);
	}
	return {
		percentOfHaystackMatched,
		longestSequentialSequence
	};
}

//#endregion
//#region src/core/search/default-search-and-sort-algorithm.ts
function defaultSearchAndSortAlgorithm(options, items, context) {
	const matches = items.reduce((acc, item) => {
		if (options.rule?.searchFn === void 0) return acc;
		const itemHaystackStringOrStrings = options.rule.searchFn(item, context);
		const itemHaystackScores = (Array.isArray(itemHaystackStringOrStrings) ? itemHaystackStringOrStrings.map(transformStringForComparison) : [transformStringForComparison(itemHaystackStringOrStrings)]).reduce((scores, haystack) => {
			const indexes = calculateCharacterMatchIndexes(haystack, options.searchTerm);
			if (indexes !== void 0) scores.push(calculateSearchScore(indexes, haystack));
			return scores;
		}, []);
		if (itemHaystackScores.length > 0) {
			const bestScore = (0, lodash.orderBy)(itemHaystackScores, ["percentOfHaystackMatched", "longestSequentialSequence"], ["desc", "asc"]).at(0);
			if (bestScore) acc.push({
				item,
				score: bestScore
			});
		}
		return acc;
	}, []);
	const overallLongestSequentialSequence = matches.reduce((length, match) => {
		if (match.score.longestSequentialSequence > length) length = match.score.longestSequentialSequence;
		return length;
	}, 0);
	return (0, lodash.orderBy)(matches, [(match) => {
		return match.score.percentOfHaystackMatched * 100 + match.score.longestSequentialSequence / overallLongestSequentialSequence * 100;
	}], ["desc"]).map((match) => match.item);
}

//#endregion
//#region src/core/search-mixin.ts
var SearchMixin = class {
	#deps;
	constructor({ initialSearchTerm }, deps) {
		this.searchTerm = "";
		if (initialSearchTerm && deps.getRuleBook().rules.find(isSearchRuleDefinition) === void 0) throw new FinderError(ERRORS.NO_SEARCH_RULE_SET);
		this.searchTerm = initialSearchTerm ?? "";
		this.#deps = deps;
	}
	get rule() {
		return this.#deps.getRuleBook().rules.find(isSearchRuleDefinition);
	}
	get hasSearchRule() {
		return this.rule !== void 0;
	}
	get hasSearchTerm() {
		return this.searchTerm !== "";
	}
	setSearchTerm(value) {
		const rule = this.rule;
		if (!rule) throw new FinderError(ERRORS.NO_SEARCH_RULE_SET);
		if (typeof value !== "string") throw new FinderError(ERRORS.INVALID_SEARCH_TERM_TYPE);
		if (this.#deps.isDisabled()) return;
		const previousValue = this.searchTerm;
		this.searchTerm = value;
		if (previousValue === value) return;
		this.#deps.debouncer(rule, () => {
			this.#deps.touch({
				source: EVENT_SOURCE.SEARCH,
				event: EVENTS.SET_SEARCH_TERM,
				current: value,
				initial: previousValue,
				rule
			});
		});
	}
	reset() {
		if (this.#deps.isDisabled()) return;
		const previousValue = this.searchTerm;
		this.searchTerm = "";
		this.#deps.touch({
			source: EVENT_SOURCE.SEARCH,
			event: EVENTS.RESET_SEARCH_TERM,
			current: "",
			initial: previousValue,
			rule: this.rule
		});
	}
	serialize() {
		return {
			searchTerm: this.searchTerm,
			rule: this.rule
		};
	}
	test(searchTerm, isAdditive = false) {
		return this.#deps.test({ search: {
			searchTerm,
			rule: this.rule
		} }, isAdditive);
	}
	static process(options, items, context) {
		if (options.rule === void 0) throw new FinderError(ERRORS.NO_SEARCH_RULE_SET);
		if (options.searchTerm === "") return items;
		return defaultSearchAndSortAlgorithm(options, items, context);
	}
};

//#endregion
//#region src/core/sort-by-mixin.ts
const SORT_CYCLE_ORDER = [
	void 0,
	"desc",
	"asc"
];
var SortByMixin = class {
	#sortBy;
	#sortDirection;
	#deps;
	constructor({ initialSortBy, initialSortDirection }, deps) {
		this.#deps = deps;
		if (initialSortBy) this.#sortBy = this.getRule(initialSortBy);
		this.#sortDirection = initialSortDirection;
	}
	getRule(identifier) {
		const rule = this.#deps.getRuleBook().getRule(identifier);
		if (isSortByRuleDefinition(rule) === false) throw new FinderError(ERRORS.WRONG_RULE_TYPE_FOR_MIXIN, { rule });
		return rule;
	}
	get rules() {
		return this.#deps.getRuleBook().rules.filter(isSortByRuleDefinition);
	}
	get activeRule() {
		const defaultSortByRule = this.rules.at(0);
		return this.#sortBy ?? defaultSortByRule;
	}
	get sortDirection() {
		return this.#sortDirection ?? this.activeRule?.defaultSortDirection ?? "asc";
	}
	get userHasSetSortDirection() {
		return this.#sortDirection !== void 0;
	}
	setSortDirection(incomingSortDirection) {
		if (this.#deps.isDisabled() || !this.activeRule) return;
		const previousValue = this.#sortDirection;
		this.#sortDirection = incomingSortDirection;
		this.#deps.touch({
			source: EVENT_SOURCE.SORT_BY,
			event: EVENTS.SET_SORT_BY_DIRECTION,
			current: { sortDirection: incomingSortDirection },
			initial: { sortDirection: previousValue },
			rule: this.activeRule
		});
	}
	cycleSortDirection() {
		const initialIndex = SORT_CYCLE_ORDER.findIndex((direction) => direction === this.#sortDirection);
		if (initialIndex !== -1) {
			const currentIndex = initialIndex + 1 % (SORT_CYCLE_ORDER.length - 1);
			this.setSortDirection(SORT_CYCLE_ORDER[currentIndex]);
		}
	}
	toggleSortDirection() {
		if ((this.#sortDirection ?? this.activeRule?.defaultSortDirection) === "desc") {
			this.setSortDirection("asc");
			return;
		}
		this.setSortDirection("desc");
	}
	set(identifier, incomingSortDirection) {
		if (this.#deps.isDisabled() || !this.activeRule) return;
		const previousSortDirection = this.#sortDirection;
		const previousRule = this.#sortBy;
		const rule = identifier ? this.getRule(identifier) : void 0;
		this.#sortBy = rule;
		this.#sortDirection = incomingSortDirection;
		this.#deps.touch({
			source: EVENT_SOURCE.SORT_BY,
			event: EVENTS.SET_SORT_BY,
			current: {
				rule: rule?.id,
				sortDirection: incomingSortDirection
			},
			initial: {
				rule: previousRule?.id,
				sortDirection: previousSortDirection
			},
			rule: this.activeRule
		});
	}
	reset() {
		this.set(void 0, void 0);
	}
	serialize() {
		return {
			rule: this.activeRule,
			sortDirection: this.sortDirection
		};
	}
	static process(options, items, context) {
		if (options.rule === void 0) return items;
		return (0, lodash.orderBy)(items, (item) => {
			if (typeof options.rule?.sortFn === "function") return options.rule.sortFn(item, context);
			return Number.NEGATIVE_INFINITY;
		}, options.sortDirection);
	}
};

//#endregion
//#region src/core/tester.ts
var Tester = class Tester {
	constructor() {
		this.snapshot = {};
		this.isStale = true;
	}
	setIsStale(value) {
		this.isStale = value;
	}
	takeSnapshot({ items, context, mixins }) {
		const matchingItems = Tester.test({
			mixins,
			items,
			context
		});
		const paginatedItems = mixins.pagination ? PaginationMixin.process(mixins.pagination, matchingItems) : matchingItems;
		let groups = [];
		const hasGroupByRule = mixins.groupBy !== void 0;
		if (mixins.groupBy) groups = GroupByMixin.process(mixins.groupBy, paginatedItems, context);
		this.snapshot = {
			items: !hasGroupByRule ? paginatedItems : void 0,
			groups: hasGroupByRule ? groups : void 0,
			numMatchedItems: matchingItems.length,
			numTotalItems: items.length,
			hasGroupByRule
		};
	}
	static test({ mixins, items, context }) {
		let matchingItems = [...items];
		if (mixins.search) matchingItems = SearchMixin.process(mixins.search, matchingItems, context);
		if (mixins.filters) matchingItems = FiltersMixin.process(mixins.filters, matchingItems, context);
		if (mixins.sortBy) matchingItems = SortByMixin.process(mixins.sortBy, matchingItems, context);
		return matchingItems;
	}
};

//#endregion
//#region src/core/rule-book/rule-effect-appendix.ts
var RuleEffectAppendix = class {
	#definitions;
	constructor(definitions) {
		this.effects = [];
		this.#definitions = definitions;
	}
	hydrateDefinitions(items, context) {
		this.effects = this.#definitions.map((effect) => {
			const rules = typeof effect.rules === "function" ? effect.rules(items, context) : effect.rules;
			const rulesAsArray = Array.isArray(rules) ? rules : [rules];
			return {
				...effect,
				rules: rulesAsArray,
				_isHydrated: true
			};
		});
	}
	setEffects(definitions) {
		this.#definitions = definitions;
	}
	onChange(rule, instance) {
		this.effects.forEach((effect) => {
			if (effect.rules.some((identifier) => {
				if (typeof identifier === "string" && rule.id === identifier) return true;
				if (typeof identifier === "object" && rule.id === identifier.id) return true;
				return false;
			})) effect.onChange(instance, rule);
		});
	}
};

//#endregion
//#region src/core/rule-book/rule-list-appendix.ts
var RuleListAppendix = class RuleListAppendix {
	constructor(definitions) {
		this.rules = [];
		RuleListAppendix.validateDefinitions(definitions);
		this.definitions = definitions;
	}
	hydrateDefinitions(items, context) {
		this.rules = this.definitions.map((definition) => {
			if (isFilterRuleDefinition(definition)) {
				const options = typeof definition.options === "function" ? definition.options({
					items,
					context
				}) : definition.options;
				return {
					...definition,
					boolean: !!definition.boolean,
					multiple: !!definition.multiple,
					strictOptions: definition.strictOptions ?? true,
					options
				};
			}
			return definition;
		});
	}
	getRule(identifier) {
		const rule = this.rules.find((rule$1) => {
			if (typeof identifier === "object") return rule$1.id === identifier.id;
			return rule$1.id === identifier;
		});
		if (rule === void 0) throw new FinderError(ERRORS.RULE_NOT_FOUND, identifier);
		return rule;
	}
	setRules(definitions) {
		RuleListAppendix.validateDefinitions(definitions);
		this.definitions = definitions;
	}
	static validateDefinitions(definitions) {
		if (definitions.length === 0) return false;
		const validators = [
			isSearchRuleDefinition,
			isFilterRuleDefinition,
			isSortByRuleDefinition,
			isGroupByRuleDefinition
		];
		const filterIds = /* @__PURE__ */ new Set();
		definitions.forEach((rule) => {
			if (rule.id === void 0 && !isSearchRuleDefinition(rule)) throw new FinderError(ERRORS.INVALID_RULE_WITHOUT_ID, rule);
			if (validators.some((validator) => validator(rule)) === false) throw new FinderError(ERRORS.INVALID_RULE_SHAPE, rule);
			if (rule.id) {
				if (filterIds.has(rule.id)) throw new FinderError(ERRORS.INVALID_RULE_DUPLICATE, rule);
				filterIds.add(rule.id);
			}
		});
		return true;
	}
};

//#endregion
//#region src/core/rule-book/search-effect-appendix.ts
var SearchEffectAppendix = class {
	#definitions;
	constructor(definitions) {
		this.effects = [];
		this.#definitions = definitions;
	}
	hydrateDefinitions(items, context) {
		this.effects = this.#definitions.map((effect) => {
			const haystack = typeof effect.haystack === "function" ? effect.haystack(items, context) : effect.haystack;
			const haystackAsArray = Array.isArray(haystack) ? haystack : [haystack];
			return {
				...effect,
				haystack: haystackAsArray
			};
		});
	}
	setEffects(definitions) {
		this.#definitions = definitions;
	}
	processSearchTerm(searchTerm, instance) {
		this.effects.forEach((effect) => {
			if (hasCharacterIndexMatches(effect.haystack, searchTerm)) effect.onChange(instance, searchTerm);
		});
	}
};

//#endregion
//#region src/core/rule-book/rule-book.ts
/**
* Stores rule definitions and hydrated rules class objects
*/
var RuleBook = class {
	constructor({ rules, ruleEffects, searchEffects }) {
		this.list = new RuleListAppendix(rules);
		this.ruleEffects = new RuleEffectAppendix(ruleEffects);
		this.searchEffects = new SearchEffectAppendix(searchEffects);
	}
	hydrateDefinitions(items, context) {
		this.list.hydrateDefinitions(items, context);
		this.searchEffects.hydrateDefinitions(items, context);
		this.ruleEffects.hydrateDefinitions(items, context);
	}
	onChange(rule, instanceInterface) {
		if (isSearchRuleDefinition(rule) && instanceInterface.search.hasSearchTerm) this.searchEffects.processSearchTerm(instanceInterface.search.searchTerm, instanceInterface);
		this.ruleEffects.onChange(rule, instanceInterface);
	}
};

//#endregion
//#region src/core/finder-implementation.ts
var FinderImplementation = class {
	#items;
	#hasEmittedFirstUserInteraction = false;
	#ignoreSortByRulesWhileSearchRuleIsActive;
	#eventEmitter = new EventEmitter();
	#matches = new Tester();
	#ruleBook;
	constructor(items, { rules, effects, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialGroupBySortDirection, initialFilters, context, page, numItemsPerPage, isLoading, disabled, requireGroup, ignoreSortByRulesWhileSearchRuleIsActive, onInit, onReady, onFirstUserInteraction, onChange }, getInstanceInterfaceFn) {
		this.isReady = false;
		this.#items = items;
		this.disabled = !!disabled;
		this.isLoading = !!isLoading;
		this.isReady = !!isLoading === false && Array.isArray(items) && items.length > 0;
		this.getInstanceInterfaceFn = getInstanceInterfaceFn;
		this.updatedAt = Date.now();
		this.context = context;
		this.#ignoreSortByRulesWhileSearchRuleIsActive = ignoreSortByRulesWhileSearchRuleIsActive;
		this.#ruleBook = new RuleBook({
			rules,
			ruleEffects: effects?.filter(isRuleEffectDefinition) ?? [],
			searchEffects: effects?.filter(isSearchEffectDefinition) ?? []
		});
		this.#ruleBook.hydrateDefinitions(items ?? [], context);
		const mixinDeps = {
			getItems: () => this.items,
			getRuleBook: () => this.#ruleBook.list,
			isLoading: () => this.isLoading,
			isDisabled: () => this.disabled,
			test: (serializedMixins, isAdditive) => this.test(serializedMixins, isAdditive),
			touch: (event) => this.#touch(event),
			debouncer: DebounceCallbackRegistry()
		};
		this.search = new SearchMixin({ initialSearchTerm }, mixinDeps);
		this.filters = new FiltersMixin({ initialFilters }, mixinDeps);
		this.sortBy = new SortByMixin({
			initialSortBy,
			initialSortDirection
		}, mixinDeps);
		this.groupBy = new GroupByMixin({
			initialGroupBy,
			initialGroupBySortDirection,
			requireGroup: !!requireGroup
		}, mixinDeps);
		this.pagination = new PaginationMixin({
			page,
			numItemsPerPage
		}, mixinDeps);
		this.#eventEmitter.silently(() => {
			const initPayload = {
				source: EVENT_SOURCE.CORE,
				event: EVENTS.INIT,
				timestamp: Date.now(),
				instance: this.getInstanceInterfaceFn()
			};
			if (onInit) onInit(initPayload);
		});
		if (onChange) this.#eventEmitter.on(EVENTS.CHANGE, onChange);
		if (onFirstUserInteraction) this.#eventEmitter.on(EVENTS.FIRST_USER_INTERACTION, onFirstUserInteraction);
		if (onReady) {
			if (this.isReady) onReady({
				source: EVENT_SOURCE.CORE,
				event: EVENTS.READY,
				timestamp: Date.now(),
				instance: this.getInstanceInterfaceFn()
			});
		}
		if (this.isReady === false && onReady) this.#eventEmitter.on(EVENTS.READY, onReady);
	}
	/**
	* Events that reflect a user interaction.
	* e.g: entering a search term or selecting a filter.
	*/
	#touch(touchEvent) {
		if (this.#eventEmitter.isSilent()) return;
		this.emitFirstUserInteraction();
		this.#syncUpdatedAtTimestamp();
		this.#matches.setIsStale(true);
		const payload = {
			...touchEvent,
			timestamp: Date.now(),
			instance: this.getInstanceInterfaceFn()
		};
		this.#eventEmitter.emit(EVENTS.CHANGE, payload);
		this.#eventEmitter.silently(() => {
			if (touchEvent.rule) this.#ruleBook.onChange(touchEvent.rule, this.getInstanceInterfaceFn());
		});
	}
	/** Internal events not triggered by a user action  */
	#systemTouch(touchEvent) {
		this.#matches.setIsStale(true);
		this.#syncUpdatedAtTimestamp();
		const changeEvent = {
			...touchEvent,
			timestamp: Date.now(),
			instance: this.getInstanceInterfaceFn()
		};
		this.#eventEmitter.emit(touchEvent.event, changeEvent);
	}
	#syncUpdatedAtTimestamp() {
		this.updatedAt = Date.now();
		this.#eventEmitter.emit(EVENTS.SYNC_UPDATED_AT, this.updatedAt);
	}
	emitFirstUserInteraction() {
		if (this.#hasEmittedFirstUserInteraction === false) {
			this.#hasEmittedFirstUserInteraction = true;
			const payload = {
				source: EVENT_SOURCE.CORE,
				event: EVENTS.FIRST_USER_INTERACTION,
				timestamp: Date.now(),
				instance: this.getInstanceInterfaceFn()
			};
			this.#eventEmitter.emit(EVENTS.FIRST_USER_INTERACTION, payload);
		}
	}
	#emitReady() {
		if (this.isReady === false) {
			this.isReady = true;
			this.#eventEmitter.emit(EVENTS.READY, {
				source: EVENT_SOURCE.CORE,
				event: EVENTS.READY,
				timestamp: Date.now()
			});
		}
	}
	get items() {
		return Array.isArray(this.#items) ? this.#items : [];
	}
	get matches() {
		if (this.#matches.isStale) {
			this.#matches.takeSnapshot({
				items: this.items,
				context: this.context,
				mixins: this.#serializeMixins()
			});
			this.#matches.setIsStale(false);
		}
		return this.#matches.snapshot;
	}
	test(mixins, isAdditive = false) {
		if (isAdditive) {
			const serializedMixins = {
				...this.#serializeMixins(),
				...mixins
			};
			return Tester.test({
				mixins: serializedMixins,
				items: this.items,
				context: this.context
			});
		}
		return Tester.test({
			mixins,
			items: this.items,
			context: this.context
		});
	}
	#serializeMixins() {
		const hasActiveSearch = this.search.hasSearchRule && this.search.hasSearchTerm;
		const ignoreSortByRule = hasActiveSearch && this.#ignoreSortByRulesWhileSearchRuleIsActive;
		const serializedMixins = {};
		if (hasActiveSearch) serializedMixins.search = this.search.serialize();
		if (this.filters.activeRules.length > 0) serializedMixins.filters = this.filters.serialize();
		if (this.pagination.numItemsPerPage) serializedMixins.pagination = this.pagination.serialize();
		if (ignoreSortByRule === false) serializedMixins.sortBy = this.sortBy.serialize();
		if (this.groupBy.activeRule !== void 0) serializedMixins.groupBy = this.groupBy.serialize();
		return serializedMixins;
	}
	get isEmpty() {
		return this.isLoading === false && this.items.length === 0;
	}
	get hasMatches() {
		const hasItemMatches = Array.isArray(this.matches.items) && this.matches.items.length > 0;
		const hasGroupMatches = Array.isArray(this.matches.groups) && this.matches.groups.length > 0;
		return hasItemMatches || hasGroupMatches;
	}
	get events() {
		return {
			on: (event, callback) => this.#eventEmitter.on(event, callback),
			off: (event, callback) => this.#eventEmitter.off(event, callback),
			silently: (callback) => this.#eventEmitter.silently(callback),
			isSilent: () => this.#eventEmitter.isSilent()
		};
	}
	getRule(identifier) {
		return this.#ruleBook.list.getRule(identifier);
	}
	get state() {
		if (this.isLoading) return "loading";
		if (this.isEmpty) return "empty";
		const hasGroupByRule = this.groupBy.activeRule !== void 0;
		if (hasGroupByRule && Array.isArray(this.matches.groups) && this.matches.groups.length > 0) return "groups";
		if (hasGroupByRule === false && Array.isArray(this.matches.items) && this.matches.items.length > 0) return "items";
		return "noMatches";
	}
	setItems(items) {
		if ((0, lodash.isEqual)(items, this.#items) === false) {
			const previousValue = this.#items;
			this.#items = items;
			this.#ruleBook.hydrateDefinitions(this.items, this.context);
			this.#systemTouch({
				source: EVENT_SOURCE.CORE,
				event: EVENTS.SET_ITEMS,
				current: items,
				initial: previousValue
			});
		}
	}
	setIsLoading(value) {
		if (!!value !== this.isLoading) {
			const previousValue = this.isLoading;
			this.isLoading = !!value;
			this.#systemTouch({
				source: EVENT_SOURCE.CORE,
				event: EVENTS.SET_IS_LOADING,
				current: !!value,
				initial: previousValue
			});
			if (this.isLoading === false) this.#emitReady();
		}
	}
	setIsDisabled(value) {
		if (!!value !== this.disabled) {
			const previousValue = this.disabled;
			this.disabled = !!value;
			this.#systemTouch({
				source: EVENT_SOURCE.CORE,
				event: EVENTS.SET_IS_DISABLED,
				current: !!value,
				initial: previousValue
			});
		}
	}
	setRules(definitions) {
		if ((0, lodash.isEqual)(definitions, this.#ruleBook.list.definitions) === false) {
			this.#ruleBook.list.setRules(definitions);
			this.#ruleBook.list.hydrateDefinitions(this.items, this.context);
		}
	}
	setContext(context) {
		const previousValue = this.context;
		if ((0, lodash.isEqual)(context, previousValue) === false) {
			this.context = context;
			this.#ruleBook.hydrateDefinitions(this.items, this.context);
			this.#systemTouch({
				source: EVENT_SOURCE.CORE,
				event: EVENTS.SET_CONTEXT,
				current: context,
				initial: previousValue
			});
		}
	}
	toJSON() {
		return {
			disabled: this.disabled,
			initialSearchTerm: this.search.searchTerm,
			initialFilters: this.filters.raw,
			page: this.pagination.page,
			numItemsPerPage: this.pagination.numItemsPerPage,
			initialSortBy: this.sortBy.activeRule?.id,
			initialSortDirection: this.sortBy.sortDirection,
			ignoreSortByRulesWhileSearchRuleIsActive: this.#ignoreSortByRulesWhileSearchRuleIsActive,
			initialGroupBy: this.groupBy.activeRule?.id,
			initialGroupBySortDirection: this.groupBy.groupBySortDirection,
			requireGroup: this.groupBy.requireGroup
		};
	}
};

//#endregion
//#region src/core/finder-core.ts
/**
* This thin wrapper around FinderCoreImplementation defines the mixin interfaces and hides private methods.
*/
var FinderCore = class {
	#finder;
	constructor(items, options) {
		const getInstance = () => this;
		this.#finder = new FinderImplementation(items, options, getInstance);
	}
	get items() {
		return this.#finder.items;
	}
	get context() {
		return this.#finder.context;
	}
	get isReady() {
		return this.#finder.isReady;
	}
	get isEmpty() {
		return this.#finder.isEmpty;
	}
	get hasMatches() {
		return this.#finder.hasMatches;
	}
	get isLoading() {
		return this.#finder.isLoading;
	}
	get disabled() {
		return this.#finder.disabled;
	}
	get state() {
		return this.#finder.state;
	}
	get updatedAt() {
		return this.#finder.updatedAt;
	}
	get events() {
		return this.#finder.events;
	}
	/**
	* Mixin interfaces
	*/
	get matches() {
		return this.#finder.matches;
	}
	get search() {
		const mixin = this.#finder.search;
		return {
			rule: mixin.rule,
			searchTerm: mixin.searchTerm,
			hasSearchTerm: mixin.hasSearchTerm,
			hasSearchRule: mixin.hasSearchRule,
			setSearchTerm: mixin.setSearchTerm.bind(mixin),
			reset: mixin.reset.bind(mixin),
			test: mixin.test.bind(mixin)
		};
	}
	get filters() {
		const mixin = this.#finder.filters;
		return {
			values: mixin.values,
			raw: mixin.raw,
			activeRules: mixin.activeRules,
			rules: mixin.rules,
			isActive: mixin.isRuleActive.bind(mixin),
			get: mixin.get.bind(mixin),
			add: mixin.add.bind(mixin),
			has: mixin.has.bind(mixin),
			getRule: mixin.getRule.bind(mixin),
			toggle: mixin.toggle.bind(mixin),
			set: mixin.set.bind(mixin),
			delete: mixin.delete.bind(mixin),
			reset: mixin.reset.bind(mixin),
			test: mixin.test.bind(mixin),
			testRule: mixin.testRule.bind(mixin),
			testRuleOptions: mixin.testRuleOptions.bind(mixin)
		};
	}
	get sortBy() {
		const mixin = this.#finder.sortBy;
		return {
			activeRule: mixin.activeRule,
			sortDirection: mixin.sortDirection,
			userHasSetSortDirection: mixin.userHasSetSortDirection,
			rules: mixin.rules,
			set: mixin.set.bind(mixin),
			setSortDirection: mixin.setSortDirection.bind(mixin),
			cycleSortDirection: mixin.cycleSortDirection.bind(mixin),
			toggleSortDirection: mixin.toggleSortDirection.bind(mixin),
			reset: mixin.reset.bind(mixin)
		};
	}
	get groupBy() {
		const mixin = this.#finder.groupBy;
		return {
			activeRule: mixin.activeRule,
			requireGroup: mixin.requireGroup,
			rules: mixin.rules,
			groupBySortDirection: mixin.groupBySortDirection,
			set: mixin.set.bind(mixin),
			toggle: mixin.toggle.bind(mixin),
			setGroupSortDirection: mixin.setGroupSortDirection.bind(mixin),
			reset: mixin.reset.bind(mixin)
		};
	}
	get pagination() {
		const mixin = this.#finder.pagination;
		return {
			page: mixin.page,
			offset: mixin.offset,
			numItemsPerPage: mixin.numItemsPerPage,
			numTotalItems: mixin.numTotalItems,
			lastPage: mixin.lastPage,
			isPaginated: mixin.numItemsPerPage !== void 0,
			setPage: mixin.setPage.bind(mixin),
			setNumItemsPerPage: mixin.setNumItemsPerPage.bind(mixin)
		};
	}
	/**
	* Mutators
	*/
	setItems(items) {
		return this.#finder.setItems(items);
	}
	setIsLoading(value) {
		return this.#finder.setIsLoading(value);
	}
	setIsDisabled(value) {
		return this.#finder.setIsDisabled(value);
	}
	setRules(definitions) {
		return this.#finder.setRules(definitions);
	}
	setContext(context) {
		return this.#finder.setContext(context);
	}
	/**
	* Utils
	*/
	test(mixins, isAdditive = false) {
		return this.#finder.test(mixins, isAdditive);
	}
	getRule(identifier) {
		return this.#finder.getRule(identifier);
	}
	toJSON() {
		return this.#finder.toJSON();
	}
};

//#endregion
//#region src/react/components/finder.tsx
function Finder({ items, rules, effects, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialGroupBySortDirection, initialFilters, context, isLoading, disabled, page, numItemsPerPage, requireGroup, ignoreSortByRulesWhileSearchRuleIsActive, onInit, onReady, onFirstUserInteraction, onChange, controllerRef, children }) {
	const [lastUpdatedAt, setLastUpdatedAt] = (0, react.useState)(Date.now());
	const [instance] = (0, react.useState)(() => {
		const finder = new FinderCore(items, {
			rules,
			effects,
			initialSearchTerm,
			initialSortBy,
			initialSortDirection,
			initialGroupBy,
			initialGroupBySortDirection,
			initialFilters,
			context,
			isLoading,
			disabled,
			page,
			numItemsPerPage,
			requireGroup,
			ignoreSortByRulesWhileSearchRuleIsActive,
			onInit,
			onReady,
			onFirstUserInteraction,
			onChange
		});
		finder.events.on(EVENTS.SYNC_UPDATED_AT, (timestamp) => setLastUpdatedAt(timestamp));
		return finder;
	});
	instance.setItems(items);
	instance.setIsLoading(isLoading);
	instance.setIsDisabled(disabled);
	instance.setRules(rules);
	if (context !== void 0) instance.setContext(context);
	if (page !== void 0) instance.pagination.setPage(page);
	if (numItemsPerPage !== void 0) instance.pagination.setNumItemsPerPage(numItemsPerPage);
	(0, react.useImperativeHandle)(controllerRef, () => instance, [instance]);
	const value = (0, react.useMemo)(() => {
		return [instance, lastUpdatedAt];
	}, [instance, lastUpdatedAt]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FinderCoreContext.Provider, {
		value,
		children
	});
}
Finder.Content = FinderContent;
Finder.SearchTermHaystack = FinderSearchTermHaystack;

//#endregion
//#region src/react/hooks/use-finder-ref.ts
function useFinderRef() {
	return (0, react.useRef)(null);
}

//#endregion
exports.Finder = Finder;
exports.StringMatch = StringMatch;
exports.filterRule = filterRule;
exports.finderRuleset = finderRuleset;
exports.groupByRule = groupByRule;
exports.ruleEffect = ruleEffect;
exports.searchEffect = searchEffect;
exports.searchRule = searchRule;
exports.sortByRule = sortByRule;
exports.transformFilterToBoolean = transformFilterToBoolean;
exports.transformFilterToMultiple = transformFilterToMultiple;
exports.transformFilterToSingleValue = transformFilterToSingleValue;
exports.useFinder = useFinder;
exports.useFinderRef = useFinderRef;