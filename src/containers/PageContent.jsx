import Header from "./Header";
import { Navigate, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import SuspenseContent from "./SuspenseContent";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import routes from "../routers";

const Page404 = lazy(() => import("../pages/protected/404"));

function PageContent() {
    const mainContentRef = useRef(null);
    const { pageTitle } = useSelector((state) => state.header);

    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current?.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [pageTitle]);

    return (
        <div className="drawer-content flex flex-col">
            <Header />
            <main
                className="bg-base-200 flex-1 overflow-y-auto px-6 pt-4 md:pt-4"
                ref={mainContentRef}
            >
                <Suspense fallback={<SuspenseContent />}>
                    <Routes>
                        <Route index element={<Navigate to="/app/dashboard" />} />

                        {routes.map((route, key) => {
                            return (
                                <Route
                                    key={key}
                                    exact={true}
                                    path={`${route.path}`}
                                    element={<route.component />}
                                />
                            );
                        })}

                        {/* Redirecting unknown url to 404 page */}
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div>
    );
}

export default PageContent;
