import { Box, GridItem, SimpleGrid, VStack, Flex } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import NavbarLinks from "../components/navbar/NavbarLinks";
import HomeSidebarContent from "../components/home/home-sidebar-content";
import SearchInput from "../components/search";
import SearchContext from "../SearchContext";
import LoadingSpinner from "../components/ui/loading-spinner";
import AvatarMenu from "../components/navbar/avatar-menu";
import Footer from "../components/footer";
import TourCard from "../components/ui/tour-card";
import NavbarLoginButtons from "../components/navbar/login-buttons";


function BookTours() {
    const { searchResults } = useContext(SearchContext);
    const [ tours, setTours ] = useState();
    const [ isLoading, setLoading ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("email");
        if(email) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    })

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/tours").then((response) => {
            setTours(response.data.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingSpinner />

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Box flexGrow={1}>
                <Navbar
                  sidebarContent={<HomeSidebarContent />}
                  links={<NavbarLinks />}
                  buttons={
                    <Flex justifyContent="space-between" alignItems="center" width="60%">
                    <SearchInput type={"tours"} />
                    <Flex>
                        {isLoggedIn ? <AvatarMenu /> : <NavbarLoginButtons />}
                    </Flex>
                </Flex>
                  } 
                />

                <VStack>
                    <SimpleGrid
                      columns={[1, 1, 2, 2, 3]}
                      rowGap={6}
                      columnGap={8}
                      py={10}
                    >
                        {searchResults && searchResults.length > 0 ? searchResults.map((tour) => (
                            <GridItem key={tour.id} colSpan={1}>
                                <TourCard props={tour} />
                            </GridItem>
                        ))
                        : tours.map((tour) => (
                            <GridItem key={tour.id} colSpan={1}>
                                <TourCard props={tour} />
                            </GridItem>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Box>
            <Footer />
        </Box>
    );
    
}

export default BookTours;