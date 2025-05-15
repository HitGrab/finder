import {
    Box,
    Heading,
    SimpleGrid,
    HStack,
    Icon,
    Text,
    Input,
    VStack,
    InputGroup,
    Select,
    createListCollection,
    Portal,
    RatingGroup,
    CloseButton,
} from "@chakra-ui/react";
import { Finder, FinderContent, FinderNoMatches, finderStringCompare, makeFilterRule, makeRules, makeSearchRule, makeSortByRule, useFinderRef } from "finder";
import { random, range } from "lodash";
import { ElementType, useState } from "react";
import { HiStar } from "react-icons/hi";
import * as LUIcons from "react-icons/lu";
type Product = {
    icon: ElementType;
    label: string;
    sku: string;
    rating: number;
    price: string;
};
const names = ["Apple", "Orange", "Banana", "Guava", "Dragonfruit", "Cherry", "Blueberry", "Pear", "Grape"];
const randomProducts = range(0, 9).map((index) => {
    const sku = `SKU-${random(2, 10) * 100}-${random(200, 400)}`;
    const randomIcon = Object.keys(LUIcons)[random(0, Object.keys(LUIcons).length - 1)];
    return {
        icon: LUIcons[randomIcon as keyof typeof LUIcons],
        label: names[index],
        sku,
        rating: random(1, 5),
        price: new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(random(10, 100)),
    };
});

function App() {
    const rules = makeRules<Product>([
        makeSearchRule({
            searchFn: (item, searchTerm) => finderStringCompare(item.label, searchTerm),
        }),
        makeFilterRule({
            id: "sku",
            filterFn: (item, value: string) => item.sku === value,
        }),
        makeFilterRule({
            id: "min_rating",
            filterFn: (item, value: number) => item.rating <= value,
        }),
        makeSortByRule({
            id: "rating",
            label: "By Rating",
            sortFn: (item) => item.rating,
            defaultDirection: "desc",
        }),
        makeSortByRule({
            id: "alphabetical",
            label: "Alphabetical",
            sortFn: (item) => item.label,
            defaultDirection: "desc",
        }),
    ]);

    const ref = useFinderRef();
    const [minRating, setMinRating] = useState<number | undefined>(5);

    const skuOptions = randomProducts.map(({ sku }) => {
        return {
            label: sku,
            value: sku,
        };
    });

    const [query, setQuery] = useState<string>("");
    const endElement = query ? (
        <CloseButton
            size="xs"
            onClick={() => {
                setQuery("");
                ref.current?.search.reset();
            }}
            me="-2"
        />
    ) : undefined;

    return (
        <Box p="50px">
            <label>
                {ref.current?.sortBy.rules.map((rule) => {
                    return (
                        <label key={rule.id}>
                            <input type="radio" name="sortBy" value={rule.id} onChange={() => ref.current?.sortBy.set(rule)} /> {rule.label}
                        </label>
                    );
                })}
            </label>
            <VStack p="20px">
                <Heading>Product selector</Heading>
                <Finder items={randomProducts} rules={rules} controllerRef={ref}>
                    <HStack>
                        <InputGroup startElement={<LUIcons.LuSearch />} endElement={endElement} width="200px">
                            <Input
                                placeholder="Search"
                                value={query}
                                onInput={(e) => {
                                    setQuery(e.currentTarget.value);
                                    ref.current?.search.setSearchTerm(e.currentTarget.value);
                                }}
                            />
                        </InputGroup>
                        <HStack>
                            Min rating:
                            <RatingGroup.Root
                                onValueChange={({ value }) => {
                                    setMinRating(value);
                                    ref.current?.filters.set("min_rating", value);
                                }}
                            >
                                <RatingGroup.Label />
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control>
                                    {range(1, 6).map((index) => {
                                        return (
                                            <RatingGroup.Item index={index} key={index}>
                                                <RatingGroup.ItemIndicator />
                                            </RatingGroup.Item>
                                        );
                                    })}
                                </RatingGroup.Control>
                            </RatingGroup.Root>
                        </HStack>
                        <Select.Root
                            collection={createListCollection({ items: skuOptions })}
                            onValueChange={({ value }) => {
                                ref.current?.filters.set("sku", value.at(0));
                            }}
                            w="200px"
                        >
                            <Select.HiddenSelect />
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="SKU" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                    <Select.ClearTrigger />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {skuOptions.map((item) => (
                                            <Select.Item item={item} key={item.value}>
                                                {item.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </HStack>
                    <Box w={800}>
                        <FinderContent>
                            {{
                                items: ({ items }) => {
                                    return (
                                        <SimpleGrid columns={3} width="100%" gap="20px" alignContent="left">
                                            {items.map((item) => (
                                                <Box key={item.sku}>
                                                    <SamplePhoto photo={item} />
                                                </Box>
                                            ))}
                                        </SimpleGrid>
                                    );
                                },
                                empty: "No items found.",
                                noMatches: "No matches found.",
                            }}
                        </FinderContent>
                    </Box>
                </Finder>
            </VStack>
        </Box>
    );
}

function SamplePhoto({ photo }: { photo: Product }) {
    const { icon: PhotoIcon } = photo;

    return (
        <Box maxW="sm" borderWidth="1px">
            <Box p="4" spaceY="2">
                <PhotoIcon style={{ width: "50px", height: "50px" }} />
                <HStack>
                    <HStack gap="1" fontWeight="medium">
                        {range(0, photo.rating).map((value) => {
                            return (
                                <Icon color="orange.400" key={value}>
                                    <HiStar />
                                </Icon>
                            );
                        })}

                        <Text>rating</Text>
                    </HStack>
                </HStack>
                <Text fontWeight="medium" color="fg">
                    {photo.label}
                </Text>
                <HStack color="fg.muted">{photo.sku}</HStack>
            </Box>
        </Box>
    );
}

export { App };
