import { Navbar,Container,Nav,Form,Row,Col,Button,Spinner} from "react-bootstrap";
import {useState,useEffect,useRef} from 'react'
import TopNav from './Navbar';
import { useNavigate,useParams  } from "react-router-dom";
import instance from '../Base_config/Root_axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Admin(){
    const {id}=useParams();
    useEffect(()=>{
        if(sessionStorage.getItem("token") == null){
            navigate('/login');
        }
    })
    const {http}=instance()
    const navigate=useNavigate();
    const [spinner,setSpinner]=useState(false)
    const [book_name,setBook_name]= useState('')
    const [details,setdetails]= useState('')
    const book_details =(event) =>{
      setdetails(event.target.value)
    }
    const formdata =(event) =>{
      setBook_name(event.target.value)
    }
    useEffect(()=>{
        http.get(`/get_row?id=${id}`).then((res)=>{
            console.log(res.data.name)

            setBook_name(res.data.name)
            setdetails(res.data.details)

        }).catch((error)=>{
            setSpinner(false)
            // console.log(error)
            console.log("eeg")
            toast.error("not call")
        })
    },[])
    const submitform= async(event)=>{
        if(sessionStorage.getItem("token") == null){
            navigate('/login');
        }
        event.preventDefault();

        const formData = new FormData();
        formData.append("book_name", book_name);
        formData.append("details", details);
        try{
                setSpinner(true)
                http.post(`/updateData?id=${id}`,formData).then((res)=>{
                    setSpinner(false)
                       
                        console.log(res.data)
                    if(res.data.status == 1){
                        toast.success("data update successfully")
                        navigate('/');
                        
                    }else{
                        toast.error(res.data.toString())
                    } 
                }).catch((error)=>{
                    setSpinner(false)
                    // console.log(error)
                    console.log("eeg")
                    toast.error("Data Not update.somthing wrong")
                })
            }
            catch(error) {
                toast.error("somthing wrong.please try again")
            }
    }
    const ref1 = useRef();
    const ref2 = useRef();
    return(
        <>
            <TopNav />
            <ToastContainer />
            <Container>
                <Row className="d-flex justify-content-center mt-5">
                    <Col md={7}>
                        <center><h3>Edit info</h3></center>
                        <Form onSubmit={submitform}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label className="text-white">Name</Form.Label>
                              <Form.Control onChange={formdata} value={book_name} ref={ref1} type="text" placeholder="Enter Book Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label className="text-white">Details</Form.Label>
                              <Form.Control  onChange={book_details} value={details} ref={ref2} type="text" placeholder="Enter Book Details"/>
                            </Form.Group>
                            <Button variant="primary" disabled={spinner ? true:false}  type="submit">
                                {spinner ? <Spinner  size="sm" /> : "Submit"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}