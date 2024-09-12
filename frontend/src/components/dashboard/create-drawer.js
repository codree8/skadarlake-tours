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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import axios from "axios";
import { showToast } from "../toast-alert";

function CreateItemDrawer({ dataType, onUpdate }) {
  const {isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const toast = useToast();

  const [formData, setFormData] = useState({});


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData);
    axios
      .post(`http://127.0.0.1:8000/api/${dataType}`, formData)
      .then((response) => {
        console.log(response.data.data);
        showToast(toast, "Tour added successfully", "success");
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderInputFields = () => {
      if (dataType === "tours") {
          return (
              <>
                <Box>
                  <FormLabel htmlFor="title">Name</FormLabel>
                  <Input ref={firstField} id="title" onChange={handleChange} />
                </Box>
                <Box>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea id="description" onChange={handleChange} />
                </Box>
                <Box>
                  <FormLabel htmlFor="photo">Photo</FormLabel>
                  <Input id="photo" onChange={handleChange} />
                </Box>
                <Box>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <Input id="price" onChange={handleChange} />
                </Box>
                <Box>
                  <FormLabel htmlFor="available">Availability</FormLabel>
                  <Input id="available" onChange={handleChange} />
                </Box>
              </>
          );
      } else if (dataType === "users") {
          return (
              <>
                <Box>
                  <FormLabel htmlFor="firstname">Firstname</FormLabel>
                  <Input ref={firstField} id="firstname" onChange={handleChange} />
                </Box>

                <Box>
                  <FormLabel htmlFor="lastname">Lastname</FormLabel>
                  <Input id="lastname" onChange={handleChange} />
                </Box>

                <Box>
                  <FormLabel htmlFor="telephone">Telephone</FormLabel>
                  <Input id="telephone" onChange={handleChange} />
                </Box>

                <Box>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" onChange={handleChange} />
                </Box>
              </>
          );
      } else if (dataType === "bookings") {
          return (
              <>
                <Box>
                  <FormLabel htmlFor="book_date">Book Date</FormLabel>
                  <Input ref={firstField} id="book_date" onChange={handleChange} />
                </Box>

                <Box>
                  <FormLabel htmlFor="price_per_person">Price per Person</FormLabel>
                  <Input id="price_per_person" onChange={handleChange} />
                </Box>

                <Box>
                  <FormLabel htmlFor="num_people">Number of People"</FormLabel>
                  <Input id="num_people" onChange={handleChange} />
                </Box>

                <Box>
                  <FormLabel htmlFor="total_price">Total price</FormLabel>
                  <Input id="total_price" onChange={handleChange} />
                </Box>

                <Box>
                  <FormLabel htmlFor="user_id">Customer ID</FormLabel>
                  <Input id="user_id" onChange={handleChange} />
                </Box>

                <Box>
                  <FormLabel htmlFor="tour_id">Tour ID</FormLabel>
                  <Input id="tour_id" onChange={handleChange} />
                </Box>
              </>
          );
      }

      return null;
  };

  return (
      <>
        <Button
          colorScheme="telegram"
          ml={4}
          leftIcon={<AddIcon color="white" />}
          onClick={onOpen}
        >
          New Item
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

              <DrawerHeader borderBottomWidth="1px">Create {dataType}</DrawerHeader>

              <DrawerBody>
                  <Stack spacing="24px">{renderInputFields()}</Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                  </Button>
                  <Button colorScheme="green" px={7} onClick={handleSubmit}>
                      Create
                  </Button>
              </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
  );
}

export default CreateItemDrawer;