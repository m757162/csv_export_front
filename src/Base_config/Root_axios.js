import axios from 'axios';
export default function instance(){
   const http=axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
       headers:{
           "Authorization": "Bearer "+sessionStorage.getItem("token") ?? ''
       }
    });
    return {http}
}