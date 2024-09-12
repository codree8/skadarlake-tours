import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/navbar/Navbar";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import NavbarLinks from "../components/navbar/NavbarLinks";
import AvatarMenu from "../components/navbar/avatar-menu";
import axios from "axios";
import ProfileDrawer from "../components/ui/profile-drawer";
import { 
    Box, 
    Container,
    Divider, 
    HStack, 
    Heading, 
    Table, 
    TableContainer, 
    Tbody, 
    Td, 
    Th,
    Text, 
    Thead, 
    Tr, 
    VStack,
    Spacer
} from "@chakra-ui/react";







function Profile() {
    const { t } = useTranslation();
    const user_id = localStorage.getItem("id");
    const [ bookings, setBookings ] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/${user_id}/bookings`).then((response) => {
            setBookings(response.data.data);
        });
    }, [user_id]);

    return (
        <>
          <Navbar
            sidebarContent={<HomeSidebarContent />}
            links={<NavbarLinks />}
            buttons={<AvatarMenu />} 
          />

          <Container h="100vh" maxW="100vw" py={20}>
            <VStack>
                <Box w={"90%"}>
                    <HStack>
                        <Heading size={["lg", "xl"]}>{t("profile.heading")}</Heading>
                        <Spacer />
                        <ProfileDrawer />
                    </HStack>

                    <Divider my={5} />

                    <TableContainer>
                        <Table variant="striped" size={["md", "md", "lg"]}>
                            <Thead>
                                <Tr>
                                    <Th>{t("profile.name")}</Th>
                                    <Th>{t("profile.pricePerPerson")}</Th>
                                    <Th>{t("profile.numPeople")}</Th>
                                    <Th>{t("profile.totalPrice")}</Th>
                                    <Th>{t("profile.bookDate")}</Th>
                                </Tr>
                            </Thead>
                            {bookings.length === 0 ? (
                                <Tbody>
                                    <Tr>
                                        <Td colSpan={7}>
                                            <Text textAlign="center">
                                                {t("profile.noData")}
                                            </Text>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            ) : (
                                <Tbody>
                                    {bookings.map((booking) => (
                                        <Tr key={booking.id}>
                                            <Td>{booking.tour.title}</Td>
                                            <Td>{booking.price_per_person}€</Td>
                                            <Td>{booking.num_people}</Td>
                                            <Td>{booking.price}€</Td>
                                            <Td>{booking.book_date}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            )}
                        </Table>
                    </TableContainer>
                </Box>
            </VStack>
          </Container>
        </>
    );
}

export default Profile;