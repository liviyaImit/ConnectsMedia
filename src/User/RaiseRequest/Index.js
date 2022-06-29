import React from 'react'
import { Container } from 'react-bootstrap';
import {AiOutlineCamera} from 'react-icons/ai';
import {MdPendingActions} from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Url,picture,isLoggin,imgUrl } from '../../GLOBAL/global';
import { AiOutlineBars } from "react-icons/ai";
import Footer from '../../components/Footer';
import {MdEmojiEvents} from 'react-icons/md';
import {FiPackage} from 'react-icons/fi';
var sessionstorage = require('sessionstorage');

export default function Index() {

    const [customerInfo,setCustomerInfo] = React.useState();
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
        getInfos();
    })

  const type = sessionstorage.getItem("reqType");
    const history = new useHistory();

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
          {type === "Package" ? <FiPackage color='black' className='icon-tab'/> :<MdEmojiEvents color='black' className='icon-tab'/> }

          <p className='header-banner-text'>{type==="Package"?"Packages":"Events"}</p>
          </div>
          </div>
            </div>
            </div>
            <div className='button-background-req'></div>
            
  
          </div>

          <div className='view-msg'>
          <div className='msg-align'>

              {type === "Package"? 
              (<>
              <div class="main-packages dash-packages">
                                    <div class="package-wrap">
                                        <div class="package">
                                            <h4>Standard</h4>
                                            <div class="content">
                                                <ul>
                                                    <li><i class="fa fa-check-circle"></i>3 Done-for-you Posts Per Week<br></br>(1 video, 2 pictures / posters)</li>
                                                    <li><i class="fa fa-check-circle"></i>Upto 2 Social Media Platforms</li>
                                                    <li><i class="fa fa-check-circle"></i>Post Boosting – for more views</li>
                                                    <li><i class="fa fa-check-circle"></i>1 Ad Promotion per month</li>                            
                                                    <li><i class="fa fa-check-circle"></i>All Images, Graphics Copyrighting included</li>
                                                </ul>
                                            </div>
                                            <div align="center">
                                            
                                            <button onClick={()=>history.push('/standard-list')}>Buy</button>
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div class="package-wrap">
                                        <div class="package">
                                            <h4>Custom</h4>
                                            <div class="content">
                                                <ul>
                                                    <li><i class="fa fa-check-circle"></i>Register and check all our services </li>
                                                    <li><i class="fa fa-check-circle"></i>Pick the services that suits your ministry needs</li>
                                                </ul>
                                            </div>
                                            <div align="center">
                                            
                                            <button onClick={()=>history.push('/customized-list')}>Buy</button>
                                           
                                            </div>
                                        </div>
                                    </div>
                                  </div>

              </>):


              (<>

                                <div id="campaigns" style={{borderRadius:'8px'}}>
                                        <div>

                                        <ul style={{width:'100%',alignSelf:'center'}}>

                                        <li style={{height:'50%'}}>
                                            <h2>Upcoming Event</h2>
                                            <img className='mt-3' src={require('../../../src/assets/imgs/mike.png')} alt="Campaigns for Upcoming Events"/>
                                            <span className='text-center mt-3'>Share your calendar here. We will pick all your future events from here</span>
                                                        <button onClick={()=>history.push('/events-creation')} style={{marginTop:'6rem',position:'static'}} >Start Here</button>
                                                    
                                        </li>

                                        
                                     
                                        </ul>
                                    </div>
                    </div>

              </>)}

          </div>
      </div>
        <Footer/>
    </Container>

    

  )


 
}
