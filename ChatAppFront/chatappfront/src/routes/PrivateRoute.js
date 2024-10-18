import "./Routes.css";
import React from "react";
import {useAuthContext} from "../auth/AuthProvider";
import AccessDenied from "./AccessDenied";


const PrivateRoute = ({component: RouteComponent }) => {

    const { userProfile } = useAuthContext();
    const token = userProfile?.token;

    if (token) {
        return <RouteComponent />
    } else {
        return <AccessDenied />
    }

};

export default PrivateRoute;
