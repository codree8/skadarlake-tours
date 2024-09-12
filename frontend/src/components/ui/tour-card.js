import { 
    Box, 
    Button, 
    Divider, 
    GridItem, 
    Heading, 
    Image, 
    SimpleGrid, 
    Text 
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const TourCard = ({ props }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();


    const photo = props.id <= 12 ? `images/feature${props.id}.webp` : props.photo;

    return (
        <div className="tour-card">
            <div className="details">
                <div className="thumb-gallery">
                    <Box bg="gray.400" w="full" h="full" position="relative">
                        {photo ? (
                        <Image
                          className="first"
                          objectFit="cover"
                          h={"215px"}
                          w={"full"}
                          src={photo}
                          alt=""
                          aria-hidden="true"
                        />
                        ) : (
                            <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            color="gray.900"
                            fontWeight="bold"
                            fontSize="sm"
                            textTransform="uppercase"
                            backdropFilter="blur(5px)"
                            borderRadius="md"
                            bg="whiteAlpha.300"
                            maxW="80%"
                            textAlign="center"
                            >
                                {t("tourCard.imageNotAvailable")}

                            </Box>
                        )}
                    </Box>
                </div>

                <Box p={4}>
                    <Heading size="md" fontWeight="600" mb={2}>
                        {props.title}
                    </Heading>
                    <Text color="gray.600" mb={4}>
                        {props.description}
                    </Text>
                    <Heading size={"md"} fontWeight="600" color="gray.600">
                        {props.price}€ 
                    </Heading>
                    <Text color="gray.400" mb={4}>
                        {t("tourCard.perPerson")}
                    </Text>

                    {props.available ? (
                    <Button w="full" onClick={() => navigate(`/tours/${props.id}`)}>
                        {t("tourCard.bookNow")}
                    </Button>
                    ) : (
                        <Box position="relative">
                            <Button w="full" variant="outline" isDisabled>
                                {t("tourCard.bookNow")}
                            </Button>
                            <Box
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translate(-50%, -50%)"
                              color="red.500"
                              fontWeight="bold"
                              fontSize="sm"
                              textTransform="uppercase"
                              backdropFilter="blur(5px)"
                              borderRadius="md"
                              bg="whiteAlpha.300"
                              maxW="80%"
                              textAlign="center"
                            >
                                {t("tourCard.notAvailable")}
                            </Box>
                        </Box>
                    )}

                    <Divider borderColor="gray.300" my={4} />

                    <SimpleGrid columns={3} textAlign="center">
                        <GridItem>
                            <Heading fontWeight="400" color="gray.400" size="xs">
                                {t("tourCard.available")}
                            </Heading>
                            <Text fontWeight="500" color="gray.600">
                                {props.available ? t("tourCard.yes") : t("tourCard.no")}
                            </Text>
                        </GridItem>
                    </SimpleGrid>

                    <Divider borderColor="gray.300" my={0} />
                </Box>
            </div>
        </div>
    );
};

export default TourCard;



TourCard.defaultProps = {
    title: "Default tour",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    photo: "", 
    price: "0",
    available: "false",
  };