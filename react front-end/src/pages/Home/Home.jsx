import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Home.css"
export const Home = () => {
    const [count, setCount] = useState(0);
    const [inputData, setInputData] = useState("");
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const inputHandler = (event) => {
        setCredentials((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    //useEffects
    useEffect(() => { }, [count]);

    useEffect(() => {
    }, [credentials]);


    return (
        <>

            <Card className="bg-dark text-white">
      <Card.Img src="giftattoo.gif" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>Bienvenidos</Card.Title>
        <Card.Text>
       Somo el mejor estudio de tatuajes del pais
          Contamos con un staff de artistas especializados.
        </Card.Text>
        
      </Card.ImgOverlay>
    </Card>
  
            <Container>
                <Row>
                    <Col xs={12} md={18} >
                        <div id="name1">STUDIO</div>
                    </Col>
                    <Col xs={12} md={18} ><div className="name2"><h2> Enfocado en el arte del tatuaje </h2>
                        <h3>Somos un estudio especializado en línea fina e ilustración.</h3></div>
                    </Col>
                    <Col xs={12} md={18} >
                        <div className="name2"><h1> Reserva tu cita</h1>
                            <Button href="/createappointment"> PEDIR CITA </Button></div>
                    </Col>
                    <Col xs={12} md={15} >
                        <div className="name3">TATTOO</div>
                    </Col>

                </Row>
            </Container>









        </>
    )
}