import React, { createContext, useMemo, useState } from "react";
import Header from "./Header";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";


import { HiArrowLeftCircle } from "react-icons/hi2";


export const Context = createContext("unknown");

function AppLayout(props) {
    const navigate = useNavigate();
  const [toaster, setToaster] = useState({
    title: "",
    show: false,
    message: "",
    type: "",
  });

  const value = useMemo(() => ({ toaster, setToaster }), [toaster]);

  const { hasNavigationBack } = props;
    return (
    <Context.Provider value={value}>
      <div>
        <Header />
        {hasNavigationBack && (
          // <ArrowLeftOutlined
          //   style={{
          //     color: "#0D6EFD",
          //     fontSize: "24px",
          //     marginLeft: "5%",
          //     marginTop: "1%",
          //   }}
          //   onClick={() => navigate(-1)}
          // />
          <HiArrowLeftCircle
            style={{
              // color: "black",
              fontSize: "1.9em",
              color: "#0D6EFD",
              marginLeft: "25%",
              marginTop: "1%",
            }}
            onClick={() => navigate(-1)}
          />
        )}
        <div className="container my-2">{props.children}</div>
      </div>
      <Toaster
        title={toaster.title}
        message={toaster.message}
        type={toaster.type}
        showToast={toaster.show}
        onClose={() => setToaster({ ...toaster, show: false })}
      />
    </Context.Provider>
    )
}

export default AppLayout
