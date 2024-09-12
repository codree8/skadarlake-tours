import { Box, Container, Flex, Image, Stack, Text, chakra } from "@chakra-ui/react"
import { useTranslation } from "react-i18next";





const TourCard = ({ image, tourName, length }) => {
    return (
        <Flex p={30} w="Full" alignItems="center" justifyContent="center">
            <Box
              w="xs"
              bg="white"
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              mx="auto"
            >
                <Image
                  w="full"
                  h={56}
                  fit="cover"
                  src={`images/${image}`}
                  alt="avatar"
                />

                <Box py={5} textAlign="center">
                    <Text
                      display="block"
                      fontSize="2xl"
                      color="gray.800"
                      fontWeight="bold"
                    >
                        {tourName}
                    </Text>

                    <chakra.span fontSize="sm" color="gray.700">
                        {length}
                    </chakra.span>
                </Box>
            </Box>
        </Flex>
    );
};

const FeaturedTours = () => {
    const { t } = useTranslation();

    return (
        <Box mt={4} pt={5}>
            <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
                <Box textAlign={{ lg: "center", }}>
                    <chakra.p
                      mt={2}
                      fontSize={{ base: "3xl", sm: "4xl", }}
                      lineHeight="8"
                      fontWeight="extrabold"
                      letterSpacing="tight"
                      _light={{ color: "gray.900", }}
                    >
                        {t("featuredTours.title")}
                    </chakra.p>

                    <chakra.p
                      mt={4}
                      maxW="2xl"
                      fontSize="xl"
                      mx={{ lg: "auto", }}
                      color="gray.500"
                      _dark={{ color: "gray.400", }}
                    >
                        {t("featuredTours.description")}
                    </chakra.p>
                </Box>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: 10, md: 4, lg: 10 }}
                >
                    <TourCard image="feature1.webp" tourName="Virpazar/Lesendro/Andrijska gora/Virpazar" length="2h Cruising" />
                    <TourCard image="feature2.webp" tourName="Virpazar/Poseljani/Virpazar" length="4h Cruising" />
                    <TourCard image="feature3.webp" tourName="The Longest: Virpazar/Karuc" length="6h Cruising" />
                </Stack>
            </Container>
        </Box>
    );
};

export default FeaturedTours;