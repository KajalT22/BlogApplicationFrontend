import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from "reactstrap";
import { doLogout, getCurrentUser, isLoggedIn } from "../services/auth";
import userContext from "../context/userContext";

const MyNavbar = () => {
    const userContextData = useContext(userContext)
    let navigate = useNavigate()
    //by default isOpen val false and the same used for collaps if we click on navbar/collapsTogger then we set it to true
    const [isOpen, setIsOpen] = useState(false)
    //to save the state if we is loggedin or not
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)

    //it will call the callback func when the compontent is load
    //if we give blank dependency [] then it will get called exactly once
    //in our case whenever user is login then excute the callback 
    useEffect(() => {
        //we will set the login based on user is loggedin or not
        setLogin(isLoggedIn())
        //set the usr state by getting user details
        setUser(getCurrentUser())

    }, [login])


    const logout = () => {
        doLogout(() => {
            //logged out
            setLogin(false)
            userContextData.setUser({
                data: null,
                login: false
            })

            navigate("/")
        })
    }

    return(
        <div >
        <Navbar
            color="dark"
            dark
            expand="md"
            fixed=""
            className="px-5"
        >
            <NavbarBrand tag={ReactLink} to="/">
                Blogs
            </NavbarBrand>
            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

            <Collapse isOpen={isOpen} navbar>
                <Nav
                    className="me-auto"
                    navbar
                > 
                {/*className="me-auto" content will be displayed on the left side of nav  */}
                    <NavItem>
                        <NavLink tag={ReactLink} to="/" >
                            New Feed
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={ReactLink} to="/about" >
                            About
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={ReactLink} to="/services" >
                            Services
                        </NavLink>
                    </NavItem>

                    <UncontrolledDropdown
                        inNavbar
                        nav
                    >
                        <DropdownToggle
                            caret
                            nav
                        >
                            More
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={ReactLink} to="/services">
                                Contact Us
                            </DropdownItem>
                            <DropdownItem>
                                Facebook
                            </DropdownItem>
                            <DropdownItem divider />
                            
                            <DropdownItem>
                                Instagram
                            </DropdownItem>
                            <DropdownItem>
                                LinkedIn
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>

                {/* content displayed on rightside of navbar  */}
                <Nav navbar>

                    {
                        //if login val is true then only excute further
                        login && (

                            <>
                                <NavItem>
                                    <NavLink tag={ReactLink} to="/user/profile" >
                                        Profile Info
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={ReactLink} to="/user/dashboard" >
                                         {/*print useremail on navbar   */}
                                        {user.email} 
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink onClick={logout} >
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </>

                        )
                    }
                    {/* when user is not loged in */}

                    {
                        !login && (
                            <>
                                <NavItem>
                                    <NavLink tag={ReactLink} to="/login" >
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={ReactLink} to="/signup" >
                                        Signup
                                    </NavLink>
                                </NavItem>
                            </>
                        )
                    }

                </Nav>
            </Collapse>
        </Navbar>
    </div>

    )
}

export default MyNavbar;