import { Component, useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import  * as React from 'react'
import  './Header.css' 
import productsStyle from "../styles/product.style";
import { Typography } from "@mui/material";

const Header: React.FC = () => {
  const classes=productsStyle()
  const [activeTab, setActiveTab] = useState("Home");

  const location = useLocation();
  useEffect(()=> {
    if(location.pathname=="/"){
        setActiveTab("Home")
    } else if(location.pathname=="/add"){
        setActiveTab("AddProduct")
    }
  }, [location])
    return (
        <div className={classes.header}>
        <div className={classes.header}>   
        <Typography variant="h3" >Product Management</Typography>
        </div> 
        <div className={classes.headerRight}>
            <Link to='/'>
                <p className={`${activeTab =="Home" ? "active" : ""} `} onClick={()=> setActiveTab("Home")}> Home </p>
            </Link>
            <Link to='/add'>
                <p className={`${activeTab =="AddProduct" ? "active" : ""} `} onClick={()=> setActiveTab("AddProduct")}> Add Product </p>
            </Link>
        </div>
        </div>
    )

}
export default Header;