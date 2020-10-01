import React from "react";
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {

    const [{ basket, user }, dispatch] = useStateValue();
   

    const handleAutthentication = () => {
        if (user){
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to='/'>
                <img
                    className="header_logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </Link>

            <div className="header_search">
                <input className="header_searchinput" type="text" />
                <SearchIcon className='header_searchicon'/>
            </div>

            <div className="header_nav">
                <Link to={!user && "/login"}>
                    <div onClick={handleAutthentication} className='header_option'>
                        <span className="header_lineone">
                            {user?.email}
                        </span>
                        <span className="header_linetwo">
                            {user ? "Sign Out" : "Sign In"}
                        </span>
                    </div>
                </Link>
                
                <Link to='/orders'>
                    <div className='header_option'>
                        <span className="header_lineone">
                            Returns
                        </span>
                        <span className="header_linetwo">
                            & Orders
                        </span>
                    </div>
                </Link>
                

                <div className='header_option'>
                    <span className="header_lineone">
                        Your
                    </span>
                    <span className="header_linetwo">
                        prime
                    </span>
                </div>

                <Link to='/checkout'>
                    <div className='header_basket'>
                        <ShoppingBasketIcon />
                        <span className='header-linetwo header_basketcount'>{basket?.length}</span>
                    </div>
                </Link> 
            </div>
            
        </div>
    );
}

export default Header;
