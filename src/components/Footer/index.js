import React from 'react'
import { Container,Row,Col} from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai"; 
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai"; 
import { FaYoutube } from "react-icons/fa";
import '../../style/main.scss'
import Parallax from 'react-rellax'
import '../../style/footer.scss'

export default function index() {
    return (
        <>      
        <body class="d-flex flex-column">
  


  <footer className="bg-white">
    <div className="container py-5">
      <div className="row py-4">
        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            {/* <img src="img/logo.png" alt="" width="180" class="mb-3"> */}
          <p className="font-italic text-muted">We know how to get you there. Your 100% satisfaction is guaranteed.</p>
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
        <div className="col-lg-4 col-md-6 mb-lg-0">
          <h6 className="text-uppercase font-weight-bold mb-4"></h6>
          <a href='/privacy'> <p className="text-muted mb-4">
             Privacy policy.</p></a>
         
          <div className="p-1 rounded border">
            <div className="input-group">
              {/* <input type="email" placeholder="Enter your email address" aria-describedby="button-addon1" class="form-control border-0 shadow-0"> */}
              <div className="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link"><i class="fa fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-light py-4">
      <div className="container text-center">
        
        <p className="text-muted mb-0 py-2">© 2022 Connect media All rights reserved.</p>
      </div>
    </div>
  </footer>

</body>
    </>

    )
}
