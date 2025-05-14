import { Box, Heading, SimpleGrid, HStack, Icon, Text, Input, VStack, InputGroup } from "@chakra-ui/react";
import { Finder, FinderContent } from "finder";
import { random, range } from "lodash";
import { ElementType, useRef, useState } from "react";
import { HiStar } from "react-icons/hi";
import { LuGalleryThumbnails, LuSearch } from "react-icons/lu";

type Photo = {
    icon: ElementType;
    label: string;
    width: number;
    height: number;
    rating: number;
    price: string;
};
const names = ["Apple", "Orange", "Banana", "Guava", "Dragonfruit", "Cherry", "Blueberry", "Pear", "Grape"];
function generatePhotos() {
    return range(0, 9).map((index) => {
        const width = random(200, 400);
        const height = random(200, 400);
        return {
            icon: LuGalleryThumbnails,
            label: names[index],
            width,
            height,
            rating: random(1, 5),
            price: new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(random(10, 100)),
        };
    });
}

function App() {
    const rule = { searchFn: (item: Photo, searchTerm: string) => item.label.includes(searchTerm) };
    const [query, setQuery] = useState("");
    const [randomPhotos] = useState(() => generatePhotos());
    const ref = useRef(null);
    return (
        <Box p="50px">
            <VStack p="20px">
                <Heading>Photo selector</Heading>
                <Finder items={randomPhotos} rules={[rule]} controllerRef={ref}>
                    <InputGroup startElement={<LuSearch />}>
                        <Input
                            value={query}
                            placeholder="Search"
                            onInput={(e) => {
                                setQuery(e.currentTarget.value);
                                ref.current?.search.set(e.currentTarget.value);
                                console.log(ref.current);
                            }}
                        />
                    </InputGroup>
                    <FinderContent>
                        {{
                            items: ({ items }) => {
                                return (
                                    <SimpleGrid columns={3} gap="20px">
                                        {items.map((item) => (
                                            <SamplePhoto photo={item} key={item.label} />
                                        ))}
                                    </SimpleGrid>
                                );
                            },
                        }}
                    </FinderContent>
                </Finder>
            </VStack>
        </Box>
    );
}

function SamplePhoto({ photo }: { photo: Photo }) {
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
                <HStack color="fg.muted">
                    {photo.width} x {photo.height}
                </HStack>
            </Box>
        </Box>
    );
}

export { App };
