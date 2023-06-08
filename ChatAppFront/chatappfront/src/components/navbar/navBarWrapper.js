
import NavBar from "./NavBar"
import React from "react";


export const navBarWrapper = (WrappedComponent) => {
    const NavBarWrapper=()=>{

        return (
            <>
                <NavBar />
                <WrappedComponent />
            </>
        );
};
    return NavBarWrapper;
};