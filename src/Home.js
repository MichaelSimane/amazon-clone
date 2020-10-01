import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
    return (
        <div className='home'>
            <div className= "home_container">
                <img className="home_image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220O_.jpg" alt=""/>

                <div className="home_row">
                    <Product id="12334323"
                        title='the lean startup'
                        price={29.99} 
                        image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg" 
                        rating={3}/>
                    <Product id="47320529"
                        title='s20'
                        price={499.99} 
                        image="https://m.media-amazon.com/images/I/61YVqHdFRxL._AC_UY218_.jpg" 
                        rating={4}/>                                       
                </div>
                <div className="home_row">
                    <Product id="22394017"
                        title='ps4'
                        price={299.99} 
                        image="https://m.media-amazon.com/images/I/41GGPRqTZtL._AC_UY218_.jpg" 
                        rating={5}/>
                    <Product id="02353369"
                        title='xbox one'
                        price={299.99} 
                        image="https://m.media-amazon.com/images/I/61zjj2sgXML._AC_UY218_.jpg" 
                        rating={4}/>
                    <Product id="52864323"
                        title='iphone x'
                        price={699.99} 
                        image="https://m.media-amazon.com/images/I/71R46ju5GzL._AC_UY218_.jpg" 
                        rating={3}/>
                </div>
                <div className="home_row">
                    <Product id="12345342"
                        title='samsung tv'
                        price={799.99} 
                        image="https://m.media-amazon.com/images/I/91GMSrYPaHL._AC_UY218_.jpg" 
                        rating={5}/>                   
                </div>

            </div>
            
        </div>
    )
}

export default Home
