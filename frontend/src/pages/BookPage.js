import {
  Center,
  VStack,
  Heading,
  Input,
  Text,
  Button,
  Image,
  Spacer,
  Stack,
  SimpleGrid,
  GridItem,
  Divider,
  useToast,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/ui/loading-spinner";
import { showToast } from "../components/toast-alert";
import { useTranslation } from "react-i18next";
import Navbar from "../components/navbar/Navbar";
import AvatarMenu from "../components/navbar/avatar-menu";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import NavbarLoginButtons from "../components/navbar/login-buttons";
import emptyImage from "../components/ui/empty.png";


function BookPage() {
  const { t } = useTranslation();

  const [tour, setTour] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [bookDate, setBookDate] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  
  const [ isModalOpen, setModalOpen ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if(email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  })

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/tours/${id}`)
      .then((response) => {
        console.log("Tour data:", response.data.data[0]);
        setTour(response.data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tour:", error);
      });
  }, [id]);

  useEffect(() => {
    calculatePrice();
  }, [numPeople]);

  const calculatePrice = () => {
    const people = parseInt(numPeople);
    const price = tour.price * people;
    setTotalPrice(price);
  };

  const handleBookDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];
  
    
    setBookDate(selectedDate);
  
    if (selectedDate < today) {
      showToast(
        toast,
        "Please select a future date",
        "error",
        "Error"
      );
    }
  };
  

  const handleNumPeopleChange = (e) => {
    setNumPeople(e.target.value);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/signup");
  }

  const bookTour = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    if (!bookDate || bookDate <= today) {
      showToast(
        toast,
        "Please enter a valid booking date",
        "error",
        "Error"
      );
      return;
    }

    if (!numPeople || parseInt(numPeople) <= 0) {
      showToast(
        toast,
        "Please specify the number of people",
        "error",
        "Error"
      );
      return;
    }

    const booking = {
      book_date: bookDate,
      price_per_person: tour.price,
      num_people: numPeople,
      price: totalPrice,
      user_id: localStorage.getItem("id") || null,
      tour_id: id,
    };

    if (!booking.user_id) {
      setModalOpen(true);
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/bookings", booking)
      .then((response) => {
        showToast(
          toast,
          "Tour booked successfully!",
          "success",
          "Success"
        );
        navigate("/tours");
      })
      .catch((error) => {
        showToast(toast, "Booking failed", "error", "Error");
        console.error("Error booking tour:", error);
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Navbar
        sidebarContent={<HomeSidebarContent />}
        links={<NavbarLinks />}
        buttons={isLoggedIn ? <AvatarMenu /> : <NavbarLoginButtons />}
      />
      <Center h={"100vh"} m={["5%", "10%", "12%", "13%", "0%"]}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          boxShadow="2xl"
          h={"auto"}
          w={"80%"}
          borderRadius="15px"
          overflow={"hidden"}
        >
          <Box w={{ base: "100%", lg: "50%" }}>
            <Image src={tour.photo || emptyImage} objectFit="cover" h={"full"}></Image>
          </Box>
          <Box w={{ base: "100%", lg: "50%" }} p={"5%"} bg={"white"} h={"full"}>
            <VStack alignItems={"center"} spacing={"3"}>
              <Heading fontWeight={"500"}>{tour.title}</Heading>

              <Text fontWeight="600" color="gray.600">
                {t(tour.description)}
              </Text>

              <Divider borderColor="gray.300" py={3} />
              <SimpleGrid w={"full"} columns={2} py={3} textAlign="center">
                <GridItem>
                  <Heading fontWeight="500" color="gray.400" size="xs">
                    {t("profile.pricePerPerson")}
                  </Heading>
                  <Text fontWeight="600" color="gray.600">
                    €{tour.price}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading fontWeight="500" color="gray.400" size="xs">
                    {t("tourCard.available")}
                  </Heading>
                  <Text fontWeight="600" color="gray.600">
                    {tour.available === 1 ? "Yes" : "No"}
                  </Text>
                </GridItem>
              </SimpleGrid>
              <Divider borderColor="gray.300" py={0} />

              <Input
                type={"date"}
                value={bookDate}
                onChange={handleBookDateChange}
                placeholder="Select Booking Date"
              />

              <Input
                type="number"
                value={numPeople}
                onChange={handleNumPeopleChange}
                min={1}
                placeholder="Number of People"
              />

              <Spacer />
              <Text
                color="gray.600"
                fontSize="2xl"
                fontWeight={["bold", "extrabold"]}
              >
                Total: €{totalPrice.toFixed(2)}
              </Text>
              <Button onClick={bookTour} w={"full"}>
                {t("tourCard.confirmBook")}
              </Button>
            </VStack>
          </Box>
        </Stack>
      </Center>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Booking requires account</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>Please login or register in order to book the tour.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleLogin}>
              Login 
            </Button>
            <Button variant="ghost" onClick={handleRegister}>
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BookPage;
