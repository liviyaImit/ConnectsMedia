import React from 'react'
import { useParams } from "react-router-dom";
import { Container,Row,Col,Card,Button,Spinner } from 'react-bootstrap';
import '../../style/order.scss'
import { Url,imgUrl,isLoggin } from '../../GLOBAL/global';
import axios from 'axios';
import { useHistory,Link} from "react-router-dom";
import dateFormat from 'dateformat';
import Parallax from 'react-rellax';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {AiOutlineClose,AiOutlineBars} from 'react-icons/ai';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../CheckoutForm';

var sessionstorage = require('sessionstorage');

export default function EachRequest() {

    const stripePromise = loadStripe("pk_live_51KlNyrDp5HAOMMnMOfq5yKAHtb3WHJZyNLO6YK1so2QeT7gkDdqmHh15HH9A9UDdzMLTjdIyWQxFWTKz4QhWZHV800AA2sYk40");
    const [frame,setFrame] = React.useState(false);
    const pkgData =  JSON.parse(sessionstorage.getItem("pendPkg"))
    console.log("pkgdata",pkgData)

    const[payBtn,setPayBtn] =React.useState(false);
    const [subOrder,setSubOrder] = React.useState([]);
    const [subId,setSubId] = React.useState();
    const [Order,setOrder] =React.useState({});
    const [spinner,setSpinner] = React.useState(false);
    const [pkgReject,setPkgReject] = React.useState(false);
    const [condition ,setCondition] = React.useState(false);
    const [rejectbtn,setrejectbtn] = React.useState(false);

    let history = useHistory();

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

    var clicks = 1;
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
    <Container className='body-two'>
                    <div className='padding-7rem'>
      
                                   

                                        <div className='vertical-text-pkg-two '>
                                        <AiOutlineBars size={20} color='black' className='bsFillKanbanFill2 pointer cover-camera3' onClick={()=>onTapFun()}/>
                                            <p>{pkgData.pack.packages_type === "STD" ? "STANDRAD ":"CUSTOMIZED "}<span className='warning'>PACKAGE</span></p>
                                        </div>




                                        <div className=' '>
                                            <div className=' '>
                                                <h2>{pkgData.pack.packages_type === "STD" ? "STANDRAD ":"CUSTOMIZED "}<span className='warning'>PACKAGE</span></h2>
                                                <p className='font-12'><span >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </span></p>
                                            </div>

                                            <div className='order-view-box'>
                                            <div className='package-details-content-section'>
                                                <p className='heading bold-text py-3'>Package Details</p>

                                                <p>Package Cost : <span className='bold-text'>${pkgData.pack.packages_cost}.00 /month</span></p>
                                                <p>Selected Months : <span className='bold-text'>{pkgData.pack.months}</span></p>
                                                {pkgData.pack.drive_id ? (<p>Drive Id : <a href={pkgData.pack.drive_id} target="_blank" rel="noreferrer">click here</a></p>):(<></>)} 
                                            

                                            </div>

                                            

                                            <div className='package-details-content-section'>

                                                                                        
                                                <p className='heading bold-text py-3'>{pkgData.spec.length === 0 ? '':"Specifications"}</p>

                                                {
                                                    pkgData.spec &&
                                                pkgData.spec.map((p,id)  =>
                                                    <div className=''>
                                                        <p>{p.pspec_text}</p>
                                                        <p>{p.pspec_ans}</p>

                                                    </div>
                                                )}

                                                {/* <Button variant="light" className='px-5 ' onClick={()=>sent()}>Message</Button>  */}



                                            </div>
                                            
                                            </div>
                                               

                                        </div>


                                        <div >
                                       
                                                
                                            {Order.order_status === "PP" ? (<></>) :(
                                                
                                                <div className='space-between py-5'>

                                                    {<Button variant="light" className="px-5" style={{fontSize:'20px',fontWeight:'bold'}} onClick={()=>accept()}  >Accept</Button>}
                                                        
                                                    
                                                    
                                                    {(!spinner === false) && <Spinner animation="border" style={{marginLeft:'-21rem',color:'black'}}></Spinner>}

                                                    { <Button variant="light" style={{fontSize:'20px',fontWeight:'bold'}} className="px-5" onClick={()=>reason()}>Reject</Button>}

                                                
                                                
                                                    
                                                </div>
                                                
                                            )} 

                                                {pkgReject &&( 
                                                    <div className='space-between reject-pkg'><select id="reason" className='select-months' onChange={()=>reject()}>
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

                                    <Container className='padding-8rem '>
                                        {payBtn && Order.order_status === "PP"? 
                                        (<>
                                                {subOrder &&
                                            <table className="table table-striped table-light">
                                                        <thead class="thead-dark">
                                                            <tr>
                                                                <th scope="col">Bill Id</th>
                                                                <th scope="col">Bill Date</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col"></th>   
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            { subOrder.map((s,id) =>(
                                            
                                                         <tr className='pointer'>
                                                                    <td >{s.sorder_id}</td>
                                                                    <td >{dateFormat(s.sorder_billdt, "mmmm dS, yyyy")}</td>
                                                                    <td >{s.sorder_status === "Invoiced" ? (<span className='bold-text green'>{s.sorder_status}</span>):(<span className='bold-text'>{s.sorder_status}</span>)}</td>
                                                                    <td>{s.sorder_status === "Invoiced"? (<><Button variant="light "  className='mx-2' onClick={()=>paynow(s.sorder_id,pkgData.pack.packages_cost,Order.order_id)}>Pay Now</Button></>):(<></>)}</td>
                                                                </tr>
                                                          
                                                ))
                                            }
                                               </tbody>
                                            </table>
                                        }
                                        </>):(<></>)}

                                        </Container>   

                                  
                                


                                {frame === true &&

                                    confirmAlert({

                                        customUI: ({onClose}) => {
                                            return (
                                                <div className="payment ">

                                                    <AiOutlineClose className='Ai-close pointer' onClick={()=>onClose()} size={28}/>

                                                <Elements stripe={stripePromise} >
                                                    <CheckoutForm  visibility={true}/>
                                                </Elements>


                                        </div>
                                            
                                            );
                                            
                                        }
                                    })

                                    }
                      
                
                                <ToastContainer position='top-center' style={{marginTop:'50vh'}}/>
                    </div>
                    </Container>
  )

  function accept()
  {

    setSpinner(true)
    setPkgReject(false);
    const token = sessionstorage.getItem("token");
    const customer_id =  sessionstorage.getItem("customerId");

    const headers ={
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'POST'
      }

            let data = new FormData();

            data.append("package_id",pkgData.pack.packages_id);
            data.append("customer_id",customer_id);
            data.append("cost",pkgData.pack.packages_cost);
            data.append("months",pkgData.pack.months)
            data.append("status","S");
            data.append("reason","accepted");
            console.log("accept")
            axios({
                method: 'post',
                url: Url+'packageorder',
                data: data,
                headers: headers
                })
                .then(function (response) {
                    //handle success
                    console.log("response",response.data); 
                    

                    if(response.data.message === "Mail Send Successfully." )
                    {
                        console.log("gello")
                        let data1 = new FormData();
                        data1.append("customer_id",customer_id);
                        data1.append("item_id",pkgData.pack.packages_id);
                        data1.append("item","PACKAGE")
                       

                        axios({
                        method: 'post',
                        url: Url+'getorderbyidapi',
                        data: data1,
                        headers: headers
                        })
                        .then(function (response) {
                            //handle success
                            setSpinner(false);
                            toast.success("Order Accepted .!!",{autoClose:2000})
                            
                            console.log("pkg /event order",response.data.order); 
                            setSubOrder(response.data.suborder);
                            setOrder(response.data.order);

                            
                            
                            setPayBtn(true);
                            // setTimeout(()=>history.go(0),2000);
                        })
                        .catch(function (response) {
                            //handle error
                            console.log(response);
                        });

                    }

                    
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    setPayBtn(true);
                });
  }

  function reason()
  {
    // setSpinner(true);
    setPkgReject(true);
    setrejectbtn(true)
  }

  function reject()
  {
    setSpinner(true);
    console.log("select")
    // var r = reason();


    const token = sessionstorage.getItem("token");
    const customer_id =  sessionstorage.getItem("customerId");

    var e = document.getElementById("reason");
    
    var reason = e.options[e.selectedIndex].value;

    var reText = document.getElementById("reason-text").value;
    console.log("reason1",reText);

    console.log("reason2",reason);

    if(reason === "" && reText === " ")
    {
        console.log("not");
        toast.error('Select any reason !!',{autoClose:3000});
    }
    else
    {
        const headers ={
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'POST'
        }
    
                let data = new FormData();
                data.append("package_id",pkgData.pack.packages_id);
                data.append("customer_id",customer_id);
                data.append("cost",pkgData.pack.packages_cost);
                data.append("status","R");
                data.append("reason",reason===""?reText:reason);
    
    
                axios({
                    method: 'post',
                    url: Url+'packageorder',
                    data: data,
                    headers: headers
                    })
                    .then(function (response) {
                        //handle success
                        setSpinner(false);
                        console.log("response",response); 
                        toast.success('order Rejected !!',{autoClose:3000})
                        setTimeout(() => history.push('/dashboard'),3000) ;
                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                        toast.success('order Rejected !!',{autoClose:3000})
                        setTimeout(() => history.push('/dashboard'),3000) ;
                    });
    
    }
   

    
  }

  function paynow(subId,cost,orderid)
    {
        setSubId(subId);
        console.log("clicked")
        setFrame(true);
        sessionstorage.setItem("subId",subId);
        sessionstorage.setItem("amount",cost);
        sessionstorage.setItem("orderId",orderid);
        
        // console.log("payment")
        // history.push('/payment-form');
        // history.go(0);
    }

    
}
