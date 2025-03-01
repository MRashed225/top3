import React, { useContext } from 'react'

import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { counterContext } from '../../Contexts/CounterContext';
import { authContext } from '../../Contexts/AuthContext';
export default function Navbar() {
  const navigate=useNavigate()
  const {counter}=useContext (counterContext)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {isLoggedIn, setIsLoggedIn}=useContext(authContext)
  const menuItems = [
    "Home",
    "Categories",
    "Brands",
    "Cart",

   
  ];
  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false)
    navigate("/login")
  }
  return (
    <NextUiNavbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
       <Link to={"/"}> 
       <NavbarBrand>
          <p className="font-bold text-inherit">FreshCart</p>
       
        </NavbarBrand>
        </Link>
      </NavbarContent>
{/* //the middle links */}
     {
    isLoggedIn&& <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {menuItems.map((item, index) => ( 
         <NavbarItem key={index}>
          <Link color="foreground" to={item==menuItems[0]?"/":"/"+item}>
            {item}
          </Link>
        </NavbarItem>
      ))
      }
        
   
      </NavbarContent>}
{/* //Right button (login&sign up) */}
    { isLoggedIn ? 
    <NavbarContent justify="end">
        <NavbarItem >
          <Button  color="danger" onClick={logout}>Logout</Button>
        </NavbarItem>
      </NavbarContent>: <NavbarContent justify="end">
        <NavbarItem >
          <Link to="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
        <Link to="/register">Register</Link>
        </NavbarItem>
      </NavbarContent>
      }

     { isLoggedIn&&<NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={"foreground"  }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>}
    </NextUiNavbar>
  );
}
