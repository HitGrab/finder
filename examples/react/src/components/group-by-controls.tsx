import { SortDirection, useFinderContext } from "@hitgrab/finder";

export function GroupByControls() {
    const finder = useFinderContext();
    return (
        <>
            <select
                value={finder.groupBy.activeRule?.id}
                onChange={(e) => {
                    finder.groupBy.set(e.currentTarget.value);
                }}
            >
                {finder.groupBy.requireGroup === false && <option value="">-- None --</option>}
                {finder.groupBy.rules.map((rule) => {
                    return (
                        <option value={rule.id} key={rule.id}>
                            {rule.label ?? rule.id}
                        </option>
                    );
                })}
            </select>
            <>
                <select
                    value={String(finder.groupBy.groupIdSortDirection)}
                    onChange={(e) => {
                        finder.groupBy.setGroupIdSortDirection(e.currentTarget.value as SortDirection);
                    }}
                >
                    <option value="" key="default">
                        Default
                    </option>
                    <option value="desc" key="desc">
                        Desc
                    </option>
                    <option value="asc" key="asc">
                        Asc
                    </option>
                </select>
            </>
            {finder.groupBy.activeRule && <button onClick={() => finder.groupBy.reset()}>Clear</button>}
        </>
    );
}
