import { Navbar,Table,Container,NavDropdown,Nav,Form,Row,Col,InputGroup,FormControl,Alert,Button,Accordion,Badge,Card, Carousel,Modal, Offcanvas, ProgressBar, Tabs, Tab, OverlayTrigger, Popover, Tooltip,Spinner} from "react-bootstrap";
import TopNav from './Navbar';
import { useNavigate,Navigate  } from "react-router-dom";
import instance from '../Base_config/Root_axios';
import {useState,useEffect,useRef} from 'react'
import '../App.css'
import { downloadExcel  } from 'react-export-table-to-excel';
import { CSVLink, CSVDownload } from "react-csv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link} from 'react-router-dom';
import { FaBook,FaTrash,FaEdit } from "react-icons/fa";

export default function Home(){
    const{http}=instance();
    const navigate=useNavigate();
    const [bookInfo,setBookInfo]=useState([])   
    const [error,setError]=useState('')
    const [page,setPage]=useState(1)
    const [total_page,setTotal_Page]=useState()
    const [loading,setLoading]=useState(false)
    const [btn,setBtn]=useState(true)
    const [tolastId,setTo_lastId]=useState(0)
    const [dataProcess,setDataProcess]= useState(true)
    const [reff,setff]=useState(false)
    const [delSpinner,setDelSpinner]=useState(false)
   
    // get all book info   
    useEffect(()=>{
        auth_data()  
    },[])

    function auth_data(){
        if(sessionStorage.getItem("token") == null){
            navigate('/login');
        }else{
            setLoading(true)
            http.get(`/dashboard`).then((res)=>{
                setDataProcess(false)
                if(res.data.total > 0){
                    setTotal_Page(res.data.total)
                    setTo_lastId(res.data.to)
                    setBookInfo([res.data])
                    setLoading(false)
                    setff(true)                  
                }
            }).catch((err)=>{            
                alert("please login again");
                sessionStorage.clear("token")
                navigate('/login')
            })
        }    
    }
    function handleDownloadExcel() {
        const get_header =  Object.keys(bookInfo[0]?.data[0]);
        const header=get_header.filter(item => item !== "id")
        bookInfo[0].data.forEach(object => {
            delete object['id'];
          });
          console.log(bookInfo[0].data)
        downloadExcel({
          fileName: "excel file",
          sheet: "excel sheet",
          tablePayload: {
            header,
            // accept two different data structures
            body: bookInfo[0].data,
          },
        });
    }
    const detele_data=(id)=>{
        setDelSpinner(true)
        delSpinner && toast.info("data deleting...")
        http.get(`/delete?id=${id}`).then((res)=>{
            if(res.data.status == 1){
                auth_data()
                setDelSpinner(false)
                toast.success("data uploaded successfully")
            }else{
                toast.error(res.data.toString())
            } 
        })
        .catch((err)=>{  
            setDelSpinner(false)          
            alert("somthing wrong");            
        })
    }
    
    return(
        <>
            <ToastContainer />
            <TopNav />
            <Container fluid> 
                <Row className="justify-content-center d-flex">  
                    {reff &&  (<div className="my-3"><Button className="" variant="outline-primary" onClick={handleDownloadExcel}>Export excel</Button> 
                    <CSVLink variant="outline-primary" data={bookInfo[0]?.data}><Button className="" variant="outline-primary">Export CSV</Button></CSVLink> </div>)}                                        
                    <Col  className="tableCol" >
                        <Table >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>details</th>
                                    <th>id_address</th>
                                    <th>created_at</th>
                                    <th>updated_at</th>
                                    <th>edit</th>
                                    <th>delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                { 
                                    bookInfo.length !== 0 &&
                                    bookInfo.map((data,i)=>(
                                        data.data.map((data,i)=>(
                                            <tr key={i}>
                                                <td>{data.name }</td>
                                                <td>{data.details }</td>  
                                                <td>{data.ip_address }</td>
                                                <td>{ new Date(data.created_at).toUTCString()}</td>
                                                <td>{ new Date(data.updated_at).toUTCString()}</td>   
                                                <td><Button variant="outline-primary" className="btn editbtn"><Link className="editlink" to={`/edit/${data.id}`}> <FaEdit style={{color:"white"}} /> </Link></Button></td> 
                                                <td><Button variant="outline-danger" className="" onClick={()=>detele_data(data.id)}><FaTrash /></Button></td>                               
                                            </tr> 
                                        ))
                                    ))                                         
                                }  
                            </tbody>
                            {dataProcess ? <td colSpan="3"><center><Spinner size="sm" /> loading...</center></td>:(
                                tolastId < !total_page && <td colspan="3"><center>Nodata Available</center></td>
                            ) }
                        </Table >
                    </Col>     
                </Row>               
            </Container>
        </>
    )
}