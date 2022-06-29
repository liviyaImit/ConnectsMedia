

import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { Form,Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ElementsConsumer, CardElement ,useElements,useStripe ,} from "@stripe/react-stripe-js";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Givenow from './Give';
import { useHistory } from 'react-router-dom';
import { Url } from '../../GLOBAL/global';

var sessionstorage = require('sessionstorage');


export default function Give() {
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    const [spinner,setSpinner] = React.useState(false);
    const [customerInfo,setCustomerInfo] = React.useState();
    const stripe = useStripe();
    const elements = useElements();
    const stripePromise = loadStripe("pk_live_51KlNyrDp5HAOMMnMOfq5yKAHtb3WHJZyNLO6YK1so2QeT7gkDdqmHh15HH9A9UDdzMLTjdIyWQxFWTKz4QhWZHV800AA2sYk40");
    //pk_test_51KlNyrDp5HAOMMnM7fJdwCrmBsB2cl3VvmnDSEAznm49NFAw6H5EJBMmOYbL5JekAKl1yRqqHVcKWMKl7TNlHMqy005EkIk2Fh 


    React.useEffect(() =>
    {
      getInfo();
    },[])


    async function getInfo()
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
    
    let history = useHistory();
    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "black",
            fontSize: "16px",
            fontFamily: "sans-serif",
            fontSmoothing: "antialiased",
            "::placeholder": {
              color: "black"
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

      async function onSubmit(formdata,e)
      {

        {console.log("customer",customerInfo.cust_id)}

          e.preventDefault();
          console.log(formdata)
  
          const billingDetails =
          {
              name:formdata.name,
              email:formdata.email,
             
          }
          
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
              let amt = formdata.amount *100;
              console.log("amt",amt);
                  const {id} = paymentMethod 
                  const res = await axios.post(Url+"donate",{
                      currency: 'usd',
                      amount:amt,
                      id,
                  cust_id: customer_id? customer_id:customerInfo.cust_id,
                  stripeToken: paymentMethod.id,
                  subscription:"onetime",
                  email:formdata.email
                  })
  
                  console.log("res",res);
  
  
                  if(res.data.actionRequired)
                  {
                    const { paymentIntent, error } = await stripe.confirmCardPayment(
                        res.data.clientSecret
                    );
  
  
  
                    console.log("payment Inten",paymentIntent)
    
                    if (error) 
                    {
                        toast.warning("Error in payment, please try again .");
                        
                    }
                    if (paymentIntent.status === "succeeded")
                    {
                      
  
                        //   alert(`Payment successful, payment ID - ${paymentIntent.id}`);
                        const headers ={
                            'Content-Type': 'multipart/form-data',
                            
                            
                        }
                
                        var data = new FormData();
                        
                        data.append("stripe_id",paymentIntent.id);
                        data.append("name",formdata.name);
                        data.append("email",formdata.email);
                        data.append("amount",formdata.amount);
                            
                        
                
                            axios({
                                method: 'post',
                                url: Url+'donation',
                                data: data,
                                headers: headers
                                })
                                .then(function (response) {
                                    //handle success
                                    console.log("after donation",response.data); 

                                   
                                    history.push('/success');
                                    // console.log("res2 checkout= ",res2);
                    
                                })
                                .catch(function (response) {
                                    //handle error
                                    console.log(response);
                                
                                });
                    
                         
              
                    }
                      // return alert(`Payment successful, payment ID - ${res.data.id}`);
                 
                //   history.push('/success');
                  // alert(`Payment successful, payment ID - ${res.data.id}`);
                  } 
                  else {
                  // Simple HTTP Payment was successful
                //   alert(`Payment successful, payment ID - ${res.data.id}`);
                    
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
    <div> 
      <Form onSubmit={handleSubmit(onSubmit)}>
                        
      <Row>
          <Col sm={12} md={12} xl={12} xxl={12}>  <input placeholder="Name" type="text" {...register("name" , { required: true })} className='textbox login-box'/> </Col>
          
      </Row>

      <Row>
          <Col sm={12} md={12} xl={12} xxl={12}>  <input placeholder="Email" type="email" {...register("email" , { required: true })} className='textbox login-box'/> </Col>
          
      </Row>



      <Row>
          <Col sm={12} md={12} xl={12} xxl={12}>  <input placeholder="Amount" type="number" {...register("amount" , { required: true })}  className='textbox login-box'/> </Col>
          
      </Row>
   
    

   
         <CardElement options={CARD_ELEMENT_OPTIONS}  className="mt-5"/>
    

        <Row className='extraRowSpace mt-5'>
          <button id="btn-hover-none">Submit</button>
        
        {spinner && <Spinner animation="border"  role="status" style={{marginLeft:'53%',top:'-3rem',position:'relative'}}/> } 
        
        </Row>

</Form></div>
  )
}
