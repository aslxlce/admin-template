import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/endpoints/auth";

export default function Register() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        password: "",
    });
    const {
        mutate: RegisterAction,
        isPending,
        isError,
    } = useMutation({
        mutationFn: register,
        mutationKey: ["register"],
        onSuccess: (response) => {
            const { firstName, lastName } = response.data.user;
            toast.success(`Registration completed successfully : Welcome ${firstName} ${lastName}`);
        },
        onError: (err) => {
            const { error } = err.response.data;
            toast.error("Registration failed: " + error);
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
                RegisterAction(form);
            }}
        >
            <div className="card-body">
                <fieldset className="fieldset">
                    <label className="fieldset-legend" htmlFor="">
                        First name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        className={"input " + (isError ? "input-error" : "")}
                        value={form.firstName}
                        onChange={HandleChange("firstName")}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <label className="fieldset-legend" htmlFor="">
                        Last name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        className={"input " + (isError ? "input-error" : "")}
                        value={form.lastName}
                        onChange={HandleChange("lastName")}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <label className="fieldset-legend" htmlFor="">
                        Birth date
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        className={"input " + (isError ? "input-error" : "")}
                        value={form.birthDate}
                        onChange={HandleChange("birthDate")}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <label className="fieldset-legend" htmlFor="">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className={"input " + (isError ? "input-error" : "")}
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
                        className={"input " + (isError ? "input-error" : "")}
                    />
                </fieldset>
                <button type="submit" className="btn btn-primary" disabled={isPending}>
                    Register
                </button>
                <p>
                    If you have an account, please{" "}
                    <Link className="text-blue-600" to="/auth/login">
                        login
                    </Link>
                    !
                </p>
            </div>
        </form>
    );
}
