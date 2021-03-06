[![Build Status](https://travis-ci.org/missating/population-management-API.svg?branch=develop)](https://travis-ci.org/missating/population-management-API)
[![Coverage Status](https://coveralls.io/repos/github/missating/population-management-API/badge.svg)](https://coveralls.io/github/missating/population-management-API)

# population-management-API

## Introduction

> **Population management system** is an API that allows users take account population for a locatoion and sub locations under it.

## Table of Content
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Testing](#testing)
- [API Docs](#api-docs)

## Features

* A user can add a location
* A user can add sublocations under a location
* A user can add male residents and female residents for a sublocation under a location
* A user can view all locations along with sublocations under it with their total number of residents
* A user can view a particular location
* A user can view a particular sublocation
* Deleting a location deletes it sublocations

## Technologies

1. [Nodejs](https://nodejs.org/en/)
1. [Postgresql](https://www.postgresql.org/)
1. [Express](https://expressjs.com/)
1. [Sequelize](http://docs.sequelizejs.com/)
1. [Mocha](https://mochajs.org/)
1. [Chai](http://www.chaijs.com/)

## Installation

* Install `Node.js` on your local machine
* Then, Clone the repo by running

```sh
> $ git clone https://github.com/missating/population-management-API.git
```

* Change directory into the root of the project

```sh
> $ cd population-management-API
```

* Install all needed dependencies by running

```sh
> $ npm install
```

* Once installation is done, create a database to be used with the application using the details in the `src/config.js` and `.env.example`

* Migrate the database by running `sequelize db:migrate`

* To start the application, run

```sh
> $ npm start
```

* The APP should be up and running on `localhost:8000`

## Testing
Unit tests - Run `npm run test` on the terminal while within the project root directory. Unit testing is achieved through the use of Mocha (A JS test framework 
that runs both on Node.js and in the browser) and Chai (A BDD/TDD assertion library for node and the browser).

## API docs

# Locations

* POST `localhost:8000/api/v1/location`

  * To add a location, hit this endpoint via postman and supply the `name`, to the request body

* GET `localhost:8000/api/v1/location`
  * To view all locatoion with the sublocation below it details
  
* DELETE `localhost:8000/api/v1/location/:mainLocationId`
    * To delete a location, supply the location id i.e mainLocationId as a params to the route.

  **NOTE**: Deleting a location removes all sublocations under the location.

* GET `localhost:8000/api/v1/location/:mainLocationId`
  * To view a particular location, supply the location id i.e mainLocationId as a params to the route.

* PUT `localhost:8000/api/v1/location/:mainLocationId`
  * To edit the details of a location, hit this endpoint via postman and supply the details you wish to edit e.g `name`, to the request body, also supply the location id i.e mainLocationId as a params to the route.





# SubLocations

* POST `localhost:8000/api/v1/sublocation/:mainLocationId`

  * To add a sublocation under a location, hit this endpoint via postman and supply the `name`, `maleResidents`, `femaleResidents` to the request body. And the id of the main location this sublocation is under as params .

* GET `localhost:8000/api/v1/sublocation`
  * To view all sublocation with their main locations
  
* DELETE `localhost:8000/api/v1/sublocation/:subLocationId`
    * To delete a sublocation, supply the sublocation id i.e subLocationId as a params to the route.

* GET `localhost:8000/api/v1/sublocation/:subLocationId`
  * To view a particular location, supply the location id i.e subLocationId as a params to the route.

* PUT `localhost:8000/api/v1/sublocation/:subLocationId`
  * To edit the details of a sublocation, hit this endpoint via postman and supply the details you wish to edit e.g `name`, `femaleResidents`, `maleResidents` to the request body, also supply the sublocation id i.e subLocationId as a params to the route. 
