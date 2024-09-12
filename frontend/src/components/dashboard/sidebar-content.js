import {
    Box,
    Flex,
    Text,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import NavItem from "./nav-item";
import { FaUserFriends } from "react-icons/fa";
import { IoBoatOutline } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
import { HamburgerIcon } from "@chakra-ui/icons";


const SidebarContent = ({ handleData, ...props }) => {
    const sidebar = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
          <Box
            display={{ base: "none", md: "unset", 
            }}
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg="blue.700"
            borderColor="blackAlpha.300"
            borderRightWidth="1px"
            w="60"
            {...props}
        >
            <Flex px="4" py="5" align="center">
                <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
                    Skadar Lake Tours 
                </Text>
            </Flex>

            <Flex
              direction="column"
              as="nav"
              fontSize="sm"
              color="gray.600"
              aria-label="Main Navigation"
            >
                <NavItem icon={FaUserFriends} onClick={() => handleData("Users")}>
                    Users
                </NavItem>

                <NavItem icon={IoBoatOutline} onClick={() => handleData("Tours")}>
                    Tours 
                </NavItem>

                <NavItem icon={FaRegListAlt} onClick={() => handleData("Bookings")}>
                    Bookings 
                </NavItem>
            </Flex>
          </Box>

          <Drawer
            isOpen={sidebar.isOpen}
            onClose={sidebar.onClose}
            placement="left"
          >
            <DrawerOverlay />
            <DrawerContent bg={"red"}>
                <Box
                  as="nav"
                  pos="fixed"
                  top="0"
                  left="0"
                  zIndex="sticky"
                  h="full"
                  pb="10"
                  overflowX="hidden"
                  overflowY="auto"
                  bg="blue.700"
                  borderColor="blackAlpha.300"
                  borderRightWidth="1px"
                  w="full"
                  {...props}
                >

                    <Flex px="4" py="5" align="center">
                        <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
                            Skadar Lake Tours 
                        </Text>
                    </Flex>

                    <Flex
                      direction="column"
                      as="nav"
                      fontSize="sm"
                      color="gray.600"
                      aria-label="Main Navigation"
                    >
                        <NavItem icon={FaUserFriends} onClick={() => handleData("Users")}>
                          Users
                        </NavItem>

                        <NavItem icon={IoBoatOutline} onClick={() => handleData("Tours")}>
                          Tours 
                        </NavItem>

                        <NavItem icon={FaRegListAlt} onClick={() => handleData("Bookings")}>
                          Bookings 
                        </NavItem> 
                    </Flex>
                </Box>
            </DrawerContent>
          </Drawer>

          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none", }}
            onClick={sidebar.onOpen}
            size="sm" 
          />
        </>
    );
};

export default SidebarContent;