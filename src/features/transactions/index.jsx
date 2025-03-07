import moment from "moment";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
    const [filterParam, setFilterParam] = useState("");
    const [searchText, setSearchText] = useState("");
    const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

    const showFiltersAndApply = (params) => {
        applyFilter(params);
        setFilterParam(params);
    };

    const removeAppliedFilter = () => {
        removeFilter();
        setFilterParam("");
        setSearchText("");
    };

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter();
        } else {
            applySearch(searchText);
        }
    }, [searchText]);

    return (
        <div className="float-right inline-block">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            {filterParam != "" && (
                <button
                    onClick={() => removeAppliedFilter()}
                    className="btn btn-xs btn-active btn-ghost mr-2 normal-case"
                >
                    {filterParam}
                    <XMarkIcon className="ml-2 w-4" />
                </button>
            )}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline">
                    <FunnelIcon className="mr-2 w-5" />
                    Filter
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 text-sm shadow"
                >
                    {locationFilters.map((l, k) => {
                        return (
                            <li key={k}>
                                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
                            </li>
                        );
                    })}
                    <div className="divider mt-0 mb-0"></div>
                    <li>
                        <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

function Transactions() {
    const [trans, setTrans] = useState(RECENT_TRANSACTIONS);

    const removeFilter = () => {
        setTrans(RECENT_TRANSACTIONS);
    };

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
            return t.location == params;
        });
        setTrans(filteredTransactions);
    };

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
            return (
                t.email.toLowerCase().includes(value.toLowerCase()) ||
                t.email.toLowerCase().includes(value.toLowerCase())
            );
        });
        setTrans(filteredTransactions);
    };

    return (
        <>
            <TitleCard
                title="Recent Transactions"
                topMargin="mt-2"
                TopSideButtons={
                    <TopSideButtons
                        applySearch={applySearch}
                        applyFilter={applyFilter}
                        removeFilter={removeFilter}
                    />
                }
            >
                {/* Team Member list in table format loaded constant */}
                <div className="w-full overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Location</th>
                                <th>Amount</th>
                                <th>Transaction Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trans.map((l, k) => {
                                return (
                                    <tr key={k}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-circle h-12 w-12">
                                                        <img src={l.avatar} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{l.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{l.email}</td>
                                        <td>{l.location}</td>
                                        <td>${l.amount}</td>
                                        <td>{moment(l.date).format("D MMM")}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );
}

export default Transactions;
