import React, { useContext, useEffect } from "react";
import ENVIROMENT from "../../config/environment";
import { useForm } from "../../hooks/useForm";
import useApiRequest from "../../hooks/useApiRequest";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../Utils/Spinner/Spinner";
import "./FormLogin.css";
import { AuthContext } from "../../Context/authContext";

export const FormLogin = () => {
    const { isAuthenticatedState, userState, login, getUser } =
        useContext(AuthContext);
    const userId = userState._id;
    console.log("USERID>>", userId);
    const formInitialState = {
        email: "",
        password: "",
    };

    const { formState, handleOnChange } = useForm(formInitialState);

    const { responseApiState, postRequest } = useApiRequest(
        `${ENVIROMENT.URL_API}/api/auth/login`
    );

    const navigate = useNavigate();
    console.log(isAuthenticatedState);
    console.log(userState._id);

    useEffect(() => {
        const currentPath = window.location.pathname;

        if (isAuthenticatedState && userState._id && currentPath == "/login") {
            navigate(`/user/${userState._id}/workspaces`);
        }
    }, [isAuthenticatedState, userState._id, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        toast("Cargando...", {
            icon: <Spinner />,
            duration: 4000,
        });
        const response = await postRequest(formState);
        console.log("Response>>", response);
        if (response.ok) {
            console.log("ResponseApiSubmit>>", responseApiState);
            login(response.payload.authorization_token);
            await getUser();
        } else {
            console.error("Error: La respuesta de la API no es válida.");
            toast.error("Error al iniciar sesión.");
        }
    };

    return (
        <div className="container">
            <h1 className="title-form">Logueate</h1>
            <form onSubmit={handleSubmit} className="form-wrapper">
                <div className="form-content">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu email"
                            autoComplete="username"
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            autoComplete="current-password"
                            onChange={handleOnChange}
                        />
                    </div>
                </div>

                <div className="form-footer">
                    <Link to="/reset-password" className="link">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <button type="submit">Loguear</button>
                </div>
            </form>
        </div>
    );
};
