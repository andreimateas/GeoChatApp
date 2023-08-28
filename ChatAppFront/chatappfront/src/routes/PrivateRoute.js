import "./Routes.css";
import React from "react";
import {useAuthContext} from "../auth/AuthProvider";
import AccessDenied from "./AccessDenied";


const PrivateRoute = ({component: Route }) => {

    const { userProfile } = useAuthContext();
    const { token } = userProfile;

    if (token) {
        return <Route />
    } else {
        return <AccessDenied />
    }

};

export default PrivateRoute;
