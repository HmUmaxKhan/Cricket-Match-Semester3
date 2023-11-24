import React from "react";
import "./style.css";

export default function Box  () {
    return (
        <div className="box">
            <div className="nav-bar">
                <div className="overlap">
                    <div className="rectangle" />
                    <div className="div" />
                    <div className="text-wrapper">LOGO</div>
                    <div className="text-wrapper-2">Login</div>
                    <div className="transport-icon">
                        <div className="bus">
                            <div className="overlap-group">
                                <div className="front-mirror" />
                                <div className="head-light" />
                                <div className="head-light-2" />
                            </div>
                            <div className="tyre" />
                            <div className="tyre-2" />
                            <div className="side-mirror" />
                            <div className="side-mirror-2" />
                        </div>
                    </div>
                    <div className="ticket-icon">
                        <div className="ticket">
                            <div className="overlap-2">
                                <div className="ticket-structure">
                                    <div className="overlap-group-2">
                                        <div className="ticket-rectangle" />
                                        <img className="ticket-semi-circle" alt="Ticket semi circle" src="ticket-semi-circle.svg" />
                                        <img className="img" alt="Ticket semi circle" src="image.svg" />
                                    </div>
                                </div>
                                <div className="tickets-dots">
                                    <div className="rectangle-2" />
                                    <div className="rectangle-3" />
                                    <div className="rectangle-4" />
                                    <div className="rectangle-5" />
                                    <div className="rectangle-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-wrapper-3">SignUp</div>
                    <div className="house-icon">
                        <div className="house">
                            <div className="overlap-group-3">
                                <div className="home" />
                                <img className="door" alt="Door" src="door.svg" />
                                <img className="roof" alt="Roof" src="roof.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
