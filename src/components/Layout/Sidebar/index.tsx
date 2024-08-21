import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useLocation } from "react-router-dom";
import { Container, Footer, Header, HeaderIcon, HeaderLogo, Link, Navigation, NavigationItem, NavigationItemIcon, NavigationItemLabel, User, UserAvatar, UserName } from "./styles";
import Button from "../../Button";
import { MdCarRental } from "react-icons/md";
import { SiThemodelsresource } from "react-icons/si";
import { FaCar } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const menuItems = [
    // { label: 'Dashboard', url: '/', icon: <MdOutlineDashboard /> },
    // { label: 'Nova Transação', url: '/transacoes/nova', icon: <MdOutlineAddTask /> },
    // { label: 'Transações', url: '/transacoes', icon: <MdOutlineListAlt /> },
    { label: 'Modelos de carro', url: '/carro-modelos', icon: <SiThemodelsresource /> },
    { label: 'Carros', url: '/carros', icon: <FaCar /> },
    { label: 'Clientes', url: '/clientes', icon: <IoIosPeople /> },
    { label: 'Locações', url: '/locacoes', icon: <MdCarRental /> }
];

export const Sidebar = () => {

    const [isExpanded, setIsExpanded] = useState(true);

    const auth = useAppSelector(state => state.auth);
    const { pathname } = useLocation();

    const handleToggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <Container $expanded={isExpanded}>
            <Header>
                {/* {
                    isExpanded &&
                    <Link to='/'><HeaderLogo src="./logo.png" alt="Logo Image"></HeaderLogo></Link>
                } */}
                <Button onClick={handleToggleExpand} borderRadius="rounded">
                    <HeaderIcon />
                </Button>
            </Header>

            <Navigation>
                {menuItems.map((item, key) => (
                    <Link to={item.url} key={key}>
                        <NavigationItem $isActive={pathname == item.url}>
                            <NavigationItemIcon>
                                {item.icon}
                            </NavigationItemIcon>
                            <NavigationItemLabel>
                                {item.label}
                            </NavigationItemLabel>
                        </NavigationItem>
                    </Link>
                ))}
            </Navigation>

            {/* <Footer>
                <Link to='/account'>
                    <User $isActive={pathname == '/account'}>
                        <UserAvatar>
                            {auth.user?.name.slice(0, 2)}
                        </UserAvatar>
                        <UserName>
                            {auth.user?.name}
                        </UserName>
                    </User>
                </Link>
            </Footer> */}

        </Container>
    );
}