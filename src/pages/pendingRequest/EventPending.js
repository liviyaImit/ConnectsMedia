import React from 'react'
import { useParams } from "react-router-dom";
import { Container,Row,Col,Card,Button,Spinner } from 'react-bootstrap';
import '../../style/order.scss'
import { Url,imgUrl,notImage,isLoggin } from '../../GLOBAL/global';
import axios from 'axios';
import { useHistory,Link} from "react-router-dom";
import Parallax from 'react-rellax';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {AiOutlineClose} from 'react-icons/ai'; 
import dateFormat from 'dateformat';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../CheckoutForm';
import '../../style/eventsblock.scss'
var sessionstorage = require('sessionstorage');


export default function EventPending() {

    const eventList = JSON.parse(sessionstorage.getItem("RequestEvent"))
    console.log("process evnt session",eventList);

    let history = useHistory();
    
    const [paybtn,setPayBtn] = React.useState(false);
    const [pkgReject,setPkgReject] = React.useState(false);
    const [subOrder,setSubOrder] = React.useState([]);
    const [Order,setOrder] =React.useState({});
    const [subId,setSubId] = React.useState();
    const [rejectbtn,setrejectbtn] = React.useState(false);
    const [spinner,setSpinner] = React.useState(false);

    const [frame,setFrame] = React.useState(false);

    const stripePromise = loadStripe("pk_live_51KlNyrDp5HAOMMnMOfq5yKAHtb3WHJZyNLO6YK1so2QeT7gkDdqmHh15HH9A9UDdzMLTjdIyWQxFWTKz4QhWZHV800AA2sYk40");


    async function logginornot()
    {
      const cust =  await isLoggin();
      console.log("cust",cust);
      if(cust === null)
      {
        history.push('/login');
      }
      
  
    }
  
    React.useEffect(() => {
  
      logginornot();
    },[]);


  return (
    <Container className='body-two'>
    <div className='event-pending'>
                                
                                <div className='content-align-for-event'>
                                    <div className='vertical-text'>
                                        <p>EVENTS</p>
                                    </div>

                                    <div className='mx-5 px-2'>
                                            <h2>STATIC<span className='warning'>POSTS</span></h2>
                                            <p className='font-12'><span >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </span></p>
                                    </div>
                                </div> 


                                <div className='second_section_2 '>

                                        

                                        <hr></hr>

                                        <div className='camp-400'>
                                            
                                            
                                            <img src={eventList.photo === (undefined || null) ?notImage :imgUrl+eventList.photo} alt={eventList.order_id} width='50%'  style={{borderRadius:'20px',marginRight:'20px'}}  id="event_req_img"/>
                                            <div>
                                            <div className='font-12 content-end-two my-5'>
                                                <p> Tittle : <span >{eventList.event_title}</span></p>

                                                <p>Cost : <span className='bold-text' >${eventList.event_cost}.00  </span></p>

                                                <p>From Date : {dateFormat(eventList.event_from, "mmmm dS, yyyy") }</p>
                                                <p> To Date &nbsp; &nbsp; &nbsp;: {dateFormat(eventList.event_to, "mmmm dS, yyyy")}</p>

                                                <p className='underline'> Description </p>
                                            
                                                <p>Status : <span className='bold-text green'>{eventList.event_status} </span></p>

                                            </div>
                                            

                                                <div className=' space-between-two-btn mt-5' >
                                                    {paybtn || eventList.event_status === "Accepted" ? (<> 
                                                        </>):
                                                        ( eventList.event_status === 'Success' ? '' : (
                                                        <>
                                                            {!pkgReject && <Button variant="light" style={{fontSize:'20px',fontWeight:'bold'}}  onClick={()=>accept()}>Accept</Button>}


                                                            {!rejectbtn && <Button variant="light"style={{fontSize:'20px',fontWeight:'bold',marginLeft:'1rem'}}  onClick={()=>reason()}>Reject</Button>}
                                                            <div style={{width:"20px"}}></div>
                                                            {(!spinner === false) && <Spinner animation="border" style={{color:'black'}}></Spinner>}

                                                        </>
                                                        ))
                                                    }
                                                        

                                                        {pkgReject &&( <div className='space-between'><select id="reason" className='select-months' onChange={()=>reject()}>
                                                        <option value="">Select Reason</option>
                                                        <option value="Not Intrested">Not Intrested</option>
                                                        <option value="Need to Add/Remove features">Need to Add/Remove features</option>
                                                        <option value="Change of mind">Change of mind</option>
                                                        <option value="Decided for alternative product">Decided for alternative product</option>
                                                        </select>&nbsp;&nbsp;

                                                        <label> OR </label>
                                                        <textarea type="text" id="reason-text" rows={5} className='msg-text mx-3 px-2' placeholder=' type your reject reason' ></textarea> 
                                                        <button onClick={() => reject()}>Submit</button>
                                                        </div>)
                                                        
                                                    }
                                                
                                                </div>
                                           
                                                </div>


                                        </div>


                                </div>

                               

                                

                                <div className='extraRowSpace'>
                                </div>

                                    

                                {(paybtn || eventList.event_status === "Accepted") && 

                                <Container className="" >
                                 
                                    <div className=''>
                                         {subOrder && 
                                        <table className="table table-striped table-light  ">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th scope="col">Bill Id</th>
                                                    <th scope="col">Bill Date</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col"></th>   
                                                </tr>
                                                </thead>
                                                    <tbody>
                                                       
                                                    {subOrder.map((s,id) =>(
                                                                <tr>
                                                                    <td >{s.sorder_id}</td>
                                                                    <td >{dateFormat(s.sorder_billdt, "mmmm dS, yyyy")}</td>
                                                                    <td >{s.sorder_status === "Invoiced" ? (<span className='bold-text green'>{s.sorder_status}</span>):(<span className='bold-text'>{s.sorder_status}</span>)}</td>
                                                                    <td>{s.sorder_status === "Invoiced"? (<><Button variant="light "  className='mx-2' onClick={()=>paynow(s.sorder_id,eventList.event_cost ,Order.order_id)}>Pay Now</Button></>):(<></>)}</td>
                                                                </tr>
                                                          
                                                       
                                                          ))}                    
                                                    </tbody>
                                                </table>
                                            }

                                       
                                    </div>
                                </Container>  
                                }
                                   

                                   {frame === true &&

                                        confirmAlert({

                                            customUI: ({onClose}) => {
                                                return (
                                                    <div className="payment ">

                                                        <AiOutlineClose className='Ai-close pointer' onClick={()=>onClose()} size={35}/>

                                                    <Elements stripe={stripePromise} >
                                                        <CheckoutForm visibility={true} />
                                                    </Elements>


                                            </div>
                                                
                                                );
                                                
                                            }
                                        })

                                    }

                                   

                            </div>
                            </Container>

  )

  function accept()
  {
    setSpinner(true);
    setrejectbtn(false);
    const token = sessionstorage.getItem("token");
    const customer_id =  sessionstorage.getItem("customerId");

    const headers ={
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        
    }

    
    
            var data = new FormData();
            data.append("event_id",eventList.event_id);
            data.append("customer_id",customer_id);
            data.append("cost",eventList.event_cost );
            data.append("status","S");
            data.append("reason","accepted");

            axios({
                method: 'post',
                url: Url+'eventorder',
                data: data,
                headers: headers
                })
                .then(function (response) {
                    //handle success
                    console.log("response",response); 
                    // history.go(0);
                    
                    let data1 = new FormData();
                        data1.append("customer_id",customer_id);
                        data1.append("item_id",eventList.event_id);
                        data1.append("item","EVENT");

                      

                    axios({
                        method: 'post',
                        url: Url+'getorderbyidapi',
                        data: data1,
                        headers: headers
                        })
                        .then(function (response) {
                            //handle success
                            setSpinner(false);
                            toast.success("request Accepted !!",{autoClose:2000})
                            console.log("pkg /event order",response.data); 
                            setSubOrder(response.data.suborder);
                            setOrder(response.data.order);
                            setPayBtn(true);
                            // history.go(0);
                           
                        })
                        .catch(function (response) {
                            //handle error
                            console.log(response);
                        });

                    
                    
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    // toast.success('Order Created !!',{autoClose:3000});
                    // setTimeout(() => history.push('/orders'),3000);
                    setPayBtn(true);
                });

  }

  function reason()
  {
    setPkgReject(true);
    setrejectbtn(true);
  }

  function reject()
  {
    console.log("select")
    // var r = reason();

    const token = sessionstorage.getItem("token");
    const customer_id =  sessionstorage.getItem("customerId");

    var e = document.getElementById("reason");
    console.log("reason1",e);
    var reason = e.options[e.selectedIndex].value;

    console.log("reason2",reason);

   

    const headers ={
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'POST'
    }

    let data = new FormData();
        data.append("package_id",eventList.event_id);
            data.append("customer_id",customer_id);
            data.append("cost",eventList.event_cost);
            data.append("status","R");
            data.append("reason",reason);


            axios({
                method: 'post',
                url: Url+'packageorder',
                data: data,
                headers: headers
                })
                .then(function (response) {
                    //handle success
                    // setSpinner(false);
                    console.log("response",response); 
                    toast.success('order Rejected !!')
                     history.push('/dashboard');
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    toast.success('order Rejected !!')
                    history.push('/dashboard');
                });

  }

  function paynow(subId,cost,orderid)
    {
        setSubId(subId);
        console.log("clicked")
        sessionstorage.setItem("subId",subId);
        sessionstorage.setItem("amount",cost);
        sessionstorage.setItem("orderId",orderid);
        setFrame(true);

        // console.log("payment")
        // history.push('/payment-form');
        // history.go(0)
    }
}
