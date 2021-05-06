import Head from "next/head";
import * as React from "react";
import styled from "styled-components";
import BasicMenu from "./BasicMenu";


const Container = styled("div")`
  min-height: 100vh;
  background: white;
  padding: 20px;
`;

const Content = styled("div")``;

const Layout = ({ children, title = "Booker", menuType = "fixed" }) => (
    <Container>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <BasicMenu type={menuType} />
        <Content>{children}</Content>
    </Container>
);

export default Layout;
