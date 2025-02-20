import { useState, useRef } from "react";
import { Link } from "react-router";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Login() {
    const INITIAL_LOGIN_OBJ = {
        password: "",
        emailId: "",
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (loginObj.emailId.trim() === "")
            return setErrorMessage("Email Id is required! (use any value)");
        if (loginObj.password.trim() === "")
            return setErrorMessage("Password is required! (use any value)");
        else {
            setLoading(true);
            // Call API to check user credentials and save token in localstorage
            localStorage.setItem("token", "DumyTokenHere");
            setLoading(false);
            window.location.href = "/app/welcome";
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="bg-base-200 flex min-h-screen items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="bg-base-100 grid grid-cols-1 rounded-xl md:grid-cols-2">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="px-10 py-24">
                        <h2 className="mb-2 text-center text-2xl font-semibold">Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div className="mb-4">
                                <InputText
                                    type="emailId"
                                    defaultValue={loginObj.emailId}
                                    updateType="emailId"
                                    containerStyle="mt-4"
                                    labelTitle="Email Id"
                                    updateFormValue={updateFormValue}
                                />

                                <InputText
                                    defaultValue={loginObj.password}
                                    type="password"
                                    updateType="password"
                                    containerStyle="mt-4"
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                            </div>

                            <div className="text-primary text-right">
                                <Link to="/forgot-password">
                                    <span className="hover:text-primary inline-block text-sm transition duration-200 hover:cursor-pointer hover:underline">
                                        Forgot Password?
                                    </span>
                                </Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button
                                type="submit"
                                className={
                                    "btn btn-primary mt-2 w-full" + (loading ? " loading" : "")
                                }
                            >
                                Login
                            </button>

                            <div className="mt-4 text-center">
                                Don't have an account yet?{" "}
                                <Link to="/register">
                                    <span className="hover:text-primary inline-block transition duration-200 hover:cursor-pointer hover:underline">
                                        Register
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
