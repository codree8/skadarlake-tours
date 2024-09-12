import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import axios from "axios";

function EditItemDrawer ({ dataType, item, onUpdate}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [formData, setFormData] = useState({ ...item });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit =  async () => {
    onUpdate(formData);
    onClose();
  };

  const renderInputFields = () => {
      if (dataType === "tours") {
          return (
              <>
                <Box>
                  <FormLabel htmlFor="title">Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="title"
                    value={formData.name}
                    onChange={handleChange} 
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={handleChange} 
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={handleChange} 
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="available">Availability</FormLabel>
                  <Input
                    id="available"
                    value={formData.available}
                    onChange={handleChange} 
                  />
                </Box>
              </>
          );
      } else if (dataType === "users") {
          return (
              <>
                <Box>
                  <FormLabel htmlFor="firstname">Firstname</FormLabel>
                  <Input
                    ref={firstField}
                    id="firstname"
                    value={formData.firstname}
                    onChange={handleChange} 
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="lastname">Lastname</FormLabel>
                  <Input
                    id="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="telephone">Telephone</FormLabel>
                  <Input
                    id="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={handleChange} 
                  />
                </Box>
              </>
          );
      } else if (dataType === "bookings") {
          return (
              <>
                <Box>
                  <FormLabel htmlFor="book_date">Book Date</FormLabel>
                  <Input 
                    type="date"
                    ref={firstField}
                    id="book_date"
                    value={formData.book_date}
                    onChange={handleChange}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="price_per_person">Price per Person</FormLabel>
                  <Input
                    id="price_per_person"
                    value={formData.price_per_person}
                    onChange={handleChange} 
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="num_people">Number of People</FormLabel>
                  <Input
                    id="num_people"
                    value={formData.num_people}
                    onChange={handleChange}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="price">Total price</FormLabel>
                  <Input
                    id="price"
                    value={formData.total_price}
                    onChange={handleChange} 
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="user_id">Customer ID</FormLabel>
                  <Input
                    id="user_id"
                    value={formData.user_id}
                    onChange={handleChange} 
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="tour_id">Tour ID</FormLabel>
                  <Input
                    id="tour_id"
                    value={formData.tour_id}
                    onChange={handleChange} 
                  />
                </Box>
              </>
          );
      }

      return null;
  };

  return (
      <>
        <Button
          leftIcon={<EditIcon color={"white"} />}
          colorScheme="green"
          _hover={{ bg: "green", color: "white" }}
          onClick={onOpen}
        >
          Edit 
        </Button>

        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
              <DrawerCloseButton />

              <DrawerHeader borderBottomWidth="1px">Edit {dataType}</DrawerHeader>

              <DrawerBody>
                  <Stack spacing="24px">{renderInputFields()}</Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                  </Button>
                  <Button colorScheme="green" px={7} onClick={handleSubmit}>
                      Save
                  </Button>
              </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
  );
}

export default EditItemDrawer;