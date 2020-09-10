import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Accounts";

export default () => {
  // By Default The user is not logged in
  const [status, setStatus] = useState(false);
  const { getSession } = useContext(AccountContext);

  // If User Has Logged in
  useEffect(() => {
    getSession().then((session) => {
      console.log("Session", session);
      setStatus(true);
    });
  });

  return <div>{status ? "You Are Logged In" : "Please Login Below"}</div>;
};
