import { themeChange } from "theme-change";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";

import { Link } from "react-router";

function Header() {
    const dispatch = useDispatch();
    const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));

    useEffect(() => {
        themeChange(false);
        if (currentTheme === null) {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setCurrentTheme("dark");
            } else {
                setCurrentTheme("light");
            }
        }
        // 👆 false parameter is required for react project
    }, []);

    // Opening right sidebar for notification
    const openNotification = () => {
        dispatch(
            openRightDrawer({ header: "Notifications", bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION })
        );
    };

    function logoutUser() {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md

        <>
            <div className="navbar bg-base-100 sticky top-0 z-10 shadow-md">
                {/* Menu toogle for mobile view or small screen */}
                <div className="flex-1">
                    <label
                        htmlFor="left-sidebar-drawer"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
                        <Bars3Icon className="inline-block h-5 w-5" />
                    </label>
                    <h1 className="ml-2 text-2xl font-semibold">{pageTitle}</h1>
                </div>

                <div className="flex-none">
                    {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

                    {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}

                    {/* Light and dark theme selection toogle **/}
                    <label className="swap">
                        <input type="checkbox" />
                        <SunIcon
                            data-set-theme="light"
                            data-act-class="ACTIVECLASS"
                            className={`h-6 w-6 fill-current ${currentTheme === "dark" ? "swap-on" : "swap-off"}`}
                        />
                        <MoonIcon
                            data-set-theme="dark"
                            data-act-class="ACTIVECLASS"
                            className={`h-6 w-6 fill-current ${currentTheme === "light" ? "swap-on" : "swap-off"}`}
                        />
                    </label>

                    {/* Notification icon */}
                    <button
                        type="button"
                        className="btn btn-ghost btn-circle ml-4"
                        onClick={() => openNotification()}
                    >
                        <div className="indicator">
                            <BellIcon className="h-6 w-6" />
                            {noOfNotifications > 0 ? (
                                <span className="indicator-item badge badge-secondary badge-sm">
                                    {noOfNotifications}
                                </span>
                            ) : null}
                        </div>
                    </button>

                    {/* Profile icon, opening menu on click */}
                    <div className="dropdown dropdown-end ml-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" alt="profile" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                        >
                            <li className="justify-between">
                                <Link to={"/app/settings-profile"}>
                                    Profile Settings
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li className="">
                                <Link to={"/app/settings-billing"}>Bill History</Link>
                            </li>
                            <div className="divider mt-0 mb-0"></div>
                            <li>
                                <a onClick={logoutUser}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
