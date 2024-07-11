import React from "react";
import Header from "./Header";

function AppLayout(props) {
    return (
        <div>
            <Header />
            <div className="container m-5">
                {props.children}
            </div>
        </div>
    )
}

export default AppLayout
