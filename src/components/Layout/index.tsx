import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";
import { BodyContent, Container, Content, NavbarContent } from "./styles";

const Layout = () => {

    return (
        <Container>
            <Sidebar />
            <Content>
                <NavbarContent>
                    <Navbar />
                </NavbarContent>
                <BodyContent>
                    <Outlet />
                </BodyContent>
            </Content>
        </Container>
    );
}

export default Layout;