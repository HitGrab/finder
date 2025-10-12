/* eslint-disable react/no-unstable-nested-components */
import { faker } from "@faker-js/faker";
import { Finder, FinderContentItemProps } from "@hitgrab/finder";
import { random } from "lodash";
import styles from "./styles.module.css";
import { useCallback, useMemo, useState } from "react";
interface Issue {
    id: string;
    subject: string;
    user_name: string;
    severity: number;
}
const rules = [];

function createIssue(): Issue {
    return {
        id: faker.string.uuid(),
        subject: ["Can't", faker.hacker.verb(), faker.hacker.abbreviation(), faker.hacker.noun()].join(" "),
        user_name: faker.person.lastName(),
        severity: random(0, 4),
    };
}

const items = faker.helpers.multiple(createIssue, { count: 5 });

interface FinderContext {
    isSelected: (id: string) => boolean;
    toggle: (id: string) => void;
}
export function IssueTracker() {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [deletedItemIds, setDeletedItemIds] = useState<string[]>([]);
    const context: FinderContext = useMemo(() => {
        return {
            isSelected(id: string) {
                return selectedItemIds.includes(id);
            },
            toggle(id: string) {
                if (selectedItemIds.includes(id)) {
                    setSelectedItemIds(selectedItemIds.filter((i) => i !== id));
                    return;
                }
                setSelectedItemIds([...selectedItemIds, id]);
            },
        };
    }, [selectedItemIds]);

    const handleSubmit = useCallback(() => {
        setDeletedItemIds([...deletedItemIds, ...selectedItemIds]);
        setSelectedItemIds([]);
    }, [deletedItemIds, selectedItemIds]);

    const filteredItems = items.filter((item) => {
        return deletedItemIds.includes(item.id) === false;
    });
    return (
        <form method="dialog" className={styles.container} onSubmit={handleSubmit}>
            <b>Welcome to CypressPine systems, Max.</b>
            <Finder items={filteredItems} rules={rules} context={context}>
                <div className={styles.list}>
                    <Finder.Content>
                        {{
                            items: IssueTrackerItems,
                            empty: () => (
                                <>
                                    No issues found.{" "}
                                    <button type="button" onClick={() => setDeletedItemIds([])}>
                                        [ Reset ]
                                    </button>
                                </>
                            ),
                        }}
                    </Finder.Content>
                </div>
            </Finder>
            <div className={styles.controls}>
                <button type="submit" disabled={selectedItemIds.length === 0}>
                    Ignore
                </button>
                <button type="submit" disabled={selectedItemIds.length === 0}>
                    Discard
                </button>
                <button type="submit" disabled={selectedItemIds.length === 0}>
                    {`>`}/dev/null
                </button>
                <button type="submit" disabled={selectedItemIds.length === 0}>
                    DM 'lol' & Discard
                </button>
                {selectedItemIds.length}/{items.length - deletedItemIds.length} issue(s) selected
            </div>
        </form>
    );
}

function IssueTrackerItems({ items, context }: FinderContentItemProps<Issue, FinderContext>) {
    return items.map((item) => {
        const isSelected = context.isSelected(item.id);
        return (
            <button type="button" data-is-selected={isSelected} onClick={() => context.toggle(item.id)} key={item.id}>
                <input type="checkbox" checked={isSelected} readOnly={true} />
                Severity {item.severity}: {item.subject} - {item.user_name}
            </button>
        );
    });
}
