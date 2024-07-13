import React from "react";
import { randomAvatar } from "../utils/randomAvatar";
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiArrowRightOnRectangle } from "react-icons/hi2";

import { getUser } from "../hooks/useLocalStorageState";
function Header() {
  const user = getUser();
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login/");
  };


  const style = { color: "white", fontSize: "1.9em" , marginRight: "2px", marginLeft: "2px"}

    return (
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand className="fw-bold" href="#home">
            <Image
                      src={"/logo4.png"}
                      roundedCircle
                      width={50}
                      height={50}
            />
            </Navbar.Brand>
            {/* <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown
                  title={
                    <Image
                      src={randomAvatar()}
                      roundedCircle
                      width={50}
                      height={50}
                    />
                  }
                >
                  <NavDropdown.Item href="#">
                  <HiOutlineUser /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                  <HiArrowRightOnRectangle /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse> */}
            <Navbar.Collapse className="justify-content-end">
                  <Image
                      src={randomAvatar()}
                      roundedCircle
                      width={50}
                      height={50}
                    />
                      <span className="m-2">{user.name}</span>
                   <HiOutlineUser style={style} />
                <HiArrowRightOnRectangle onClick={handleLogout}  style={style}/>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default Header
