import { CognitoUserPool } from "amazon-cognito-identity-js";

// Connects to the AWS Cognito User Pool
const poolData = {
  UserPoolId: "ap-southeast-2_70XMXEzjd",
  ClientId: "1meh7rvctubo992oppdju9db6g",
};

export default new CognitoUserPool(poolData);
