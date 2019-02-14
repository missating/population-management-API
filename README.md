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
* A user can add sublocations for a location
* A user can add male residents and female residents for a sublocation in a location
* A user can view all locations along with sublocations under it with their total number of residents
* A user can view a particular location
* A user can view a particular sub location
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

* Once installation is done, create a database to be used with the application

* To start the application, run

```sh
> $ npm start
```

* The APP should be up and running on `localhost:8000`

## Testing
Unit tests - Run `npm run test` on the terminal while within the project root directory. Unit testing is achieved through the use of Mocha (A JS test framework 
that runs both on Node.js and in the browser) and Chai (A BDD/TDD assertion library for node and the browser).

## API docs

