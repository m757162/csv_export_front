import { Navbar,Container,NavDropdown,Nav,Form,Row,Col,InputGroup,FormControl,Alert,Button,Accordion,Badge,Card, Carousel,Modal, Offcanvas, ProgressBar, Tabs, Tab, OverlayTrigger, Popover, Tooltip,Spinner} from "react-bootstrap";
import {useState,useRef} from 'react'
import  '../App.css'
import { useNavigate,Link  } from "react-router-dom";
import instance from '../Base_config/Root_axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login(){
    const {http}=instance()
    const [psw,setpsw]= useState('')
    const [email,setemail]= useState('')
    const [spinner,setSpinner]=useState(false)
    const [login,setLogin]=useState(false)

    const navigate = useNavigate();

    const user_email =(event) =>{
        setemail(event.target.value)
    }
    const password = (event) => {
        setpsw(event.target.value)
    }
  
    const submitform= async(event)=>{
        event.preventDefault();
        setSpinner(true)
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", psw);
        if(  email == '' || psw == ''  ){
            alert("please fillup all field")
            setSpinner(false)
        }else{
            try {
                http.post('login',formData).then((res)=>{                  
                    setSpinner(false)
                    toast.error(res.data.toString())
                    if(res.data.msg){
                        setSpinner(false)
                        toast.success("login success!")
                        setLogin(true)
                        const token=sessionStorage.setItem('token',res.data.token)
                        navigate('/')
                        ref1.current.value = "";                        
                        ref.current.value = "";
                    }
                })
                .catch((error)=>{
                    setSpinner(false)
                    console.log("Error:")
                    toast.error("login failed!")
                })
            }
            catch(error) {
                setSpinner(false)
                toast.error('somthing wrong')
            }
        }
    }
    const col_style={
        border: "1px solid #0028fd",
        padding: "13px",
        borderRadius: "10px",
    }
    const ref1 = useRef();
    const ref = useRef();
    return(
        <>
            <ToastContainer />
            <Container>                 
                <Row className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                    <Col md={7} style={col_style}>
                        <h2 className="text-center text-white">Login</h2>
                        <Form onSubmit={submitform}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label className="text-white">Email</Form.Label>
                              <Form.Control  onChange={user_email}  ref={ref} type="email" placeholder="Enter Your Email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label className="text-white">Password</Form.Label>
                              <Form.Control  onChange={password} ref={ref1} type="password" placeholder="Enter Your Password" />
                            </Form.Group>
                            <Link to="/Registation">Create a new account</Link><br />
                           
                            <Button variant="primary" disabled={spinner ? true:false}  type="submit">
                             { spinner ? <Spinner size="sm" />: "Submit"} 
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}