import React from 'react';
import {
    Link
} from "react-router-dom";
import './Footer.css'
const Footer = () => {
    return (
        <div className="ui secondary pointing menu justify-content-center">
            <Link to="/profile" className="item text-light">
                Profile
            </Link>
            <Link to="/direct" className="item text-light">
                Chats
            </Link>
            <Link to="/new" className="item text-light">
                Chat with a new stranger!
            </Link> 
            {/* <Link to="/signup" className="item">
                SignUp
            </Link> */}
            <Link to="/" className="item text-light">
                Posts
            </Link>
        </div>
    );
}

export default Footer;