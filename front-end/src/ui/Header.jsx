import React from "react";
import { randomAvatar } from "../utils/randomAvatar";
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiArrowRightOnRectangle } from "react-icons/hi2";

function Header() {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login/");
  };

    return (
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand className="fw-bold" href="#home">
              Sociohub
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown
                  title={
                    <Image
                      src={randomAvatar()}
                      roundedCircle
                      width={36}
                      height={36}
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
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default Header
