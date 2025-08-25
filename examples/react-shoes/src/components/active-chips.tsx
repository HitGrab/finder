import { useFinder } from "@hitgrab/finder";
import { composeColorFromString } from "../utils/color-from-string";
import { PropsWithChildren } from "react";

function ActiveChips() {
    const finder = useFinder();
    return (
        <div className="chipList">
            {finder.filters.activeRules.map((rule) => {
                const ruleValue = finder.filters.get(rule);

                if (rule.id === "price_between") {
                    const hasPresetValue = rule.options?.some((option) => finder.filters.has(rule, option));
                    if (hasPresetValue) {
                        return rule.options?.map((option) => {
                            if (finder.filters.has(rule, option) === false) {
                                return null;
                            }
                            return (
                                <Chip ruleId={rule.id} onReset={() => finder.filters.toggleOption(rule, option)} key={[rule.id, option.value].join()}>
                                    {option.label}
                                </Chip>
                            );
                        });
                    } else {
                        return ruleValue.map((value: number[]) => {
                            const [min, max] = value;

                            let label = "";
                            if (min > 0 && max) {
                                label = `$${min}+`;
                            }
                            if (min < 0) {
                                label = `Below $${max}`;
                            }
                            if (min > 0 && max !== Number.POSITIVE_INFINITY) {
                                label = `$${min}-${max}`;
                            }
                            return (
                                <div className="chip" style={{ background: composeColorFromString(rule.id) }} key={[rule.id, "custom"].join()}>
                                    <span>{label}</span>
                                    <button type="button" onClick={() => finder.filters.delete(rule)}>
                                        x
                                    </button>
                                </div>
                            );
                        });
                    }
                }

                if (rule.id === "size" && Array.isArray(ruleValue)) {
                    return ruleValue.map((value) => (
                        <div className="chip" style={{ background: composeColorFromString(rule.id) }} key={[rule.id, value].join()}>
                            <span>Size {String(value)}</span>
                            <button type="button" onClick={() => finder.filters.toggleOption(rule, value)}>
                                x
                            </button>
                        </div>
                    ));
                }

                if (Array.isArray(ruleValue)) {
                    return ruleValue.map((value) => (
                        <div className="chip" style={{ background: composeColorFromString(rule.id) }} key={[rule.id, value].join()}>
                            <span>{String(value)}</span>
                            <button type="button" onClick={() => finder.filters.toggleOption(rule, value)}>
                                x
                            </button>
                        </div>
                    ));
                }

                if (rule.isBoolean) {
                    return (
                        <div className="chip" style={{ background: composeColorFromString(rule.id) }} key={rule.id}>
                            <span>{rule.label}</span>
                            <button type="button" onClick={() => finder.filters.delete(rule)}>
                                x
                            </button>
                        </div>
                    );
                }

                if (rule.isBoolean === false && rule.multiple === false) {
                    return (
                        <div className="chip" style={{ background: composeColorFromString(rule.id) }} key={rule.id}>
                            <span>{String(ruleValue)}</span>
                            <button type="button" onClick={() => finder.filters.delete(rule)}>
                                x
                            </button>
                        </div>
                    );
                }

                return (
                    <div className="chip" style={{ background: composeColorFromString(rule.id) }} key={rule.id}>
                        <span>{String(ruleValue)}</span>
                        <button type="button" onClick={() => finder.filters.toggle(rule)}>
                            x
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

interface ChipProps extends PropsWithChildren {
    ruleId: string;
    onReset: () => void;
}
function Chip({ ruleId, onReset, children }: ChipProps) {
    return (
        <div className="chip" style={{ background: composeColorFromString(ruleId) }}>
            <span>{children}</span>
            <button type="button" onClick={onReset}>
                x
            </button>
        </div>
    );
}

export { ActiveChips };
