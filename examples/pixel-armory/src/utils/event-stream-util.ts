import { FinderEvent } from "@hitgrab/finder";

export function appendEventString(event: FinderEvent) {
    const container = document.getElementById("eventStream");
    if (!container) {
        return;
    }

    // Strictmode will render the init event twice, so we clear the first instance.
    if (event.event === "init") {
        container.innerHTML = "";
    }

    const date = new Date(event.timestamp).toLocaleString("en-GB", { timeZone: "UTC" });

    container.innerHTML += `
    <div class="event">
        <button type="button" onClick="this.parentNode.classList.toggle('expanded')">
            ${date} - ${event.event} 
        </button>
        <div class="eventProps">
            ${Object.entries(event).reduce((acc, [key, value]) => {
                let transformedValue = "";
                if (typeof value === "string" || typeof value === "number") {
                    transformedValue = String(value);
                }
                if (typeof value === "boolean") {
                    transformedValue = value ? "true" : "false";
                }
                if (transformedValue === "") {
                    transformedValue = JSON.stringify(value);
                }
                acc += `
                    <span>${key}:</span>
                    <span>${transformedValue}</span>
                `;
                return acc;
            }, "")}
        </div>
    </div>`;

    // scroll to bottom
    container.scrollTop = container.scrollHeight;
}
