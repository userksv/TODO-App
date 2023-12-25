import React, { useState, useEffect } from "react";
import { logout } from "../auth/authentication";

export default function Logout() {
  useEffect(() => {
    async function logoutUser() {
      try {
        const res = await logout();
        localStorage.clear();
        window.location.href = "/";
        return;
      } catch (error) {
        console.log(error);
      }
    }
    logoutUser();
  });
  return <></>;
}
