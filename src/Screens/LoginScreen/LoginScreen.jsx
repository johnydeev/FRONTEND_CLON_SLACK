import React from "react";
import { NavbarRegister } from "@/Components/NavbarRegister/NavbarRegister";
import { FormLogin } from "@/Components/FormLogin/FormLogin";
import './LoginScreen.css'

const LoginScreen = () => {
    return (
        <div className="form-screen">
            <div className="navbar-register-screen">
                <NavbarRegister />
            </div>
            <div className="form-login">
                <FormLogin />
            </div>
        </div>
    );
};

export default LoginScreen;
