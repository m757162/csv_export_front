import { Navbar,Container,NavDropdown,Nav,Form,Row,Col,InputGroup,FormControl,Alert,Button,Accordion,Badge,Card, Carousel,Modal, Offcanvas, ProgressBar, Tabs, Tab, OverlayTrigger, Popover, Tooltip,Spinner} from "react-bootstrap";
import TopNav from './Navbar';
import { useNavigate,Navigate  } from "react-router-dom";
import axios from '../Base_config/Root_axios';
import {useState,useEffect} from 'react'
import '../App.css'

 export default function Home(){
    const navigate=useNavigate();
    const [book,setBook]=useState(null)
    const [searchKey,setSearchKey]=useState(null)
    const [searchData,setSearchData]=useState(null)
    const [searchInput,setSearchInput]=useState('')
    const [spinner,setSpinner]=useState(false)
    const [error,setError]=useState('')
    console.log(searchData)
  
    // get all book info
    useEffect(()=>{
        if(sessionStorage.getItem("token") == null){
            navigate('/login');
        }else{
            axios.get('/dashboard',{
                         headers: {
                            "Authorization": "Bearer "+sessionStorage.getItem("token") ?? ''                                      
                       }}).then((res)=>{
                console.log(res.data)
                setBook(res.data)
            }).catch((err)=>{            
                alert("please login again");
                sessionStorage.clear("token")
                navigate('/login')
            })
        }    
    },[])

    //search suggestions data
    const search_val=(e) =>{
        const get_search_value = e.target.innerHTML
        setSearchInput(get_search_value)
        setSearchKey(get_search_value)
    }
    // user drop keyword in search box
    const searchdata =(event) =>{       
        setSearchKey(event.target.value)
        setSearchInput(event.target.value)
        event.target.value == '' && setSearchData(null)
        if(event.target.value !== ''){
            setSpinner(true)
            axios.get('/searchName?search='+event.target.value,{
                headers: {
                   "Authorization": "Bearer "+sessionStorage.getItem("token") ?? ''                                      
            }}).then((res)=>{
                console.log(event.target.value)               
                setSearchData(res.data)               
                res.statusText &&  setSpinner(false)
                setError('')
                console.log(res.data)
            }).catch((err)=>{
                setSpinner(false)
                setError('Somthing wrong...')
                
            })
        }
    }

    //  search botton click
    const submitsearch =(event) =>{
        event.preventDefault()
        if(searchKey !== null ){
            navigate('/search/' + searchKey)
        }else{
            alert("some keyword required")
        }
    }
    return(
        <>
            <TopNav />
            <Container>
                <Row className="justify-content-center d-flex">
                    <Col md={7}>
                        <Form onSubmit={submitsearch}>
                            <Form.Group className="mt-5 d-flex" controlId="formBasicEmail">
                              <Form.Label className="text-white"></Form.Label>
                              <Form.Control onKeyUp={searchdata} onChange={(event)=>setSearchInput(event.target.value)}  value={searchInput} type="text" placeholder="Search here..." />                           
                                <Button className="p-2 ms-2" variant="primary" type="submit">
                                  Search
                                </Button>
                            </Form.Group>
                            <div className="bg-white search_main">                             
                                { spinner &&<Spinner animation="grow" variant="primary" size="sm" className="p-1" />}
                                { 
                                    searchData !== null && searchData.map((data,index)=>(                                
                                        <li className="search_data" onClick={search_val} key={index}>{data.name}</li>
                                    ))
                                
                                }  
                                <p>{error}</p>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    )
}