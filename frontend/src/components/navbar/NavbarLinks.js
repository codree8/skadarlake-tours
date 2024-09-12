import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Menu, MenuButton, MenuList, MenuItem, Flex, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const NavbarLinks = () => {
    const { t, i18n } = useTranslation();
    const email = localStorage.getItem("email");
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const changeLanguage = (language) => {
        setCurrentLanguage(language);
        i18n.changeLanguage(language);
    };

    return (
        <div className="collapse navbar-collapse mt-lg-0 mt-4" id="navbarLinks">
            <Link className="navbar-brand" to="/">
                Skadar Lake Tours
            </Link>
            <ul className="navbar-nav d-flex align-items-center">
                <li className="nav-item mx-2">
                    <Link className="nav-link" to="/home">
                        {t("navbar.home")}
                    </Link>
                </li>
                <li className="nav-item mx-2">
                    <Link className="nav-link" to="/tours">
                        {t("navbar.bookTours")}
                    </Link>
                </li>
                {email === "admin@gmail.com" && (
                    <li className="nav-item mx-2">
                        <Link className="nav-link" to="/dashboard">
                            {t("navbar.dashboard")}
                        </Link>
                    </li>
                )}
                <li className="nav-item mx-2">
                    <Menu>
                        <MenuButton
                            as={Flex}
                            alignItems="center"
                            cursor="pointer"
                            className="nav-link"  
                        >
                            <Text marginTop="4" className="language-text">{t("navbar.language")} <ChevronDownIcon /></Text>
                            
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                onClick={() => changeLanguage("en")}
                                style={{ display: currentLanguage === "en" ? "none" : "block" }}
                            >
                                {t("menuList.english")}
                            </MenuItem>
                            <MenuItem
                                onClick={() => changeLanguage("sr")}
                                style={{ display: currentLanguage === "sr" ? "none" : "block" }}
                            >
                                {t("menuList.serbian")}
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </li>
            </ul>
        </div>
    );
};

export default NavbarLinks;
