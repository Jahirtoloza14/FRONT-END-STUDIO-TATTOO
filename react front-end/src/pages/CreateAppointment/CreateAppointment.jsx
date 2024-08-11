import { CustomInput } from "../../components/Custominput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import "./CreateAppointment.css";
import { useState, useEffect } from "react";
import { registerNewAppointmentCall } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, login } from "../userSlice";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';



export const RegisterAppointment = () => {
    const userData = useSelector(getUserData)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({

        tittle: "",
        user_id: "",
        artist_id: "",
        start_time: "",
        end_time: "",
        location: ""

    });
    const [msg, setMsg] = useState("")

    const inputHandler = (e) => {
        //genero la funcion que bindea

        setCredentials(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));

    };


    const RegisterMeAppoinment = async () => {
        const answer = await registerNewAppointmentCall(credentials);
        setMsg(answer.data.message)
    


        /*   if (answer.data.success) {
               dispatch(login(answer.data,token));
               setTimeout(() => {
                   navigate("/login");
               }, 2000)
           }
     
*/
    }

    return (

        <div className="register-container registerElementsDesign" >
            <h1>CREA TU CITA</h1>

            {msg === "" ?
                <>

                    <Form   >
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name={"title"}
                                    placeholder="Tittle"
                                    onChange={(e) => inputHandler(e)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name={"user_id"}
                                    placeholder="User Id"
                                    onChange={(e) => inputHandler(e)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Artist ID</Form.Label>
                                <InputGroup hasValidation>

                                    <Form.Control
                                        type="text"
                                        name={"artist_id"}
                                        placeholder="Artist Id"
                                        onChange={(e) => inputHandler(e)}
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Lugar</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={"location"}
                                    placeholder="City"
                                    onChange={(e) => inputHandler(e)} required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control
                                    name={"start_time"}
                                    type={"datetime-local"}
                                    onChange={(e) => inputHandler(e)} required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom05">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control
                                    name={"end_time"}
                                    type={"datetime-local"}
                                    onChange={(e) => inputHandler(e)}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid zip.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                        <ButtonC
                            title={"Crear"}
                            className={"regularButtonClass"}
                            type="submit"
                            functionEmit={RegisterMeAppoinment}
                        />
                    </Form>
                </> : <div>{"Cita creada"}</div>} </div>
    )


}