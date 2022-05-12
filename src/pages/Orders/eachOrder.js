
import React from 'react';
import { Container,Row,Col,Card,Button,Modal } from 'react-bootstrap';
import '../../style/order.scss'
import { Url,notImage,isLoggin,imgUrl } from '../../GLOBAL/global';
import axios from 'axios';
import { useHistory,Link} from "react-router-dom";
import dateFormat from 'dateformat';
import Parallax from 'react-rellax'
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

var sessionstorage = require('sessionstorage');

export default  function EachOrder() {
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

   

    const [subOrder,setSubOrder] = React.useState([]);
    const [Order,setOrder] =React.useState({});
    const [frame,setFrame] = React.useState(false);
    const [subId,setSubId] = React.useState();
    // const[type,setType] = React.useState('');
    // const[orderId,setOrderId] = React.useState();
    const [modelmsg,setmodelmsg] = React.useState(false);
   

    // const[order,setorderDet] = React.useState({});

    const type =  sessionstorage.getItem("orderType");
    const order =  JSON.parse(sessionstorage.getItem("orderID"))

    console.log("oId", JSON.parse(sessionstorage.getItem("orderID")) , "type",type)
    

    React.useEffect( ()=>
    {
      
        getOrders();
      

    },[]);

    

    // async function getOrderDet()
    //     {
    //         const token = sessionstorage.getItem("token");
    //         const customer_id =  sessionstorage.getItem("customerId");
    
    //         var data = new FormData();
    //         data.append("customer_id",customer_id);
    //         data.append("order_id",orderId);
            
    
    //         const headers ={
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `Bearer ${token}`,
                
    //           }
    
    //         await axios({
    //             method: 'post',
    //             url: Url+'getorderid',
    //             data: data,
    //             headers: headers
    //             })
    //             .then(function (response) {
    //                 //handle success
    //                 console.log("res",response.data); 
    //                 setorderDet(response.data);
    //                 console.log("order details",order); 
                   
    //             })
    //             .catch(function (response) {
    //                 //handle error
    //                 console.log(response);
    //             });
    
    //     };
        
       
    
    async function getOrders()
      {
        const token = sessionstorage.getItem("token");
        const customer_id =  sessionstorage.getItem("customerId");

        var data = new FormData();
        data.append("customer_id",customer_id);
        data.append("item_id",order.order.order_itemid);
        data.append("item",order.order.order_item)

        const headers ={
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'POST'
          }

        await axios({
            method: 'post',
            url: Url+'getorderbyid',
            data: data,
            headers: headers
            })
            .then(function (response) {
                //handle success
                console.log("pkg /event order",response.data); 
                setSubOrder(response.data.suborder);
                setOrder(response.data.order);
                // console.log("sss",response.data.suborder)
               
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

      }
    

  return (
  
    <div>


                            { type === "camp" || type ==="event"  ? (

                                <>
                                
                                
                                    <div className='vertical-text '>
                                        <p>{type === "event" ?"EVENTS":""}</p>
                                    </div>

                                    <div className='vertical-text camp-text'>
                                        <p>{type === "camp" ?"CAMPAIGN":""}</p>
                                    </div>

                                    <div className='second_section'>

                                        <div className=''>
                                            <h2>{order.plan[0].camp_type === "MPOST"?"MILLION ":"STATIC "}<span className='warning'>POSTS</span></h2>
                                            <p className='font-12'><span >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </span></p>
                                        </div>


                                        <div className='space-between'>
                                            <img src={order.plan[0].photo === (undefined || null) ?notImage :imgUrl+order.plan[0].photo} alt={order.plan[0].order_id} width='250px' height='600px' style={{height:'500px',width:'420px',borderRadius:'20px'}} className='mt-5 mx-5'/>

                                            <div className='font-12 content-end'>
                                                <p> Tittle : <span >{order.plan[0].camp_title?order.plan[0].camp_title:order.plan[0].event_title }</span></p>

                                                <p>Cost : <span >${order.order.order_amt}{''} </span></p>

                                                <p>Date : <span >{dateFormat(order.plan[0].event_from, "mmmm dS, yyyy")+"  -  "+dateFormat(order.plan[0].event_to, "mmmm dS, yyyy")} </span></p>

                                                <p className='underline'> Description </p>
                                            
                                                <p style={{marginTop:'-1rem;',width:'60%'}}><span>{order.plan[0].camp_desc?order.plan[0].camp_desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. "} </span></p>
                                                
                                                <Button variant="light" className='px-5 ' style={{width:'50%'}} onClick={()=>sent()}>Message</Button>

                                            </div>



                                        </div>




                                    </div>

                                    <div>

                                    {subOrder.length !==0 ? <Container className='event-suborder'>
                                        <table className="table table-striped table-light my-5 ">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th scope="col">Bill Id</th>
                                                        <th scope="col">Bill Date</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col"></th>   
                                                    </tr>
                                                </thead>
                                                <tbody>
                                    {subOrder && subOrder.map((s,id) =>(
                                        
                                                        
                                                            <>
                                                                <tr>
                                                                    <td >{s.sorder_id}</td>
                                                                    <td >{s.sorder_billdt}</td>
                                                                    <td >{s.sorder_status === "Invoiced" ? (<span className='bold-text green'>{s.sorder_status}</span>):(<span className='bold-text'>{s.sorder_status}</span>)}</td>
                                                                    <td>{s.sorder_status === "Invoiced"? (<><Button variant="light "  className='mx-2' onClick={()=>paynow(s.sorder_id,order.order.order_amt,order.order.order_id)}>pay Now</Button></>):(<></>)}</td>
                                                                </tr>
                                                            </>
                                                        
                                                                        
                                                
                                        ))
                                    }
                                    </tbody>
                                        </table>
                                        </Container>:(<></>)}
                                    </div>

                                    
                                </>

                                )
                                    : 
                                    (
                                        type==="pkg" ? (
                                      <div className='padding-7rem'>  
                                     <>
                                   
                                      
                                        <div className='vertical-text-pkg '>
                                            <p>PACKAGE</p>
                                        </div>


                                        <div className='sec-pkg-section '>


                                            <div className=' '>
                                                <h2>{order.PACKAGE.packages_type === "STD" ? "STANDRAD ":"CUSTOMIZED "}<span className='warning'>PACKAGE</span></h2>
                                                <p className='font-12'><span >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </span></p>
                                            </div>

                                            <p className='heading bold-text py-3'>Package Details</p>

                                            <p>Package Cost : <span className='bold-text'>{order.PACKAGE.packages_cost}</span></p>
                                            <p>Selected Months : <span className='bold-text'>{order.PACKAGE.months}</span></p>
                                            <p>Drive Id : <a href={order.order.drive_id} target="_blank" rel="noreferrer">click here</a></p>
                                           



                                            
                                            <p className='heading bold-text py-3'>{order.PACKAGE_details.length ===0 ? "":"Specifications"}</p>

                                            {order.PACKAGE_details && order.PACKAGE_details.map((d,id) =>

                                                    <>
                                                

                                                <div className=''>
                                                    <p>{d.pspec_text}</p>
                                                    <p>{d.pspec_ans}</p>

                                                </div>
                                                </>
                                            
                                            )}


                                            <p className='heading bold-text py-3'>{ order.Question.length === 0 ? "" :"Questionnaire"}</p>

                                           
                                            { order.Question && order.Question.map((d,id) =>
                                          
                                           
                                            <>
                                            
                                            <Row >
                                                <Col xxl={6} xl={6} md={6} sm={6} > 
                                                    <p>{d.pspec_text}</p>
                                                </Col>

                                                <Col xxl={6} xl={6} md={6} sm={6}> 
                                                    <p className='text-end'>{d.pspec_ans}</p> 
                                                </Col>
                                                <hr></hr>
                                            </Row>
                                            </>

                                            
                                            )}


                                            <Button variant="light" className='px-5 ' onClick={()=>sent()}>Message</Button> 
                                           
                                            

                                        </div>

                                      
                                                    
                                    {subOrder.length !== 0 ? (<div className='suborder'>
                                       
                                              <Container className='padding-8rem '>
                                            <table className="table table-striped table-light mt-5 ">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th scope="col">Bill Id</th>
                                                        <th scope="col">Bill Date</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col"></th>   
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {subOrder && subOrder.map((s,id) =>( 
                                                           
                                                                <tr>
                                                                    <td >{s.sorder_id}</td>
                                                                    <td >{s.sorder_billdt}</td>
                                                                    <td >{s.sorder_status === "Invoiced" ? (<span className='bold-text green'>{s.sorder_status}</span>):(<span className='bold-text'>{s.sorder_status}</span>)}</td>
                                                                    <td>{s.sorder_status === "Invoiced"? (<><Button variant="light "  className='mx-2' onClick={()=>paynow(s.sorder_id,order.PACKAGE.packages_cost,order.order.order_id)}>pay Now</Button></>):(<></>)}</td>
                                                                </tr>
                                                     ))
                                                    }       
                                                       
                                                                        
                                                </tbody>
                                        </table>
                                        </Container>
                                        
                                    </div>):(<></>)}


                                        
                                        </> </div> ):(<></>)
                                       
                                    )
                              
                            }
                           


                        
                           {modelmsg === true &&

                                confirmAlert({

                                    customUI: ({onClose}) => {
                                        return (
                                        <div className='custom-ui'>
                                            <h1> Message</h1>
                                        
                                            <textarea placeholder='Type your message..' id="message" className='msg-text' rows={4} required={true} ></textarea>

                                            <button onClick={()=>onClose()}>Close</button>
                                            <button className='mx-2' onClick={() => sentmessage()}> Sent </button>
                                            
                                        </div>
                                        
                                        );
                                        
                                    }
                                })

                            }
                
         
     

        <ToastContainer position='top-center' style={{marginTop:'50vh'}}/>

    
</div>
  );

  function onClose()
  {
      console.log("hello")
      setmodelmsg(false);
  }

    function sent()
    {
        console.log("message box clicked")
        setmodelmsg(true);
    }

    

    function paynow(subId,cost,orderid)
    {
         setSubId(subId);
        // console.log("clicked")
        // setFrame(true);
        sessionstorage.setItem("subId",subId);
        sessionstorage.setItem("amount",cost);
        sessionstorage.setItem("orderId",orderid);
        console.log("payment")
        history.push('/payment-form');
        history.go(0);
     
    }


    function sentmessage()
    {
        setmodelmsg(false)
        var msg = document.getElementById('message').value;
        console.log("msg",msg)

        if(msg)
        {
            const token = sessionstorage.getItem("token");
            const customer_id = sessionstorage.getItem("customerId");

            var formdata = new FormData();



            formdata.append("customer_id",customer_id);
            formdata.append("order_id",order.order.order_id);
            formdata.append("message",msg);
            formdata.append("msg_parentmsg",0);
            formdata.append("msg_type",'I');


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
                toast.success("Message Sent !!",{autoClose:3000})
                setmodelmsg(false);
               
                setTimeout(() => history.go(0),3000) 
                
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

        }
        else{
            toast.error("type any message !!",{autoClose:2000})
        }
       
    
        
    }



    function paySubmit()
    {


     
        const token = sessionstorage.getItem("token");

        const headers ={
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            
        }

        var data = new FormData();
        console.log(subId)
        data.append("suborder_id",subId);
        data.append("order_id",Order.order_id);
        data.append("amount",Order.order_amt);
            
           

            axios({
                method: 'post',
                url: Url+'paybefore',
                data: data,
                headers: headers
                })
                .then(function (response) {
                    //handle success
                    console.log("pay Before",response); 

                        var data1 = new FormData();
                        data1.append("transaction_id",response.data.id);
                        data1.append("order_id",response.data.txn_order);
                        data1.append("status","Success");
                        data1.append("suborder_id",response.data.txn_suborder);

                        axios({
                            method: 'post',
                            url: Url+'payafter',
                            data: data1,
                            headers: headers
                            })
                            .then(function (response) {
                                //handle success
                                console.log("pay After",response); 
            
                                toast.success('Payment Success!!',{autoClose:3000});
                                setTimeout(() => history.push('/orders'),3000);
                            })
                            .catch(function (response) {
                                //handle error
                                console.log(response);
                            
                            });

                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                   
                });
    

       
    }
    
}
