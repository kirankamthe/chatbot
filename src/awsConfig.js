import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:f9a1b629-d69e-4e51-9acd-f9e0053182ea",
  }),
});

export const lexRuntime = new AWS.LexRuntime();
