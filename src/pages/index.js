import React from 'react'
import MainScreen from '../pages/MainScreen/index'
import Registration from '../pages/Registration/index'
import PackageDetails from './Packages/package_details'
import Login from './Login/Index'
import Profile from './Profile/index'
import ChangePassword from './ResetPassword/index'
import {useLocation,useParams} from "react-router-dom"
import CustomizedList from './Packages/customizedList'
import StandardList from './Packages/standardList'
import Questionnaire from './Packages/Questionnaire'
import EventsCreation from '../pages/campaign/Events/createForm'
import MillionPosts from '../pages/campaign/millionPosts/index'
import StaticPosts from '../pages/campaign/Static-Campaign/index'
import Messages from '../pages/Messages/Index'
import Orders from '../pages/Orders/index'
import EachOrder from './Orders/eachOrder'
import Relatedmsgs from './Messages/Relatedmsgs'
import Enquiry from '../pages/Enquiry/Index'
import '../style/main.scss'
import Mainscreen from '../../src/pages/MainScreen/index'
import Requets from '../pages/pendingRequest/Index';
import Faq from '../../src/pages/faq/Userfaq';
import PendingReq from '../../src/pages/pendingRequest/pendingRequest'
import Forgotpwd from '../../src/pages/forgotPassword/Index'
import Forgotpwd1 from '../../src/pages/forgotPassword/forgot1'
import EachRequest from '../../src/pages/pendingRequest/EachRequest'
import PaymentForm from '../../src/pages/Payment/index';
import EventPending from './pendingRequest/EventPending';
import Sidebar from '../components/sidebar/sidebar';
import GetCampaign from '../User/Campaign/Index';
import DashHome from "../User/Dashboard/Index";
import RequestPaynow from '../pages/Orders/RequestPaynow';
import PaymentSuccess from './PaymentSuccess'
import "../style/sidebar-slider.scss";
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';

import UserHeader from '../components/header/UserHeader'
import Navbar from '../components/header/navbar'

import RequestPkg from '../User/Packages/Requests';
import RequestEvent from "../User/Events/Request";

import OrderEvent from "../User/Events/Order";
import OrderPack from "../User/Packages/Order";
import OrderCamp from "../User/Campaign/Order";

import SentMessage from "../User/Message/Outbox";
import RecieveMsg from "../User/Message/Inbox";
import MsgView from '../User/Message/MsgView';

import Dashboard from "../User/Dashboard/Index";
import GetPackages from '../User/Packages/Index';

import RaiseReq from '../User/RaiseRequest/Index';

import FooterPage from '../components/Footer/FooterPage';

import Privacy from '../pages/Privacypolicy/Index';

import Terms from '../pages/Termsandcondition/index';

import Donate from '../pages/donation/index';


// import Pagination from './paginationTable';

export default function Index() {
    let data = useParams();
  
    return (
            <>
            <div>

           
            <Switch>
                <Route exact path="/">
                    
                <MainScreen />
                {/* <FooterPage/> */}
                </Route>

                <Route exact path='/home'>

                <MainScreen />
                {/* <FooterPage/> */}
                </Route>

                {/* <Sidebar/> */}    

                <Route exact path='/dashboard'>

                   <div className='dash-alignment-main'>
                    <Sidebar/>
                   <DashHome/>
                   </div>
                   {/* <FooterPage/> */}
                </Route>

                <Route exact path='/sidebar'>
                    <Sidebar/>
                    {/* <FooterPage/> */}
                </Route>



                <Route exact path='/login' >
                 <UserHeader/>
                    <Login />
                    {/* <FooterPage/> */}

                </Route>
               
               

               <Route exact path='/registration' >
                <UserHeader/>
                    <Registration />
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/faq'>
                <Sidebar/>
              
                    <Faq />
                    {/* <FooterPage/> */}
                </Route>
            

                <Route exact path='/login/:standard-list'>
                <UserHeader/>
                <Login  />
                {/* <FooterPage/> */}
                </Route>


                <Route exact path='/login/:customized-list'>
                <UserHeader/>
                <Login  />
                {/* <FooterPage/> */}
                </Route>

                <Route exact path='/profile'>
                    <Sidebar/>
                   <Profile />
                   {/* <FooterPage/> */}
                </Route>

                <Route exact path='/order-payment/:id'>
                    <Sidebar/>
                   <RequestPaynow />
                   {/* <FooterPage/> */}
                </Route>

                

                    <Route exact path='/forgot_password'>
                        <UserHeader/>
                        <Forgotpwd />
                        {/* <FooterPage/> */}
                    </Route>


                    <Route exact path='/donate'>
                        <Donate/>
                    </Route>


                    <Route exact path='/forgot_password1/:email'>
                    <UserHeader/>
                    <Forgotpwd1 />
                    {/* <FooterPage/> */}
                    </Route>

                    <Route exact path='/raise-request'>
                        <Sidebar/>
                        <RaiseReq/>
                        {/* <FooterPage/> */}
                    </Route>

                    

               
                <Route exact path='/order-view'>
                    <Sidebar/>
                    <EachOrder />
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/change_password'>
                         <Sidebar/>
                    <ChangePassword />
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/customized-list'>
                <UserHeader/>
                    <CustomizedList />
                    {/* <FooterPage/> */}
                </Route>


                <Route exact path='/standard-list'>
                     <UserHeader/>
                    <StandardList />
                    {/* <FooterPage/> */}
                </Route>


                {/* <Route exact path='/Questionnaire/:id'>

                <UserHeader/>
                    <Questionnaire />
                </Route> */}

                <Route exact path='/events-creation'>
                <UserHeader/>
                    <EventsCreation />
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/million-posts'>
                <UserHeader/>
                    <MillionPosts />
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/staticPosts'>
                    <UserHeader/>
                    <StaticPosts />
                    {/* <FooterPage/> */}
                </Route>
                
                {/* <Route exact path='/messages'>
               
                <Sidebar/>
                 
                </Route> */}


               

                {/* <Route exact path='/orders'>
                <UserHeader/>
                    <Orders  />

                </Route> */}

                <Route exact path='/request/package'>
               
                    <Sidebar/>
                    <RequestPkg  />
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/request/event'>
               
                    <Sidebar/>
                   < RequestEvent/>
                   {/* <FooterPage/> */}
                </Route>

                <Route exact path='/order/event'>
                
                    <Sidebar/>
                   
                   < OrderEvent/>
                   {/* <FooterPage/> */}
                </Route>


                <Route exact path='/order/package'>
                <div className='dash-alignment-main-two'>
                    <Sidebar/>
                   
                   < OrderPack/>
                   </div>
                   {/* <FooterPage/> */}
                </Route>


                <Route exact path='/order/campaign'>
                
                    <Sidebar/>
                   
                   < OrderCamp/>
                   {/* <FooterPage/> */}
                </Route>


                <Route exact path='/message/Outbox'>
                
                    <Sidebar/>
                   
                   < SentMessage/>
                   {/* <FooterPage/> */}
                </Route>


                <Route exact path='/message/Inbox'>
                
                    <Sidebar/>
                   
                   < RecieveMsg/>
                   {/* <FooterPage/> */}
                </Route>


                <Route exact path='/message/msgView'>
                
                    <Sidebar/>
                   <MsgView/>
                   {/* <FooterPage/> */}
                </Route>


                <Route exact path='/pending_req/:id'>
                <Sidebar/>
                    <EachRequest/>
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/pending_req'>
                <Sidebar/>
                    <EachRequest/>
                    {/* <FooterPage/> */}
                </Route>


                <Route exact path='/request-pkg'>
                    <Sidebar/>
                    <EachRequest/>
                    {/* <FooterPage/> */}
                </Route>


                <Route exact path='/request-event'>
                <Sidebar/>
                    <EventPending/>
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/privacy-policy'>
                <UserHeader/>
                    <Privacy/>
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/terms-and-conditions'>
                <UserHeader/>
                    <Terms/>
                    {/* <FooterPage/> */}
                </Route>

               
                <Route exact path='/request/:type/:id'>
                <Sidebar/>
                    <Requets/>
                    {/* <FooterPage/> */}
                </Route>

                {/* <Route exact path='/my-requests'>
                <Sidebar/>
                    <PendingReq />
                </Route> */}

                {/* <Route exact path='/related-msgs'>
                <Sidebar/>
                    <Relatedmsgs/>
                </Route> */}


                    <Route exact path='/getCampaigns'>
                        <Sidebar/>
                        <GetCampaign/>
                        {/* <FooterPage/> */}
                    </Route>

                    <Route exact path='/getPackages'>
                        <Sidebar/>
                        <GetPackages/>
                        {/* <FooterPage/> */}
                    </Route>

                <Route exact path='/payment-form'>
                    <Sidebar/>
                    <PaymentForm/>
                    {/* <FooterPage/> */}
                </Route>

                <Route exact path='/success'>
                  <PaymentSuccess/>
                </Route>
            
               
            </Switch>
            {/* <Footer /> */}
        </div>
        </>

    )
}
