import React from 'react';

import { Navbar,Container,NavDropdown,Nav,Form,Row,Col,InputGroup,FormControl,Alert,Button,Accordion,Badge,Card, Carousel,Modal, Offcanvas, ProgressBar, Tabs, Tab, OverlayTrigger, Popover, Tooltip,Spinner} from "react-bootstrap";
import { Link} from 'react-router-dom';
import { useNavigate,Navigate  } from "react-router-dom";
import {useState,useEffect} from 'react'
import instance from '../Base_config/Root_axios';
import { FaBook } from "react-icons/fa";
import { CSVLink, CSVDownload } from "react-csv";

export default function NavTop()  {
    const {http}=instance()
    const [spinner,setSpinner]=useState(false)
    const [logoutbool,setlogoutbool]= useState(false)
    const navigate=useNavigate();
    useEffect(()=>{
        if(sessionStorage.getItem("token") == null){
            navigate('/login');
        }
        if(logoutbool == true){
            if(sessionStorage.getItem("token") == null){
                navigate('/login');
            }
        }    
    },[logoutbool])
    

    const logout = () =>{
        setSpinner(true)
        http.get('/logout').then((res)=>{            
            setlogoutbool(true)
            setSpinner(false)
            navigate('/login');
            sessionStorage.clear("token")
        }).catch((err)=>{
            setSpinner(false)
            alert("Somthing wrong.Try again");
            sessionStorage.clear("token")
            
        })
    }

    return(  
        <>         
            <Navbar sticky="top" style={{backgroundImage: "linear-gradient(85deg,#0d6c9b,rgb(30, 66, 104))"}}  className="text-primary d-flex justify-content-end ml-auto" >
                <Container fluid>
                    <Navbar.Brand className="w-s ms-md-5" to="/">                       
                        <Link  as="li"  to="/"><FaBook style={{color: "black"}} /></Link>                    
                    </Navbar.Brand>
                    <Nav className="ms-auto me-md-5">
                        <Link  as="li"  to="/admin" className="me-2 " >Admin</Link>  
                        <Link  as="li"  to="" onClick={logout} className=" bg-red " >{ spinner ? <span><Spinner size="sm" />logout</span>: "logout"}</Link>                       
                    </Nav>
                </Container>
            </Navbar>     
        </>                        
    );
   
}

