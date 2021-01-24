import React from 'react';
import {
    Link
} from "react-router-dom";

const Footer = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/profile" className="item">
                Profile
            </Link>
            <Link to="/direct" className="item">
                Chats
            </Link>
            <Link to="/new" className="item">
                Chat with a new stranger!
            </Link> 
            <Link to="/signup" className="item">
                SignUp
            </Link>
            <Link to="/" className="item">
                Posts
            </Link>
        </div>
    );
}

export default Footer;