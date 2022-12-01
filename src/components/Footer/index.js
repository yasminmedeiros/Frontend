import React, { Component } from "react";
import "./style.css";

class Footer extends Component {
    render() {
        return (
            <div id="footer" className="d-flex justify-content-center">
                <img src="./assets/img/governo.png" alt="logo saber" className="img-responsive" />
            </div>
        );
    }
}

export default Footer;