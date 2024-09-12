import { Container, Flex } from "@chakra-ui/react";

const Navbar = ({ sidebarContent, links, buttons}) => {
    return (
        <Container maxWidth="1720px" px={[12, 8, 8]}>
            <nav className="navbar navbar-expand-lg my-3">
                <Flex
                  as="header"
                  align="center"
                  jsutify="space-between"
                  w="full"
                  bg="white"
                  borderColor="blackAlpha.300"
                  h="14"
                >
                    {sidebarContent}
                    {links}
                    {buttons}
                </Flex>
            </nav>
        </Container>
    );
};

export default Navbar;