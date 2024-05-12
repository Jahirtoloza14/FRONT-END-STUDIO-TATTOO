import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from "react"
import { useLocation } from 'react-router-dom';
import "./Header.css";


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const location = useLocation()
  console.log(location)
  console.log(location.pathname, "usted esta aqui")


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">My studio tattoo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Artistas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/characters">Characters</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" className= {location.pathname === "/login"? "elementTest" : ""}> 
               Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/register" > 
               Register
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;