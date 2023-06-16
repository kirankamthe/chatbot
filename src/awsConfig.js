import AWS from "aws-sdk";

AWS.config.update({
  region: "YOUR_AWS_REGION",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "YOUR_IDENTITY_POOL_ID",
  }),
});

export const lexRuntime = new AWS.LexRuntime();
