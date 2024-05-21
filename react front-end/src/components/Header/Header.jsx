import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, logout } from '../../pages/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState} from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import "./Header.css";



function Header() {


  const userData= useSelector(getUserData)

  useEffect(()=>{
    console.log(userData);

  },[userData])

  //const [isLoggedIn, setIsLoggedIn] = useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigate();
  
const userName= userData.decodificado.userName
console.log(
  userName
);

  
const myPassport = useSelector(getUserData)
  const token = myPassport?.token;

  const logMeOut = ()=>{
    dispatch(logout())
   
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">My studio tattoo {myPassport.vecesLogeado} </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Artistas" id="basic-nav-dropdown">
              <NavDropdown.Divider />
             {token ? (
              <NavDropdown.Item onClick={()=> logMeOut()} > 
              logout
              </NavDropdown.Item>): 
              ( <p> no hay token</p>)
              }
              <NavDropdown.Item href="/login" className= {location.pathname === "/login"? "elementTest" : ""}> 
               Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/register" className={location.pathname === "/register"? "elementTest": ""} > 
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