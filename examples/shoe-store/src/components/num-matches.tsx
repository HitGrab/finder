import { useFinder } from "@hitgrab/finder";

export function NumMatches() {
    const finder = useFinder();
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
