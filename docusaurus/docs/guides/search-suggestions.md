import { SearchImagesFileBrowser } from '/src/components/search-images-file-browser/search-images-file-browser';

# Search that suggests relevant filters

SearchRules can accept an array of filters to suggest options from. In this example, the SearchRule will search for string matches against the options defined for the `file_extension` and `modified_date` filters.

```
const rules = finderRuleset<FauxFile>([
    {
        searchFn: (file) => file.name,
        suggestFiltersFrom: ["file_extension", "modified_date"],
    },
    {
        id: "file_extension",
        label: "File Type",
        ...
    },
    filterRule({
        id: "modified_date",
        label: "Modified",
        ...
    }),
]);
```

The results will be available inside the SearchAPI, under `finder.search.suggestedFilters`.

<SearchImagesFileBrowser />
