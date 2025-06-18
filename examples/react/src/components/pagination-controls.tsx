import { useFinderContext } from "@hitgrab/finder";

export function PaginationControls() {
    const finder = useFinderContext();
    return (
        <div>
            Items per page:
            <select
                value={finder.pagination.numItemsPerPage ?? ""}
                onChange={(e) => {
                    return finder.pagination.setNumItemsPerPage(e.target.value !== "" ? Number(e.target.value) : undefined);
                }}
            >
                <option value="">No pagination</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    );
}
