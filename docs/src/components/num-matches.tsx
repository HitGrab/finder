import { useFinderContext } from "@hitgrab/finder";

export function NumMatches() {
    const finder = useFinderContext();
    return (
        <div className="numMatches">
            {finder.isLoading ? (
                "Showing -/-"
            ) : (
                <>
                    Showing {finder.matches.numMatchedItems}/{finder.matches.numTotalItems}
                </>
            )}
        </div>
    );
}
