/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import '../../style/dashboard.scss';
import {FaShoppingBag} from 'react-icons/fa';
import {MdPendingActions,MdDashboard} from 'react-icons/md';
import {CgUserAdd} from 'react-icons/cg';
import axios from 'axios';
import {Url,isLoggin,picture,imgUrl} from '../../GLOBAL/global';
import { useHistory,Link} from "react-router-dom";
import {MdAddPhotoAlternate} from 'react-icons/md';
import {AiOutlineCamera,AiOutlineClose,AiOutlineDelete} from 'react-icons/ai';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BsFillKanbanFill } from "react-icons/bs";
import Footer from '../../components/Footer';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../../style/sidebar-slider.scss';
import { AiOutlineBars } from "react-icons/ai";

import {MdTerrain } from "react-icons/md";
// import '../../style/order.scss';

var sessionstorage = require('sessionstorage');

export default function Index() {
    console.log("dash");
    const history = new useHistory();

    const[orderCount,setOrderCount] = React.useState();
    const[pendCount,setpendCount] = React.useState();
    const[processCount,setprocessCount] = React.useState();
    const [customerInfo,setCustomerInfo] = React.useState();

    const [profileUpload,setProfileupload] = React.useState({});
    const [coverUpload,setCoverupload] = React.useState({});
    const [profilepic ,viewProfilepic] = React.useState(false);

    console.log("first")
   async function logginornot()
    {
      console.log("login")
      let cust_id =  await isLoggin();
      console.log("cust",cust_id);
      if(cust_id === (null || "undefined"))
      {
        history.push('/login');
      }
      
  
    }

    React.useEffect( async() => {

        logginornot();
     
      getDatas();

      

      await getUserInfo();

        $("#service-list li").click(function(){
            var i=$(this).index()+1;
            console.log(i);
            $("#service-list .subtitle").removeClass("active");
            $("#service"+i).addClass("active");
        });
        $(".popup .subtitle i").click(function(){
            $(this).parent().removeClass("active");
        });
        $(document).on('keydown', function(event) {
             if (event.key == "Escape") {
                 $(".popup .subtitle i").parent().removeClass("active");
             }
         });
        $("#socials li").click(function(){
            var i=$(this).index()+1;
            console.log(i);
            $("#socials .subtitle").removeClass("active");
            $("#social"+i).addClass("active");
        });

       
      console.log("useeffect")
      
      

    },[]);
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
    async function getUserInfo()
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

    

    async function getDatas()
    {
      console.log("second")

      const token = sessionstorage.getItem("token");
      const customer_id = sessionstorage.getItem("customerId");
        await axios.get(Url+'ordercount', { headers: { Authorization: `Bearer ${token}`,'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'get' } ,params:{customer_id: customer_id} })
        .then(response => {
            // If request is good...
            console.log(response.data);
            setOrderCount(response.data.count);
            setpendCount(response.data.Pending_count);
            setprocessCount(response.data.Process_count);
            // setAlmessages(response.data.data);
            // setLength(allmessages.length)
        })
        .catch((error) => {
            console.log('error ' + error);
        });
    }

    function viewProfile()
    {
        viewProfilepic(true);

    }

    function changePic()
    {

    }
    

    async function deletePic()
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
            url: Url+'deleteprofilephoto',
            data: formdata,
            headers: headers
            })
            .then(function (response) {
                //handle success
               console.log(response.data);
               if(response.data.photo === "NULL")
               {
                 toast.success('Profie picture Removed!..',3000);
                 setTimeout(() => history.go(0),3000)
               }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
     
     
            });
    }

    
  return (
    <>

    
   <Container className='body-two'>
   <div className='profileBeforeOne'  >

       

{Object.keys(coverUpload).length === 0 ? (<img src={customerInfo === undefined ?picture :(imgUrl+customerInfo.cover_photo)}  className='cover-img-dash1 pointer'/>):(<><img src={coverUpload?coverUpload : picture} className='cover-img-dash' /></>)}

<div className='cover-camera'>
    <label htmlFor="cover-image">
        <div className='icon-background-dash-cam'>
        <MdTerrain  size={20} className="pointer" />
        </div>
        <input type="file" onChange={(e) => filechoose(e,"cover")} className="filetype"  id="cover-image"/>
    </label> 
</div>
<div className='icon-background-dash'>
<AiOutlineBars size={20} color='black' className='bsFillKanbanFill2 pointer cover-camera2' onClick={()=>onTapFun()}/>

</div>

<div className="profile-idents">
    <div className='content-overlay'>
        <div className='dash-content'
        //    style={{marginLeft:'245px',width:'80%',marginTop:'2rem'}}
        >
            <MdDashboard color='black' className='icon-dash12' size={22}/>
            <p className='header-banner-text'>Welcome <span className='ministry'>{customerInfo === undefined ? "" : customerInfo.cust_ministry}</span></p>
        </div>     
            
    </div>
    <div className='row-flex-align-one'
            //  style={{marginTop:'5rem'}}
            >
                <div className='profileInner-one'>
                    {Object.keys(profileUpload).length === 0 ? (<img  src={customerInfo === undefined ? picture :(imgUrl+customerInfo.photo)} onClick={()=>viewProfile()} className="pointer profileInner-one-img" />):(<><img  src={profileUpload?profileUpload : picture} /></>)}
                    <div className='img-camera'>
                        <label htmlFor="group_image"><AiOutlineCamera color='white' className='pointer' style={{color:'black'}} /></label> 
            
                        <input type="file" onChange={(e) => filechoose(e,"profile")} className="filetype" id="group_image"/>
                    </div>  
                </div>
                </div>
    </div> 
</div>

<div className="stats">
<div className='order-section-align'>
      <div className='position-two-dash'>
       <div className='dash-card' id="dashcard1">
        <div className='dash-text-align1'>
        <div className='dash-band'>
           <FaShoppingBag size={18}/>
       </div>
       <p className='dash-text '>Active Orders</p>
       
       </div>
           <div className='dash-text'>
           <p className=' number-text '>{orderCount}</p>
           </div>
       
     

       </div>
       <div className='dash-card' id="dashcard2">
       <div className='dash-text-align1'>

       <div className='dash-band'>
               <MdPendingActions size={18}/>
           </div>
       <p className='dash-text '>Pending Orders </p>

       </div>
       <div className=''>
           <p className=' number-text '>{pendCount}</p>
           </div>

           

       </div>
       </div> 

       

       <div className='dash-card' id="dashcard3">
       <div className='dash-text-align1'>
       <div className='dash-band'>
           <CgUserAdd size={18}  />
           </div> 
       <p className='dash-text '>Processing Orders</p>
      
       </div>
           <div className=''>
           <p className=' number-text '>{processCount}</p>
           </div>

              

       </div>
       </div>
</div>



<div className='view-msg mt-5 '>
                <div className='align-div pwd-div1'>
                    <h2>Guiding Video</h2>
                <video autoPlay={false} className='dash-video' controls={true}>
                  <source src={require('../../assets/video/connect event flow.mp4')} type="video/mp4"/>
                </video>
                    
                </div>
            </div>  




















            <div className='view-msg mt-5 '>
            <div className='align-div pwd-div'>
                <div className="section popup" id="services">
        <div class="service-main-div">
            <h1>Services We Offer</h1>
            <div id="service-wrap">
                <ul id="service-list" className="services-lists">
                    <li><div><img src={require('../../../src/assets/imgs/service-promotions.png')} alt="service promotion"/><b>Promotions & Ads</b> using Google, Facebook, Instagram, Youtube and Twitter Ads</div></li>
                    <li><div><img src={require('../../../src/assets/imgs/service-livestream.png')} alt="service-livestream"/><b>Live stream handling</b> on Facebook and Youtube</div></li>
                    <li><div><img src={require('../../../src/assets/imgs/service-personalised-photos.png')} alt="service-personalised"/><b>Done-For-You Personalised Pictures</b> on Facebook & Instagram</div></li>
                    <li><div><img src={require('../../../src/assets/imgs/service-personalised-videos.png')} alt="service-personalised-video"/><b>Done-For-You Personalised Vidoes</b> on Facebook & Instagram</div></li>
                    <li><div><img src={require('../../../src/assets/imgs/service-videos-reels.png')}alt="service-video-reels"/><b>Short Videos & Reels</b> with custom graphics</div></li>
                    <li><div><img src={require('../../../src/assets/imgs/service-dev.png')} 
                    alt="service-dev"/><b>Application Development</b> Website and Mobile application developments</div></li>
                    <li><div><img src={require('../../../src/assets/imgs/service-tech-support.png')} alt="service-tech"/><b>Technology</b> solutions & support</div></li>
                    <li><div><img src={require('../../../src/assets/imgs/service-writing.png')} alt="service-writing"/><b>Content Writing</b> Plagiarism free content</div></li>
                    <li><div><img src={require('../../../src/assets/imgs/service-ready-campaigns.png')} alt="service-ready-campaigns"/><b>Ready-to-use Campaigns</b> to keep audience engaged</div></li>
                    <li><div><img src={require('../../../src/assets/imgs/service-share-performance.png')}  alt="service-share-performance"/><b>Share</b> resource & performance</div></li>
                </ul>
                <ul id="socials">
                <li><img src={require('../../../src/assets/imgs/youtube.png')} alt="youtube"/></li>
                <li><img src={require('../../../src/assets/imgs/facebook.png')} alt="facebook"/></li>
                <li><img src={require('../../../src/assets/imgs/instagram.png')} alt="instagram"/></li>
                <li><img src={require('../../../src/assets/imgs/twitter.png')} alt="twitter"/></li>
                <li><img src={require('../../../src/assets/imgs/box.png')} alt="box"/></li>
                <li><img src={require('../../../src/assets/imgs/web.png')} alt="web"/></li>
                <li><img src={require('../../../src/assets/imgs/truth.png')} alt="truth"/></li>
                </ul>
            </div>
            <div id="service1" class="subtitle">
                <div class="content">
                <h2>Promotions & Ads </h2>
                <ul>
                <li>Special campaign promotions with targeted reach and performance tracking</li>
                <li>Promote your organization in targeted location with specific demographics</li>
                <li>Advertise your upcoming events on your social media pages with high reach<br></br>(Using Organic and/or Paid methods) </li>
                </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="service2" class="subtitle">
                <div class="content">
                <h2>Live Stream Handling</h2>
                    <ul>
                    <li>Allow us to handle your livestream to take the viewership to the next level</li>
                    <li>We will not only show your videos to the subscribed followers, but also to the outside world where the sermons will reach!</li>
                    <li>Sharing the word to the unreached is our heart. And that’s the reason we are here.</li>
                    </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="service3" class="subtitle">
                <div class="content">
                <h2>Done-For-You Personalized Pictures</h2>
                    <ul>
                    <li>Allow us make daily / weekly inspirational posters– fully customized for you</li>
                    <li>Fully optimized with your name and logo and publish on your behalf</li>
                    <li>Not just publish to your audience, we can promote beyond the groups</li>
                    </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="service4" class="subtitle">
                <div class="content">
                <h2>Done-For-You Personalized Videos</h2>
                    <ul>
                    <li>Allow us make daily / weekly attractive videos with relevant content for you</li>
                    <li>We will add your name and logo and publish on your behalf</li>
                    <li>Not just publish to your audience, we can promote beyond the groups</li>
                    </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="service5" class="subtitle">
                <div class="content">
                <h2>Short Videos & Reels</h2>
                    <ul>
                    <li>Short videos & reels are hot lately</li>
                    <li>Suggest us THAT inspirational moment from Sunday sermon and we will optimize the clips and publish</li>
                    </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="service6" class="subtitle">
                <div class="content">
                <h2>Application Development</h2>
                    <ul>
                    <li>We make beautiful websites within a quick turnaround time</li>
                    <li>With integration of complete SEO package</li>
                    <li>Interactive Mobile Apps done for your organization</li>
                    </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="service7" class="subtitle">
                <div class="content">
                <h2>Technology</h2>
                    <ul>
                    <li>Need ANY software solution? Email us and we will get in touch</li>
                    </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="service8" class="subtitle">
                <div class="content">
                <h2>Content Writing</h2>
                    <ul>
                    <li>For your website, videos and posters</li>
                    <li>For your special campaigns or events</li>
                    <li>For any of your ministries needs</li>
                    <li>Plagiarism free and original content</li>
                    </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="service9" class="subtitle">
                <div class="content">
                <h2>Ready–to–use Campaigns</h2>
                    <ul>
                    <li>We will keep on publishing videos and posters on your behalf</li>
                    <li>You are welcome to participate in the following campaigns - Missions, Strengthening Marriage, Youth Section, Pray for Israel and Evangelism</li>
                    <li>Each campaign is unique by itself and we use different platforms to target different age groups</li>
                    <li><b>For Example:</b> Youth Section is focused on Tik-Tok, Instagram, Snap Chat, Facebook, where youngsters tend to spend more time</li>
                    <li>With lots of prayers behind these campaigns, our attempt is to engage people with Jesus</li>
                    </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="service10" class="subtitle">
                <div class="content">
                <h2>Share</h2>
                    <ul>
                    <li>We will periodically be sharing the progress reports and key metrics on the performance of your subscribed services</li>
                    </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="social1" class="subtitle">
                <div class="content">
                <h2>YouTube</h2>
                <ul>
                <li>We will handle your live-stream to increase followers and viewership</li>
                <li>We will prepare and post done-for-you customized videos</li>
                <li>Personalized Short Reels and stories</li>
                </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="social2" class="subtitle">
                <div class="content">
                <h2>Facebook</h2>
                <ul>
                <li>We will handle your live-stream to increase followers and viewership</li>
                <li>We will prepare and post done-for-you customized videos</li>
                <li>Done-for-you personalized Short Reels and stories</li>
                <li>Done-for-you personalized posters / pictures with your name and logo</li>
                </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="social3" class="subtitle">
                <div class="content">
                <h2>Instagram</h2>
                <ul>
                <li>We will prepare and post done-for-you customized videos</li>
                <li>Done-for-you personalized Short Reels and stories</li>
                <li>Done-for-you personalized posters / pictures with your name and logo</li>
                </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="social4" class="subtitle">
                <div class="content">
                <h2>Twitter</h2>
                <ul>
                <li>We will prepare and post tweets</li>
                <li>Done-for-you personalized Short videos</li>
                <li>Done-for-you personalized posters / pictures with your name and logo</li>
                </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
        </div>
            <div id="social5" class="subtitle">
                <div class="content">
                <h2>Digital Marketing</h2>
                <ul>
                <li>Promote your church / ministry on google and increase your search ranking on google<br></br>
                i.e. If someone searches “Church near me”, we will put your church on top of the search list in that area</li>
                <li>Promote your church / ministry on all social media platforms</li>
                <li>Customized promotions of specific ministry area and upcoming events</li>
                <li>All done in Organic and Paid methods</li>
                </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="social6" class="subtitle">
                <div class="content">
                <h2>Website</h2>
                <ul>
                <li>We make beautiful websites with quick turnaround time</li>
                <li>With integration of complete SEO package</li>
                <li>Interactive Mobile Apps done for your organization</li>
                </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
            <div id="social7" class="subtitle">
                <div class="content">
                <h2>Truth Social</h2>
                <ul>
                <li>Upcoming Social Media Platform</li>
                </ul>
                </div>
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </div>
          
        </div>
        </div>
                </div>
            </div>

          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
            
               







                <div className='view-msg mt-5 '>
                <div className='align-div pwd-div'>
                    <h1 className=' font-20 py-3 text-center'>Packages</h1>

                    <div className="main-packages  dash-packages pb-3">
                    <div className="package-wrap">
                        <div className="package">
                                                        <h4>Standard</h4>
                                                        <div className="content">
                                                            <ul>
                                                                <li><i class="fa fa-check-circle"></i>3 Done-for-you Posts Per Week<br></br>(1 video, 2 pictures / posters)</li>
                                                                <li><i class="fa fa-check-circle"></i>Upto 2 Social Media Platforms</li>
                                                                <li><i class="fa fa-check-circle"></i>Post Boosting – for more views</li>
                                                                <li><i class="fa fa-check-circle"></i>1 Ad Promotion per month</li>                            
                                                                <li><i class="fa fa-check-circle"></i>All Images, Graphics Copyrighting included</li>
                                                            </ul>
                                                        </div>
                                                        <div align="center">
                                                        {sessionstorage.getItem('token') ===null ?(
                                                            <>
                                                        <button onClick={()=>redirecttoList("std")}>Register</button>
                                                        </>
                                                        ):(
                                                            <>
                                                        <button onClick={()=>history.push('/standard-list')}>Buy</button>
                                                        </>
                                                        )
                                                        }
                                                        </div>
                                                    </div>                           
                                                </div>                                 
                                                <div className="package-wrap">
                                                    <div className="package">
                                                        <h4>Custom</h4>
                                                        <div className="content">
                                                            <ul>
                                                                <li><i class="fa fa-check-circle"></i>Register and check all our services </li>
                                                                <li><i class="fa fa-check-circle"></i>Pick the services that suits your ministry needs</li>
                                                            </ul>
                                                        </div>
                                                        <div align="center">
                                                        {sessionstorage.getItem('token') ===null ?(
                                                            <>
                                                        <button onClick={()=> redirecttoList("custom")}>Register</button>
                                                        </>
                                                        ):(
                                                            <>
                                                        <button onClick={()=>history.push('/customized-list')}>Buy</button>
                                                        </>
                                                        )
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                    </div>

            
            
            
            
                </div>
            </div>
           
            
            
            
            
            
           
          
            <div className='view-msg mt-5 mb-5'>
                <div className='align-div pwd-div'>
                   
                    <div id="campaigns" style={{borderRadius:'8px',color:'#FFFFFF'}} className="onfocus">
                    
                                        <div>
                                        <h1 className=' font-20 text-center'>Campaigns</h1>
                                        <ul>

                                        <li className="onfocus">
                                            <h2>Upcoming Event</h2>
                                            <img className='mt-3' src={require('../../../src/assets/imgs/mike.png')} alt="Campaigns for Upcoming Events"/>
                                            <span className='mt-3'>Share your calendar here. We will pick all your future events from here</span>
                                    
                                                    {sessionstorage.getItem('token') ===null ?(
                                                        <>
                                                        <button onClick={()=> redirectto("event")} className='mt-3'>Register to start</button>
                                                        </>
                                                        ):(
                                                            <>
                                                        <button onClick={()=>history.push('/events-creation')} className='mt-3'>Start Here</button>
                                                        </>
                                                        )
                                                    }
                                    </li>

                                        <li>
                                        <h2>Missions</h2>
                                        <img className='mt-3' src={require('../../../src/assets/imgs/stand-mic.png')} alt="Million Post - Mic"/>
                                            <span className='mt-3'>Click below to support missionaries from across the globe</span>
                                        {/* <div><button>Start Here</button></div> */}

                                            {sessionstorage.getItem('token') ===null ?(
                                                                    <>
                                                                    <button onClick={()=> redirectto("million")} className='mt-3'>Register to start</button>
                                                                    </>
                                                                    ):(
                                                                        <>
                                                                    <button onClick={()=>history.push('/million-posts')} className='mt-3'>Start Here</button>
                                                                    </>
                                                                    )
                                                                }
                                    </li>


                                        <li>
                                        <h2>Strengthening Marriage</h2>
                                        <img className='mt-3' src={require('../../../src/assets/imgs/strengthen-marriage.png')} alt="Strengthening Marriage"/>
                                            <span className='mt-3'>Register and support for this special campaign and we will keep on posting inspirational content and bible scriptures, about togetherness and marriage on social media</span>
                                        

                                                                {sessionstorage.getItem('token') ===null ?(
                                                                    <>
                                                                    <button onClick={()=> redirectto("million")} className='mt-3'>Register to start</button>
                                                                    </>
                                                                    ):(
                                                                        <>
                                                                    <button onClick={()=>history.push('/million-posts')} className='mt-3'>Start Here</button>
                                                                    </>
                                                                    )
                                                                }
                                    </li>
                                        <li>
                                        <h2>Youth Section</h2>
                                        <img className='mt-3' src={require('../../../src/assets/imgs/youth.png')} alt="Praying Youth"/>
                                            <span className='mt-3'>Register for this special campaign to engage our future generation with youthful Christian content on social media</span>
                                                            {sessionstorage.getItem('token') ===null ?(
                                                                    <>
                                                                    <button onClick={()=> redirectto("static")} className='mt-3'>Register to start</button>
                                                                    </>
                                                                    ):(
                                                                        <>
                                                                    <button onClick={()=>history.push('/staticPosts')} className='mt-3'>Start Here</button>
                                                                    </>
                                                                    )
                                                                }
                                    </li>
                                        <li>
                                        <h2>Pray For Israel</h2>
                                        <img className='mt-3'src={require('../../../src/assets/imgs/israel.png')} alt="Pray for Israel"/>
                                            <span className='mt-3'>God loves Israel. So do we. Bible clearly mentions – “Pray for the peace of Jerusalem. May they prosper who love you”. We are creating an opportunity for you to bless Israel & Jerusalem. We will optimize videos and posters and publish on your behalf. Prosper!
                                        </span>
                                                            {sessionstorage.getItem('token') ===null ?(
                                                                    <>
                                                                    <button onClick={()=> redirectto("static")} className='mt-3'>Register to start</button>
                                                                    </>
                                                                    ):(
                                                                        <>
                                                                    <button onClick={()=>history.push('/staticPosts')} className='mt-3'>Start Here</button>
                                                                    </>
                                                                    )
                                                                }
                                    </li>
                                        <li>
                                        <h2>Evangelism</h2>
                                        <img src={require('../../../src/assets/imgs/evangelism.png')} alt="Evangelism" className='mt-3'/>
                                            <span className='mt-3'>Great opportunity to share the gospel while you are busy.
                                    Register, and we will keep on posting word of God on social media ON YOUR NAME.
                                        </span>
                                                            {sessionstorage.getItem('token') ===null ?(
                                                                    <>
                                                                    <button onClick={()=> redirectto("static")} className='mt-3'>Register to start</button>
                                                                    </>
                                                                    ):(
                                                                        <>
                                                                    <button onClick={()=>history.push('/staticPosts')} className='mt-3'>Start Here</button>
                                                                    </>
                                                                    )
                                                                }
                                    </li>
                                        </ul>
                                    </div>
                    </div>
                    </div>
                </div>





                {profilepic === true &&

                    confirmAlert({

                        customUI: ({onClose}) => {
                            return (
                                <Container className='body-two2'>
                                <div className='profile-pic-view '>
                                    {/* <img alt="profile" src={customerInfo === undefined ? picture :(imgUrl+customerInfo.photo)} onClick={()=>viewProfile()} style={{objectFit:'contain'}}  /> */}
{Object.keys(profileUpload).length === 0 ? (<img alt="profile" src={customerInfo === undefined ? picture :(imgUrl+customerInfo.photo)} onClick={()=>viewProfile()}
//  style={{objectFit:'contain'}}
  className="pointer svgimg1" style={{maxHeight:"75vh"}} />):(<><img className="pointer svgimg1"  alt="profile" src={profileUpload?profileUpload : picture} /></>)}

{console.log("profileup",profileUpload)}
                                    

                                    
                                    
                                            
                                </div>
                                <div className='profile-pic-editing'>
                                        <div className='profile-pic-editing-inner'>
                                    <AiOutlineClose  className='Ai-close pointer svgimg1' size={24} onClick={()=>onClose()}/>

                                    </div>
                                    <div className='profile-pic-editing-inner'>
                                        <AiOutlineDelete className='pointer svgimg1' size={24} onClick={()=>deletePic()}/>
                                        </div>
                                        <div className='profile-pic-editing-inner'>
                                        <label htmlFor="changepic"><AiOutlineCamera style={{color:'white'}} className='pointer mx-5 svgimg1' size={24} /></label> 
                                        
                                        <input type="file" onChange={(e) => filechoose(e,"profile")} className="filetype" id="changepic" style={{display:'none'}}/>
                                        </div>
                                    </div>
</Container>
                            );
                            
                        }
                    })

                }      
               
            <ToastContainer  position="top-center"
            //   style={{marginTop:'50vh'}}
              />
     <Footer/>
   </Container>
    
   </>
  )
  function redirecttoList(type)
  {
      

      if(type === "std")
      {
          sessionstorage.setItem("list","standard-list");
          history.push('/login/standard-list');
          history.go(0);
      }
      if(type === "custom"){
          sessionstorage.setItem("list","customized-list");
          history.push('/login/customized-list');
          history.go(0);
      }
  }

  function redirectto(type)
    {
        if(type === "event")
        {
            sessionstorage.setItem("camp","/events-creation");
            history.push('/login');
            history.go(0);
        }

        if(type === "million")
        {
            sessionstorage.setItem("camp","/million-posts");
            history.push('/login');
            history.go(0);
        }

        if(type === "static")
        {
            sessionstorage.setItem("camp","/staticPosts");
            history.push('/login');
            history.go(0);
        }
    }

     function filechoose(e,pic)
    {
        viewProfilepic(false);
      
        const token = sessionstorage.getItem("token");
        
        let formdata = new FormData();
        const customer_id = sessionstorage.getItem("customerId");
        

        formdata.append("customer_id",customer_id);
        formdata.append("photo",e.target.files[0]);
        
        const headers ={
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }


            if(pic === "profile")
            {
                setProfileupload(URL.createObjectURL(e.target.files[0]));

                 axios({
                method: 'post',
                url: Url+'profilephoto',
                data: formdata,
                headers: headers
                })
                .then(function (response) {
                    console.log("file upload",response.data);
                    if(response.data.photo !== "")
                    {
                        toast.success('Profie picture Updated!..',3000);
                        setTimeout(()=>history.go(0),3000);
                    }
                    
                    
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
            }
            else
            {

                setCoverupload(URL.createObjectURL(e.target.files[0]));
                 axios({
                    method: 'post',
                    url: Url+'coverphoto',
                    data: formdata,
                    headers: headers
                    })
                    .then(function (response) {
                         console.log("file upload",response.data);
                        if(response.data.photo !== "")
                        {
                            toast.success('Cover picture Updated!..',3000);
                        }
                        
                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                    });
            }
        
    }
}