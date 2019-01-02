# Serverless SPIKE

running with serverless v1.35.1

## Usage
This project can be used for deploy 3 lambdas in the AWS cloud. It consists 2 different stacks. One is the shared resource stack, another is the lambda stack

## Installation
install serverless globally `npm i serverless -g`.
In the root directory, `src/functions/hub` and `src/functions/shared`, run `npm i`.

## Deploy stacks

deploy the resource stack first, go to `resource-stack/`, run `sls deploy --stage dev`
deploy the function stack, go to root directory, run `sls deploy --stage dev`