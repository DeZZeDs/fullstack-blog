import React from 'react';
import {Header} from "../Header";
import Container from "@mui/material/Container";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Container maxWidth="lg">
                {children}
            </Container>
        </>
    );
};

export default Layout;
