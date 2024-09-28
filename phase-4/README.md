# Sequelize, Phase 4 - Associations

In this phase, you will

* Create one-to-many relationships and associations between the `EntreeTypes`
  and `Entrees` table
* Create many-to-many relationships and associations between the `Ingredients`
  and `Entrees` table
* Implement an API endpoint to create an entry in the `Entrees` table for an
  `EntreeType` specified by `id`
* Implement an API endpoint to return all the entries in the `Entree` table
  along with its associated `Ingredients`

## Getting started

1. Create a **.env** file at root-level of your project and copy the contents of
   the **.env.example** file into the newly created **.env** file.
2. Run `npm test` in the __phase-4__ directory to run all the Phase 4 test
   specs.

## Instructions

This phase is split into three parts:

1. Create relationships in the database schema
2. Create the relevant associations on the models
3. Implement API endpoints that use the associations

### Create Schema Relationships

Run the migration files, **but do not run the seed files just yet.** Take a
look at the migration and model files to familiarize yourself with the data of
this application.

This is the current state of the database schema after migrating the existing
migration files:

![db-schema-before]

**You must turn the current state of the database schema above to the following
database schema below:**

![db-schema-after]

Change the database schema by doing **one or more of the following:**

* Creating new migration files
* Updating the existing model files
* Creating new model files

Do **NOT** change the database schema by:

* Updating the existing migration files

**Important:** You must create new migrations to implement the
relationships. **Any changes to the existing migration files will be reset when
you submit your assessment.**

Here's other information that you need to know about the `Entrees` to
`EntreeTypes` relationship to represent in the database schema:

* An `Entree` does not need an `EntreeType` (the `entreeTypeId` column value
  can be `NULL`).
* When an `EntreeType` gets destroyed, all of the `Entree`s that are related to
  the `EntreeType` should also be destroyed.

### Create Associations

Next, create the associations on the models to appropriately represent the
relationships by associating:

* `Entree` model to the `EntreeType` model
* `EntreeType` model to the `Entree` model
* `Entree` model to the `Ingredient` model
* `Ingredient` model to the `Entree` model

**At this point, try running the seeder files.** If the seeders are committed
successfully, then that is a good indicator that you set up your migrations and
model associations correctly.

Run the following command in the __phase-4__ directory to see if your
migrations and model associations pass the test specs:

```sh
npm test test/01-db-and-model-spec
```

### Create API Endpoints

Add the following API endpoints to the server in **app.js**:

### POST /entreeTypes/:type/entrees

Create an entry in the `Entrees` table associated with an `EntreeType`
specified by its `type` attribute.

Request:

* Method: `POST`
* Example URL: `/entreeTypes/Beef/entrees`
* Headers:
  * Content-Type: application/json
* Example Body:

  ```json
  {
    "name": "Beef Stew",
    "description": "Warm, hearty beef stew",
    "price": 10.99
  }
  ```

Response:

* Status Code: `200`
* Headers:
  * Content-Type: application/json
* Example Body:

  ```json
  {
    "id": 6,
    "name": "Beef Stew",
    "description": "Warm, hearty beef stew",
    "price": 10.99,
    "entreeTypeId": 1,
    "createdAt": "2022-03-30T21:15:48.438Z",
    "updatedAt": "2022-03-30T21:15:48.438Z"
  }
  ```

Run the following command in the __phase-4__ directory to test this endpoint:

```sh
npm test test/02-create-spec
```

### GET /entrees/recipes

Returns all the entries in the `Entrees` table **AND** its associated
`Ingredients` eagerly loaded.

Request:

* Method: `GET`
* URL: `/entrees/recipes`
* Headers: none
* Body: none

Response:

* Status Code: `200`
* Headers:
  * Content-Type: application/json
  * Body: All the entries in the `Entrees` table **AND** its associated
    `Ingredients` eagerly loaded

Run the following command in the __phase-4__ directory to test this endpoint:

```sh
npm test test/03-read-spec
```

Run `npm test` in the __phase-4__ directory to make sure you pass all the tests.

[db-schema-before]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-11/assessments/db-schema-before.jpg
[db-schema-after]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-11/assessments/entrees-db-schema-after.png
