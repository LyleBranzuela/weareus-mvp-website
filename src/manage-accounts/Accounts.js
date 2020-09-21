import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import AWS from "aws-sdk";

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

// Google Sign-in button's callback when pressed
function googleSignInCallBack(authResult) {
  if (!authResult.error) {
    // Add the Google access token to the Amazon Cognito credentials login map.
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: UserPool.UserPoolId,
      Logins: {
        "accounts.google.com": authResult["id_token"],
      },
    });

    // Obtain AWS credentials
    AWS.config.credentials.get(function () {
      // Access AWS resources here.
    });
  }
}

// Facebook Sign-in button's callback when pressed
function facebookSignInCallBack() {
  const FB = window.FB;
  FB.login(function (response) {
    // Check if the user logged in successfully.
    if (response.authResponse) {
      console.log("You are now logged in.");

      // Add the Facebook access token to the Amazon Cognito credentials login map.
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: UserPool.UserPoolId,
        Logins: {
          "graph.facebook.com": response.authResponse.accessToken,
        },
      });

      // Obtain AWS credentials
      AWS.config.credentials.get(function () {
        // Access AWS resources here.
      });
    } else {
      console.log("There was a problem logging you in.");
    }
  });
}

export {
  getSession,
  authenticate,
  logout,
  googleSignInCallBack,
  facebookSignInCallBack,
};
