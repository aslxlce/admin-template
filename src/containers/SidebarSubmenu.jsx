import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

function SidebarSubmenu({ submenu, name, icon }) {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    /** Open Submenu list if path found in routes, this is for directly loading submenu routes  first time */
    useEffect(() => {
        if (
            submenu.filter((m) => {
                return m.path === location.pathname;
            })[0]
        )
            setIsExpanded(true);
    }, []);

    return (
        <div className="flex flex-col">
            {/** Route header */}
            <div className="block w-full" onClick={() => setIsExpanded(!isExpanded)}>
                {icon} {name}
                <ChevronDownIcon
                    className={
                        "float-right mt-1 h-5 w-5 transition-all delay-400 duration-500 " +
                        (isExpanded ? "rotate-180" : "")
                    }
                />
            </div>

            {/** Submenu list */}
            <div className={`w-full ` + (isExpanded ? "" : "hidden")}>
                <ul className={`menu menu-compact`}>
                    {submenu.map((m, k) => {
                        return (
                            <li key={k}>
                                <Link to={m.path}>
                                    {m.icon} {m.name}
                                    {location.pathname == m.path ? (
                                        <span
                                            className="bg-primary absolute inset-y-0 left-0 mt-1 mb-1 w-1 rounded-tr-md rounded-br-md"
                                            aria-hidden="true"
                                        ></span>
                                    ) : null}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default SidebarSubmenu;
