import React from 'react'
import { Container,Row,Col} from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai"; 
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai"; 
import { FaYoutube } from "react-icons/fa";
import '../../style/main.scss'
import Parallax from 'react-rellax'
import '../../style/footer.scss'
import { useHistory } from 'react-router-dom';

export default function Index() {

  let history = useHistory();

  function home()
  {
    history.push('/home')
  }
    return (
        <>      
        <body class="d-flex flex-column">
  


  <footer>
    <div className="container py-5">
      <div className="row py-4">
        <div className="col-lg-1">
        </div>
        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 ml-5">
           <div className="watch-livetv" >Watch Live TV</div>
          {/* <img src={require('../../assets/images/cm-01.jpg')}  onClick={()=>home()} style={{width: '65%',borderRadius:'8px',height:'auto'}} className="pointer" alt="logo"/> */}
          <p className="font-italic text-muted mt-5">We know how to get you there.<br></br>Your 100% satisfaction is guaranteed.</p>
          <ul className="list-inline mt-4">
            <li className="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fa fa-twitter"></i></a></li>
            <li className="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fa fa-facebook"></i></a></li>
            <li className="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fa fa-instagram"></i></a></li>
            <li className="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fa fa-pinterest"></i></a></li>
            <li className="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="fa fa-vimeo"></i></a></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 className="text-uppercase font-weight-bold mb-4">Campaigns</h6>
          <ul className="list-unstyled mb-0">
            <li className="mb-2"><a href="/events-creation" class="text-muted">Upcoming Event</a></li>
            <li className="mb-2"><a href="/million-posts" class="text-muted">Missions</a></li>
            <li className="mb-2"><a href="/million-posts" class="text-muted">Strengthening Marriage</a></li>
            <li className="mb-2"><a href="/staticPosts" class="text-muted">Youth Section</a></li>
            <li className="mb-2"><a href="/staticPosts" class="text-muted">Pray For Israel</a></li>
            <li className="mb-2"><a href="/staticPosts" class="text-muted">Evangelism</a></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 className="text-uppercase font-weight-bold mb-4">Packages</h6>
          <ul className="list-unstyled mb-0">
            <li className="mb-2"><a href="/standard-list" class="text-muted">Standard</a></li>
            <li className="mb-2"><a href="/customized-list" class="text-muted">Customized</a></li>
            
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-lg-0">
          <h6 className="text-uppercase font-weight-bold mb-4">Connect</h6>
            <ul className="list-unstyled mb-0">
            <li className="mb-2"><a href='/donate' class="text-muted">Give Now</a></li>
            <li className="mb-2"><a href='/privacy-policy' class="text-muted">Privacy policy</a></li>
            <li className="mb-2"><a href="/terms-and-conditions" class="text-muted">Terms and Conditions</a></li>
          </ul>
         
        
        </div>
      </div>
    </div>

    <div className="bg-light py-4" style={{backgroundColor:'floralwhite !important'}}>
      <div className="container text-center">
        
        <p className="text-muted mb-0 py-2">© 2022 Connect Media Networks All rights reserved.</p>
      </div>
    </div>
  </footer>

</body>
    </>

    )
}
