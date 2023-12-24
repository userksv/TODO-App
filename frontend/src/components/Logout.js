import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Logout() {
 useEffect(()=>{
   const api_endpoint = 'http://localhost:8000/auth/logout/';
  if(localStorage.getItem('access_key') !== null){
    const access_key = localStorage.getItem("access_key");
    console.log(localStorage.getItem("refresh_token"));
    axios.post(api_endpoint,{
      headers:{
        Authorization: `Token ${access_key}`
      }
      }).then((response)=>{
        console.log(response);
        console.log("Logout succesful");
        localStorage.clear();
        window.location.href='/'
      }).catch((error)=>{
        console.log(error);
      })
    }

 })
  return <></>;
}
