import { useEffect, useState } from "react";
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
            <div>
                <h1>Bienvenidos</h1>
            </div>
            <Image src="giftattoo.gif" fluid />

            <div>
            </div>
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