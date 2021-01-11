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
            <Link to="/" className="item">
                Chats
            </Link>
            <Link to="/new" className="item">
                Chat with a new stranger!
            </Link>
            <Link to="/room" className="item">
                chatRoom
            </Link>
        </div>
    );
}

export default Footer;