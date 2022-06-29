import React,{useEffect} from 'react';
import { Container,Row,Col,Table,Button,Card } from 'react-bootstrap';
import { Url,isLoggin,picture,imgUrl } from '../../GLOBAL/global';
import axios from 'axios';
import '../../style/messages.scss';
import dateFormat from 'dateformat';
import { useHistory,Link} from "react-router-dom";
import { FcLeftDown,FcRightUp } from "react-icons/fc";
import Parallax from 'react-rellax'
import {FaArrowDown} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import {AiOutlineCamera} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'
import 'react-toastify/dist/ReactToastify.css';
import {FiPackage} from 'react-icons/fi';
import {BsFillKanbanFill } from "react-icons/bs";
import Pagination from '../../pages/Pagination';
import { AiOutlineBars } from "react-icons/ai";
import Shimmer from "react-shimmer-effect";
import Footer from '../../components/Footer';

var sessionstorage = require('sessionstorage');

export default function Index() {
    let history = useHistory();
    const [length,setLength] = React.useState(0);
    
    const [allmessages,setAlmessages]= React.useState([{}]);
    const[customerInfo,setCustomerInfo] = React.useState();
    const [loading,setLoading] = React.useState(true);
    const [currentPage,setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(10);
    const indexOfLastPost = currentPage*postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allmessages.slice(indexOfFirstPost,indexOfLastPost);

    function paginate(pageNumber)
    {
      setCurrentPage(pageNumber);
    }

   
    async function logginornot()
    {
      const cust =  await isLoggin();
      console.log("cust",cust);
      if(cust === null)
      {
        history.push('/login');
      }
      
  
    }

    async function getInfos()
{
  console.log("get cust info")
    const token = sessionstorage.getItem("token");
    
    let formdata = new FormData();
    const customer_id = sessionstorage.getItem("customerId");

    formdata.append("customer_id",customer_id);
    
    const headers ={
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }

    await axios({
        method: 'post',
        url: Url+'getProfile',
        data: formdata,
        headers: headers
        })
        .then(function (response) {
            //handle success
           
            console.log("getprofile",response.data.data[0]);
            setCustomerInfo(response.data.data[0]);
           
            
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });

      }
  
    React.useEffect(() => {
  
      logginornot();
      getInfos();
    },[]);
  
   

    useEffect(() => {

        getDatas();

      },[allmessages!== null]);


    async function getDatas()
    {
            const token = sessionstorage.getItem("token");
            const customer_id = sessionstorage.getItem("customerId");

            // get all messages where msg_type = "I"

            await axios.get(Url+'getmessages', { headers: { Authorization: `Bearer ${token}`,'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'get' } ,params:{customer_id: customer_id} })
            .then(response => {
                // If request is good...
                console.log("inbox",response.data.outbox.data);
              
                setAlmessages(response.data.outbox.data);
                setLength(response.data.outbox.data.length);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error ' + error);
            });

    }


    var clicks = 1;
    function onTapFun(){
      clicks+=1;
      console.log('taped succesfuly')
     //  document.getElementsByClassName('pro-sidebar')
    //  alert();
     const cursor = document.querySelector('.pro-sidebar');
     const body = document.querySelector('.body-two')

     if(window.innerWidth<=850){

        if(clicks==clicks+1){
       body.setAttribute("style",'max-width: 100vw;');
 
       cursor.setAttribute("style", 'display:none;max-width:10px;');}
       else{
        cursor.setAttribute("style", 'display:block;max-width: 100%;');
        body.setAttribute("style",'max-width:100vw-20.5vw;')
  
      }}
      else{
        if(clicks%2==0){
            body.setAttribute("style",'max-width: 100vw;');
      
            cursor.setAttribute("style", 'display:none;max-width:10px;');}
            else{
             cursor.setAttribute("style", 'display:block;max-width: 100%;');
             body.setAttribute("style",'max-width:100vw-20.5vw;')
       
           }
      }
 
    }
  return (
      <>      
      
    <div>

   
      


<Container className='body-two'>




<div className='image-sectioning-two'>
      
      <div className='profileBefore-two' >
              <img src={customerInfo === undefined ?picture :(imgUrl+customerInfo.cover_photo)} alt="Avatar" className='cover-img-dash-image' />
             
          </div> 
  
  
          <div className='row-flex-align-two'>
  
              <div className='profileInner'>
                <img className='cover-img-dash' src={customerInfo === undefined ?picture :(imgUrl+customerInfo.photo)} alt="profile"
                //  style={{objectFit:'contain'}}
                 />
                
              </div>
             
  
  
            <div className='header-banner-two'>
            <div className='background-color-text'>
          <AiOutlineBars color='black' className='bsFillKanbanFill' onClick={()=>onTapFun()}/>
  <div className='icon-tab-block'>
          <FaArrowDown color='black' className='icon-tab'/>

          <p className='header-banner-text'>InBox</p>
          </div>
          </div>
            </div>
            </div>
            <div className='button-background-req'></div>
            
  
          </div>
                
            
            
          <div className='view-msg ' >

{loading?<div className='msg-align mb-5'><Shimmer><div className='msg-align mb-5'> <div >Loading...</div></div></Shimmer></div>:


  length >0 ?(
  
<>
<div className='msg-align mb-5'>

<Table striped bordered hover>
  <thead>
    <tr>
      <th className='bold-text'>Date</th>
      <th className='bold-text' >Message</th>
      {/* <th>From</th> */}
      <th className='bold-text'>Status</th>
    </tr>
  </thead>
  <tbody>
 
    {currentPosts.map((data, idx) => 

        data.msg_status === "NotRead" ? (
      <tr className='bold-text pointer'>
      <td onClick={() => msgView(data)}>{data.created_at !== null? dateFormat(data.created_at, "mmmm dS, yyyy"):""}</td>
      <td onClick={() => msgView(data)}>{data.msg_user}</td>
      {/* <td onClick={() => msgView(data)}>{data.msg_type === "A"?"Admin":""}</td> */}
      <td onClick={() => msgView(data)}>{data.msg_status}</td>
      <td>
      
  <RiDeleteBin6Line className='pointer' size={23} onClick={() => deleteMSg(data)}/>
  </td>
      </tr>
        ):(

          <tr className='pointer'>
      <td onClick={() => msgView(data)}>{data.created_at !== null? dateFormat(data.created_at, "mmmm dS, yyyy"):""}</td>
      <td onClick={() => msgView(data)}>{data.msg_user}</td>
      {/* <td onClick={() => msgView(data)}>{data.msg_type === "A"?"Admin":""}</td> */}
      <td onClick={() => msgView(data)}>{data.msg_status}</td>
      <td><RiDeleteBin6Line className='pointer' size={23} onClick={() => deleteMSg(data)}/></td>
      </tr>

        )
      
    )}
  </tbody>
</Table>
<Pagination postsPerPage={postsPerPage} totalPosts={allmessages.length} paginate={paginate}/>
</div>
</>
 
  ) :(<><div className='text-center align-div'> <p className='error-card '>No Messages</p></div></>)}
  
        </div>


        
                        <Footer/>
        </Container>
        <ToastContainer position='top-center' style={{marginTop:'50vh'}}/>
    </div>
    </>

    );

    function msgView(data)
    {
      sessionstorage.setItem("msgview",JSON.stringify(data));


      let formdata = new FormData();
     formdata.append("message_id",data.msg_id);

     console.log(formdata);
    
     const token = sessionstorage.getItem("token");

     const headers ={
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }

        axios({
        method: 'post',
        url: Url+'messagereadstatus',
        data: formdata,
        headers: headers
        })
        .then(function (response) {
            //handle success
            // console.log("success");
            console.log(response.data);
            if(response.data === "Message Read")
            {
              history.push('/message/msgView');
              // history.go(0);
            }
            
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });

    }


    function deleteMSg(data)
    {
      let formdata = new FormData();
     formdata.append("message_id",data.msg_id);

     console.log(formdata);
    
     const token = sessionstorage.getItem("token");

     const headers ={
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }

        axios({
        method: 'post',
        url: Url+'deleteMessage',
        data: formdata,
        headers: headers
        })
        .then(function (response) {
            //handle success
            // console.log("success");
            console.log(response.data);
           if(response.data === "Message deleted")
           {
             history.go(0);
           }
            
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });



    }
    

    function replay(data)
    {
       
      var msg = document.getElementById('message').value;
      const token = sessionstorage.getItem("token");
      const customer_id = sessionstorage.getItem("customerId");

      var formdata = new FormData();

      


      formdata.append("customer_id",customer_id);
      formdata.append("order_id",0);
      formdata.append("message",msg);
      formdata.append("msg_parentmsg",data.msg_id);
      formdata.append("msg_type","R");


      const headers ={
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
      }

      axios({
      method: 'post',
      url: Url+'Message',
      data:formdata,
      headers: headers
      })
      .then(function (response) {
                  //handle success
          console.log(response.data);
          toast.success("Message Send !! ",{autoClose:2000});
          setTimeout(() => history.push('/dashboard'),2000);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
 

              
  
    }

}
