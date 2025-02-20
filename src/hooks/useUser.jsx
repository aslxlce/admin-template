import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/slices/user";
export default function useUser() {
    const { user, isLoggedIn } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    return {
        setUser: (newUser) => {
            console.log("user", newUser);
            dispatch(setUser(newUser));
        },
        user,
        isLoggedIn,
    };
}
