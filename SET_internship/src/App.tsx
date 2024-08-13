import './App.css'
import Connect from "./api/connect";
import BASE_URL from "./api/endpoints";
import React from "react";

function App() {
    React.useEffect(() => {
        const con: Connect = new Connect(BASE_URL);
        async function func() {
            const data = await con.post("api/v1/auth/user/validate",{mobile: "09141035058"});
        }
        func();
    }, []);

  return (
    <>


    </>
  )
}

export default App
