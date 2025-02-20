import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import user from "./slices/user";
import leadsSlice from "../features/leads/leadSlice";

const store = configureStore({
    reducer: {
        user: user,
        header: headerSlice,
        rightDrawer: rightDrawerSlice,
        modal: modalSlice,
        lead: leadsSlice,
    },
});

export default store;
