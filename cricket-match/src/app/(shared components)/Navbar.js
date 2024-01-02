"use client"
import Link from "next/link";
import { BiSolidCricketBall } from "react-icons/bi";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { FaHotel } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useState } from "react";
import { logout } from "./logout";
function Navbar(props) {

  const cardStyle = {
    marginLeft: "30px",
    marginRight: "30px",
  };

  const [isLogged, setLogged] = useState(false);
  
  const base64image = `data:image/png;base64,${props.img}`
  useEffect(() => {
    // Use useEffect to set the initial value of isLogged
    setLogged(props.val);
  }, [props.val]);
  return (
    <div className="mb-3">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid container">
          <Link className="navbar-brand" href="/">
            CricCruiser
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" style={cardStyle}>
                <Link className="nav-link active" href="/tournaments">
                  <BiSolidCricketBall size={40} />
                </Link>
              </li>
              <li className="nav-item" style={cardStyle}>
                <Link className="nav-link active" href="/logintransport">
                  <i>
                    <b>Admin</b>
                  </i>
                  <MdOutlineEmojiTransportation size={40} />
                </Link>
              </li>
              <li className="nav-item" style={cardStyle}>
                <Link className="nav-link active" href="/hotelloginAdmin">
                  <i>
                    <b>Admin</b>
                  </i>
                  <FaHotel size={40} />
                </Link>
              </li>
            </ul>

            <div className="dropdown">
              <Link
                className="dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
             {isLogged? <Image src={base64image} width={40} height={40} style={{borderRadius:"100%"}} alt="login" />
            :<Image src={"/login.jpg"} width={40} height={40} alt="login" />}
              
              </Link>

              {isLogged? 
                <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/update">
                    update
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>:
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/register">
                    SignUp
                  </Link>
                </li>
              </ul>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
