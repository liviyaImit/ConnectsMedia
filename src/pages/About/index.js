import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import '../../style/about.scss'

export default function index() {
    return (
        <div style={{marginTop:'15rem'}}>
            <Container >
                <Row className='about-div1'>
                    <Col sm={12} md={12} xl={8} xxl={8}>
                        <img src={require('../../assets/images/Group 1.png')} alt='who we are' height={400} width={400}/>
                        <p id="whoweare">who we are</p>
                    </Col>

                    <Col sm={12} md={12} xl={8} xxl={8}>

                        <h6 id='descri_1' > If you make a typo or accidentally delete an important file, you will see a compilation error, like when you import a non-existent JavaScript module. The final filenames in the compiled bundle are generated by webpack from content hashes. If the file content changes in the future, webpack will give it a different name in production so you don’t need to worry about long-term caching of assets.</h6>

                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}