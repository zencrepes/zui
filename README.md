<h1 align="center"> ZenCrepes ZUI </h1><br>

<p align="center">
This repository contains ZenCrepes user interface.
</p>

## Table of Contents

- [Introduction](#introduction)
- [Get Started](#get-started)
  - [Environment Variables](#environment-variables)
  - [Docker](#docker)
  - [Development](#development)
- [Dev Guidelines](#dev-guiderlines)
  - [Queries](#queries)
  - [GraphQL API](#graphql-api)
  - [Everything is a Query](#everything-is-a-query)
  - [Redux](#redux)
  - [Views and Components](#views-and-components)
- [Contribute](#contribute)
- [Reach-out](#reach-out)

## Introduction

This repository will focus only on the UI code itself, to find out more about the product in general (features, questions) please refer to zencrepes repo (https://github.com/zencrepes/zencrepes).

ZenCrepes's UI is a React codebase reaching out to a GraphQL API (https://github.com/zencrepes/zapi) for its data.

## Get Started

### Environment Variables

| Variable        | Default                       | Description                                                            |
| --------------- | ----------------------------- | ---------------------------------------------------------------------- |
| API_URL         | http://127.0.0.1:5000/graphql | Url of ZenCrepes GraphQL API                                           |
| AUTH0_DISABLED  | true                          | Disable the use of Auth0 as an authentication / authorization provider |
| AUTH0_DOMAIN    | zencrepes.auth0.com           | Auth0 domain                                                           |
| AUTH0_CLIENT_ID | ---                           | Auth0 client ID                                                        |
| AUTH0_AUDIENCE  | http://localhost:3000         | Auth0 audience (ZenCrpes GraphQL API)                                  |

NOTE: Auth0 is not implemented yet.

In dev mode, those environment files are specified in a `.env` file at the root of the repo.

### Docker

Docker images are automatically built and pushed to Docker Hub (https://hub.docker.com/orgs/zencrepes)

### Development

First clone the repository, then:

```bash
yarn
yarn run start:dev
```

-

## Dev Guidelines

The UI is using Material-UI, considering the resources constraints in developing ZenCrepes, please try avoid any custom styling and stay as close as possible to Material-UI styling.

### Queries

Queries are the single most important element in ZenCrepes, they define which data is being displayed and trigger refresh of entire sections of the application when being refreshed.

Queries are built following SQON (Simple Query Object Notation) JSON object format (https://arranger.readthedocs.io/en/latest/src/sqon.html) which provides a simplified mean of generating elasticsearch queries (https://www.npmjs.com/package/@arranger/middleware).

For example, you can get all Open issues assigned to `bob` using the following query:

```json
{
  "op": "and",
  "content": [
    {
      "op": "in",
      "content": {
        "field": "state",
        "value": ["OPEN"]
      }
    },
    {
      "op": "in",
      "content": {
        "field": "assignees.edges.node.login",
        "value": ["bob"]
      }
    }
  ]
}
```

### GraphQL API

Please refer to Zencrepes ZAPI repository for in depth details about the API, this section will only contain high-level details.

Aside from the GraphQL documentation, the API was designed to facilitate exploration, for example you can get the list of available datasets with the following query:

```gql
query {
  config {
    datasets {
      nodes {
        id
      }
    }
  }
}
```

A list of available fields can be fetched from the GraphQL API (ZAPI) using the following query:

```gql
# githubPullrequests is one of the IDs that can be fetched with the datasets query listed above
query {
  githubPullrequests {
    config {
      aggregations {
        nodes {
          name
          field
        }
      }
    }
  }
}
```

### Everything is a Query

Whenever possible, charts should be clickable and when clicking on a chart element, the corresponding SQON query should be generated to filter data accordingly.

There might be situations in which expressing a particular chart element as a query is particularly complex, in such cases, there it is always possible to express this dataset using the items IDs, for example:

```json
{
  "op": "and",
  "content": [
    {
      "op": "in",
      "content": {
        "field": "state",
        "value": ["OPEN"]
      }
    },
    {
      "op": "in",
      "content": {
        "field": "id",
        "value": ["ID1", "ID2", "ID3"]
      }
    }
  ]
}
```

### Redux

ZenCrepes uses [rematch](https://rematch.github.io/rematch/#/README?id=rematch) as a redux framework. Rematch greatly simplifies the use of Redux while allowing ui components to be implemented following redux principles (i.e. there are no rematch logic in the view layer).

Each "view" aims at having its own model while a global model is available for cross-app redux states. The global model is initialized on app load, the other models are initialized when their corresponding views are loaded.

### Views and Components

Views represent the various datsets available for querying, each view MUST be independeant from each-other.

Components are reusasble pieces of code, they must not connect to redux and must not import elements from the views.
