import { useEffect, useState } from "react";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";
import { CALENDAR_EVENT_STYLE } from "./util";

const THEME_BG = CALENDAR_EVENT_STYLE;

function CalendarView({ calendarEvents, addNewEvent, openDayDetail }) {
    const today = moment().startOf("day");
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const colStartClasses = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ];

    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf("month"));
    const [events, setEvents] = useState([]);
    const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));

    useEffect(() => {
        setEvents(calendarEvents);
    }, [calendarEvents]);

    const allDaysInMonth = () => {
        let start = moment(firstDayOfMonth).startOf("week");
        let end = moment(moment(firstDayOfMonth).endOf("month")).endOf("week");
        var days = [];
        var day = start;
        while (day <= end) {
            days.push(day.toDate());
            day = day.clone().add(1, "d");
        }
        return days;
    };

    const getEventsForCurrentDate = (date) => {
        let filteredEvents = events.filter((e) => {
            return moment(date).isSame(moment(e.startTime), "day");
        });
        if (filteredEvents.length > 2) {
            let originalLength = filteredEvents.length;
            filteredEvents = filteredEvents.slice(0, 2);
            filteredEvents.push({ title: `${originalLength - 2} more`, theme: "MORE" });
        }
        return filteredEvents;
    };

    const openAllEventsDetail = (date, theme) => {
        if (theme != "MORE") return 1;
        let filteredEvents = events
            .filter((e) => {
                return moment(date).isSame(moment(e.startTime), "day");
            })
            .map((e) => {
                return { title: e.title, theme: e.theme };
            });
        openDayDetail({ filteredEvents, title: moment(date).format("D MMM YYYY") });
    };

    const isToday = (date) => {
        return moment(date).isSame(moment(), "day");
    };

    const isDifferentMonth = (date) => {
        return moment(date).month() != moment(firstDayOfMonth).month();
    };

    const getPrevMonth = (event) => {
        const firstDayOfPrevMonth = moment(firstDayOfMonth).add(-1, "M").startOf("month");
        setFirstDayOfMonth(firstDayOfPrevMonth);
        setCurrMonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
    };

    const getCurrentMonth = (event) => {
        const firstDayOfCurrMonth = moment().startOf("month");
        setFirstDayOfMonth(firstDayOfCurrMonth);
        setCurrMonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
    };

    const getNextMonth = (event) => {
        const firstDayOfNextMonth = moment(firstDayOfMonth).add(1, "M").startOf("month");
        setFirstDayOfMonth(firstDayOfNextMonth);
        setCurrMonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
    };

    return (
        <>
            <div className="bg-base-100 w-full rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="flex justify-normal gap-2 sm:gap-4">
                        <p className="w-48 text-xl font-semibold">
                            {moment(firstDayOfMonth).format("MMMM yyyy").toString()}
                            <span className="ml-2 text-xs">Beta</span>
                        </p>

                        <button className="btn btn-square btn-sm btn-ghost" onClick={getPrevMonth}>
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <button
                            className="btn btn-sm btn-ghost normal-case"
                            onClick={getCurrentMonth}
                        >
                            Current Month
                        </button>
                        <button className="btn btn-square btn-sm btn-ghost" onClick={getNextMonth}>
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <div>
                        <button
                            className="btn btn-sm btn-ghost btn-outline normal-case"
                            onClick={addNewEvent}
                        >
                            Add New Event
                        </button>
                    </div>
                </div>
                <div className="divider my-4" />
                <div className="grid grid-cols-7 place-items-center gap-6 sm:gap-12">
                    {weekdays.map((day, key) => {
                        return (
                            <div className="text-xs capitalize" key={key}>
                                {day}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-1 grid grid-cols-7 place-items-center">
                    {allDaysInMonth().map((day, idx) => {
                        return (
                            <div
                                key={idx}
                                className={
                                    colStartClasses[moment(day).day().toString()] +
                                    " h-28 w-full border border-solid"
                                }
                            >
                                <p
                                    className={`hover:bg-base-300 mx-1 mt-1 flex inline-block h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm ${isToday(day) && "dark:hover:bg-base-300 bg-blue-100 dark:bg-blue-400 dark:text-white"} ${isDifferentMonth(day) && "text-slate-400 dark:text-slate-600"}`}
                                    onClick={() => addNewEvent(day)}
                                >
                                    {" "}
                                    {moment(day).format("D")}
                                </p>
                                {getEventsForCurrentDate(day).map((e, k) => {
                                    return (
                                        <p
                                            key={k}
                                            onClick={() => openAllEventsDetail(day, e.theme)}
                                            className={`mt-1 truncate px-2 text-xs ${THEME_BG[e.theme] || ""}`}
                                        >
                                            {e.title}
                                        </p>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default CalendarView;
