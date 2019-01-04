# Serverless SPIKE

Running with serverless v1.35.1, on MacOS High Sierra

## Usage

This project can be used for deploy 3 lambdas with 2 of them attached to APIGateway in the AWS cloud. It consists 2 different stacks. One is the shared resource stack, another is the lambda stack

## Installation

Create S3 bucket named "checkit-serverless-spike-deployment"
Create S3 bucket named "checkit-serverless-spike-resources-deployment"
Create AWS profile named "serverless" locally. (The sample template uses serverless as profile name)
Install serverless globally `npm i serverless -g`.
In the root directory, `src/functions/hub` and `src/functions/shared`, run `npm i`.

## Deploy stacks

Deploy the resource stack first, go to `resource-stack/`, run `sls deploy --stage dev`
Deploy the function stack, go to root directory, run `sls deploy --stage dev`

## Remove stacks

Remove the function stack first, go to root directory, run `sls remove --stage dev`
Remove the resource stack, go to `resource-stack/`, run `sls remove --stage dev`

## Testing the functions

After deployed the functions, you may curl the APIGateway to test the functions.
The endpoint and api key would be generated and showed on the screen after the deployment.

The api key goes into x-api-key header

example:
  `https://API_GATEWAY_ENDPOIN/dev/show?name=checkit`

expected result:

```json
{
    "code": 200,
    "header": {
        "content-type": "application/json"
    },
    "body": "{\"message\":\"My name is checkit\"}"
}
```