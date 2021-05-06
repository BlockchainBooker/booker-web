//@ts-nocheck
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MoreIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import styled from "styled-components";
import ResponsiveDrawer from "./ResponsiveDrawer";

const LogoText = styled.a`
  font-size: 25px;
  font-weight: 700;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: none;
  }
`;

const NavBar = styled(AppBar)`
  && {
    background-color: white;
    z-index: 1300;
    color: black;
    box-shadow: ${(props) =>
        props.position === "fixed" ? "0 -1px 6px 0 rgba(0, 0, 0, 0.2)" : "none"};
  }
`;

export const toolbarStyles = (theme) => ({
    root: {
        height: 64,
        [theme.breakpoints.up("sm")]: {
            height: 64,
        },
    },
});

const styles = (theme) => ({
    title: {
        fontSize: 24,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        color: theme.palette.common.black,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: "space-between",
    },
    left: {
        flex: 0,
    },
    leftLinkActive: {
        color: theme.palette.common.white,
    },
    right: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
    },
    rightLink: {
        fontSize: 16,
        cursor: "pointer",
        color: theme.palette.common.black,
        marginLeft: theme.spacing(3),
    },
    linkSecondary: {
        color: theme.palette.common.black,
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
});

const BasicMenu = ({ classes, type = "fixed" }) => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);


    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const renderMobileMenu = (
        <ResponsiveDrawer
            anchorEl={mobileMoreAnchorEl}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        />
    );

    const links = [
        {
            name: "Buy a book",
            route: "/",
        },
        {
            name: "My books",
            route: "/library",
        },
    ];

    return (
        <div>
            <NavBar position={type}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left}>
                        <LogoText href="/">Booker</LogoText>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <div className={classes.right}>
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    variant="h5"
                                    color="inherit"
                                    underline="none"
                                    className={classes.rightLink}
                                    href={link.route}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton onClick={handleMobileMenuOpen} color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </NavBar>
            <div className={classes.placeholder} />
            {renderMobileMenu}
        </div>
    );
};

export default withStyles(styles)(BasicMenu);
