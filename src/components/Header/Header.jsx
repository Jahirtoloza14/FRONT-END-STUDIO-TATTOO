import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, logout } from '../../pages/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import "./Header.css";




function Header() {


  const userData = useSelector(getUserData)

  useEffect(() => {
    console.log(userData);

  }, [userData])

  useEffect(() => {
    console.log(userData);

  }, [userData])


  const dispatch = useDispatch()

  const navigate = useNavigate();

  const userName = userData.decodificado.userName



  const myPassport = useSelector(getUserData)
  const token = myPassport?.token;

  const logMeOut = () => {
    dispatch(logout())

  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary " >
      <Container id="navbar">
        <Navbar.Brand href="/"> STUDIO TATTOO {myPassport.vecesLogeado} </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" id="nv">
            <Nav.Link href="/" id="nv">Home</Nav.Link>
            <Nav.Link href="/createappointment" id="nv">Crear Cita</Nav.Link>
            <NavDropdown title="Admin" id="nv">
              <NavDropdown.Divider />
              {token ? (
                <NavDropdown.Item onClick={() => logMeOut()} >
                  logout
                </NavDropdown.Item>) :
                (<p> Login </p>)
              }
              <NavDropdown.Item href="/login" className={location.pathname === "/login" ? "elementTest" : ""}>
                Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/createadmin" className={location.pathname === "/createadmin" ? "elementTest" : ""} >
                Register
              </NavDropdown.Item>

            </NavDropdown>
            <NavDropdown title="Artistas" id="nv">
              <NavDropdown.Divider />
              {token ? (
                <NavDropdown.Item onClick={() => logMeOut()} >
                  logout
                </NavDropdown.Item>) :
                (<p> </p>)
              }
              <NavDropdown.Item href="/login" className={location.pathname === "/login" ? "elementTest" : ""}>
                Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/createartist" className={location.pathname === "/createartist" ? "elementTest" : ""} >
                Register
              </NavDropdown.Item>

            </NavDropdown>
            <NavDropdown title="Clientes" id="nv">
              <NavDropdown.Divider />
              {token ? (
                <NavDropdown.Item onClick={() => logMeOut()} >
                  logout
                </NavDropdown.Item>) :
                (<p> </p>)
              }
              <NavDropdown.Item href="/login" className={location.pathname === "/login" ? "elementTest" : ""}>
                Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/register" className={location.pathname === "/register" ? "elementTest" : ""} >
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