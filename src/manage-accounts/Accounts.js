import React, { createContext } from "react";
import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountContext = createContext();
const Account = (props) => {
  // Function to Get the Current Session's Information (Logged in or not)
  const getSession = async () => {
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  // Function to Authenticate Users in AWS Cognito
  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool: UserPool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess", data);
          resolve(data);
        },

        onFailure: (err) => {
          console.error("onFailure", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired", data);
          resolve(data);
        },
      });
    });
  };

  // Function to logout the User
  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
