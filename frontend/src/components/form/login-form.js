import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import FormButton from "./form-button";
import FormInput from "./form-input";
import useAuthentication from "../../useAuthentication";
import { showToast } from "../toast-alert";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
    const { t } = useTranslation();
    const { setLoggedIn } = useAuthentication();
    const navigation = useNavigate();
    const navigate = (route) => navigation(route);
    const toast = useToast();
    const email = useRef();
    const password = useRef();

    function Login(e) {
        e.preventDefault();

        if (!email.current.value || !password.current.value) {
            if (!email.current.value && !password.current.value) {
                showToast(toast, "Email and password are required.");
            } else if (!password.current.value) {
                showToast(toast, "Password is required.");
            } else {
                showToast(toast, "Email is required.");
            }
            return; 
        }

        axios.post("http://127.0.0.1:8000/api/login", {
            email: email.current.value,
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.success && response.data.data) {
                const { id, firstname, lastname, telephone, email } = response.data.data;
                const verifyPassword = bcrypt.compareSync(
                    password.current.value,
                    response.data.pass
                );
                if (verifyPassword) {
                    showToast(
                        toast,
                        "You have logged in successfully.",
                        "success",
                        "Success"
                    );

                    localStorage.setItem("id", id);
                    localStorage.setItem("firstname", firstname);
                    localStorage.setItem("lastname", lastname);
                    localStorage.setItem("telephone", telephone);
                    localStorage.setItem("email", email);
                    setLoggedIn(true);
                    
                    // Provjera da li je email admin@gmail.com, ako jeste onda ga prebaci na dashboard
                    if (email === "admin@gmail.com") {
                        navigate("/dashboard");
                    } else {
                        navigate("/tours");
                    }
                } else {
                    showToast(toast, "Wrong password, try again.");
                }
            } else {
                showToast(toast, response.data.message || "Login failed.");
            }
        })
        .catch((error) => {
            console.log("Error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                showToast(toast, error.response.data.message);
            } else {
                showToast(toast, "An error occurred while logging in. Please try again later.");
            }
        });
    }

    return (
        <div className="col-md-6 col-lg-6 p-md-5 px-4 py-5">
            <form onSubmit={Login}>
                <FormInput name={t("form.email")} type="email" refe={email} />
                <FormInput name={t("form.password")} type="password" refe={password} />
                <FormButton bgColor="btn-primary" btnText={t("form.signIn")} />
            </form>
        </div>
    );
};

export default LoginForm;
