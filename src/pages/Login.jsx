import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/endpoints/auth";
import { Link } from "react-router";
import { useUser } from "../hooks";

export default function Login() {
    const { setUser } = useUser();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const {
        mutate: LoginAction,
        isError,
        isPending,
    } = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            try {
                if (response.status === 200) {
                    const { token, user } = response.data;
                    localStorage.setItem("token", token);
                    const { firstName, lastName } = user;
                    console.log(user);
                    setUser(user);
                    toast.success(`Logged in successfully : Welcome ${firstName} ${lastName}`);
                }
            } catch (err) {
                console.log(err);
            }
        },
        onError: (err) => {
            const { error } = err.response.data;
            toast.error(`Login failed: ${error}`);
        },
    });
    function HandleChange(inputName) {
        return (e) => {
            setForm((prev) => ({ ...prev, [inputName]: e.target.value }));
        };
    }
    return (
        <form
            className="card"
            onSubmit={async (e) => {
                e.preventDefault();
                LoginAction(form);
            }}
        >
            <div className="card-body">
                <fieldset className="fieldset">
                    <label className="fieldset-legend" htmlFor="">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className={`input ${isError ? "input-error" : ""}`}
                        value={form.email}
                        onChange={HandleChange("email")}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <label className="fieldset-legend" htmlFor="">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={HandleChange("password")}
                        className={`input ${isError ? "input-error" : ""}`}
                    />
                </fieldset>
                <button type="submit" className="btn btn-primary" disabled={isPending}>
                    {isPending ? <span className="loading" /> : null}
                    Login
                </button>
                <p>
                    If you don&apos;t have an account, please{" "}
                    <Link className="text-blue-600" to="/auth/register">
                        register
                    </Link>
                    !
                </p>
            </div>
        </form>
    );
}
