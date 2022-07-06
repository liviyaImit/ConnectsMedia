import React,{useEffect} from "react";
import { ElementsConsumer, CardElement ,useElements,useStripe ,PaymentElement,CardNumberElement} from "@stripe/react-stripe-js";
import axios from 'axios';
import { Container,Spinner } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory,Link} from "react-router-dom";
import { Url,isLoggin } from "../GLOBAL/global";

var sessionstorage = require('sessionstorage');

export default function CheckoutForm(props)
{

  const [customerInfo,setCustomerInfo] = React.useState({});
  const subId = sessionstorage.getItem("subId");
   const amount =  sessionstorage.getItem("amount");
    const orderId =  sessionstorage.getItem("orderId");
  let history = useHistory();
const stripe = useStripe();
const elements = useElements();
const [spinner,setSpinner] = React.useState(false);

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
      getUserInfo();

    },[]);
 
    async function getUserInfo()
    {
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


const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#303238",
        fontSize: "16px",
        fontFamily: "sans-serif",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF"
        }
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238"
        }
      }
    }
  };

  const billingDetails =
  {
      name:customerInfo.cust_name,
      email:customerInfo.cust_email,
      address:{
          city:customerInfo.cust_address
      }
  }


    const handleSubmit = async (e) =>
    {

        e.preventDefault();

        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: billingDetails
        }) 
       
        const customer_id = sessionstorage.getItem("customerId");

    if(!error)
    {
      setSpinner(true);
      // toast.warning("payment initiated .!",{autoClose:2500});
        try{

          let amt = amount*100;
            const {id} = paymentMethod 
            const res = await axios.post(Url+"donate",{
                currency: 'usd',
                amount:amt,
                id,
               cust_id:customer_id?customer_id:customerInfo.cust_id,
               stripeToken: paymentMethod.id,
               subscription:"onetime"
            })

            console.log("res",res);


            if(res.data.actionRequired)
            {

              const { paymentIntent, error } = await stripe.confirmCardPayment(
                res.data.clientSecret
              );

              if (error){
                alert("Error in payment, please try again later");
                props.onClose();
                return;
              }

              console.log("payment Inten",paymentIntent)

              if (paymentIntent.status === "succeeded")
              {
                  const token = sessionstorage.getItem("token");

                  const headers ={
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${token}`,
                      
                  }
          
                  var data = new FormData();
                  console.log(subId)
                  data.append("suborder_id",subId);
                  data.append("order_id",orderId);
                  data.append("amount",amount);
                      
                    
          
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
                                  data1.append("stripe_id",paymentIntent.id);
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
                                          
                                          window.location.reload();
                                          //history.push('/success');
                                      })
                                      .cat
                                      (function (response) {
                                          //handle error
                                          console.log(response);
                                      });   
          
                          })
                          .catch(function (response) {
                              //handle error
                              console.log(response);
                          });
              }
                // return alert(`Payment successful, payment ID - ${res.data.id}`);
              // const res2 = await axios.post(Url+'checkAmount',{
              //   id:res.data.id
              // });
              // alert(`Payment successful, payment ID - ${res.data.id}`);zzzzzz
            } 
            else {
              // Simple HTTP Payment was successful
              alert(`Payment successful, payment ID - ${res.data.id}`);
            }
            
        }
        catch(error)
        {
            console.log("error",error.message)
        }
    }

    else
    {
        console.log("error1",error)
    }
}

  
    return (
      // 
       <>
       

       <Container className='body-two-one'>
                <form onSubmit={handleSubmit}>
                  
                  <CardElement options={CARD_ELEMENT_OPTIONS} visibility={true} disabled={false}/>
                  <div className="space-between mt-5">
                    <button  className="px-5" id="paynow-submit">
                      Submit
                    </button>
                    
                  </div>
                  {spinner && <Spinner animation="border"  role="status" style={{marginLeft:'53%',top:'-3rem',position:'relative'}}/> } 
              
                </form>

            </Container> 

             <div id="iframecont"></div>

   
            <ToastContainer position="top-center" style={{marginTop:'50vh'}}/>
         
      {/* //  */}
      </>
    );
  

   
}

