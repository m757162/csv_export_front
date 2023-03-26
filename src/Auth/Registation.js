import { Navbar,Container,NavDropdown,Nav,Form,Row,Col,InputGroup,FormControl,Alert,Button,Accordion,Badge,Card, Carousel,Modal, Offcanvas, ProgressBar, Tabs, Tab, OverlayTrigger, Popover, Tooltip,Spinner} from "react-bootstrap";
import {useState,useRef} from 'react'
import '../App.css'
import { useNavigate,Link } from "react-router-dom";
import instance from '../Base_config/Root_axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Registation(){
  const {http}=instance()
  const [name,setname]= useState('')
  const [psw,setpsw]= useState('')
  const [email,setemail]= useState('')
  const [spinner,setSpinner]=useState(false)
  const [reg,setReg]=useState(false)
  const navigate = useNavigate();

  const user_name =(event) =>{
   setname(event.target.value)
  }
  const user_email =(event) =>{
    setemail(event.target.value)
  }
  
  const password = (event) => {
    setpsw(event.target.value)
  }
  const submitform= (event)=>{
        event.preventDefault();
        setSpinner(true)       
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", psw);
        formData.append("email", email);

        if(name == '' || psw == '' || email == '' ){
            alert("please fillup all field")
            setSpinner(false)
        }else{
            try {
              http.post('registation',formData).then((res)=>{                       
                    setSpinner(false)
                                   
                    if(res.data.msg == "success"){                     
                      toast.success("Registation success!")                      
                      sessionStorage.setItem('token',res.data.token)
                      navigate('/')
                      ref1.current.value = "";
                      ref2.current.value = "";
                      ref.current.value = "";
                    } else{
                      toast.error(res.data.toString()) 
                    }             
                }).catch((error)=>{
                  setSpinner(false)
                  toast.error("Registation failed")
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
   const ref2 = useRef();
   const ref = useRef();
    return(
        <>
            <Container>
            <ToastContainer />
                <Row className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                    <Col md={7} style={col_style}>
                        <h2 className="text-center text-white">Registation </h2>
                        <Form onSubmit={submitform}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label className="text-white"> Name</Form.Label>
                              <Form.Control onChange={user_name} ref={ref1} type="text" placeholder="Enter Your Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label className="text-white">Email</Form.Label>
                              <Form.Control  onChange={user_email} ref={ref2} type="email" placeholder="Enter Your Email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label className="text-white">Password</Form.Label>
                              <Form.Control  onChange={password} type="password" ref={ref} placeholder="Enter Your Password" />
                            </Form.Group>
                            <Link to="/login">I have an account</Link><br />
                            <Button variant="primary" disabled={spinner ? true:false} type="submit">
                            { spinner ? <Spinner size="sm" />: "Submit"} 
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}