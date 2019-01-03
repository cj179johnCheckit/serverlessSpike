# Serverless SPIKE

running with serverless v1.35.1

## Usage

This project can be used for deploy 3 lambdas in the AWS cloud. It consists 2 different stacks. One is the shared resource stack, another is the lambda stack

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
