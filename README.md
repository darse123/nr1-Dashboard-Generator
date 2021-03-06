# Dashboard Generator

## Usage

This application creates dashboards for your account. There are many dashboards for different New Relic Products. 


![Screenshot #1](screenshots/Dashboard%20Image.png)

## Open Source License

This project is distributed under the [Apache 2 license](blob/master/LICENSE).

## What do you need to make this work?

Required:
1. [Admin API Key](https://docs.newrelic.com/docs/apis/get-started/intro-apis/types-new-relic-api-keys#admin).
2. See step 1. :grin:

## Getting started

Clone this repository and run the following scripts:

```bash
nr1 nerdpack:clone -r git@github.com:darse123/nr1-Dashboard-Generator.git
cd dashboard-generator/
nr1 nerdpack:uuid -gf
npm install
npm start
```

Visit [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local), navigate to the Nerdpack, and :sparkles:

## Deploying this Nerdpack

Open a command prompt in the nerdpack's directory and run the following commands.

```bash
# this is to create a new uuid for the nerdpack so that you can deploy it to your account
nr1 nerdpack:uuid -g [--profile=your_profile_name]
# to see a list of APIkeys / profiles available in your development environment, run nr1 credentials:list
nr1 nerdpack:publish [--profile=your_profile_name]
nr1 nerdpack:deploy [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
nr1 nerdpack:subscribe [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
```

Visit [https://one.newrelic.com](https://one.newrelic.com), navigate to the Nerdpack, and :sparkles:

## Support

While the creator of this Nerdpack is employed by New Relic - this Nerdpack is offered as a personal project, as such not supported by New Relic. For assistance please submit requests through: https://github.com/darse123/nr1-Dashboard-Generator/issues
