# Sequelize, Phase 1 - Migrations And Models

In this initial phase, you will

* Create a Sequelize migration that allows you to create a `Packages` table
* Implement the appropriate database-level constraints to the `Packages` table
* Create a Sequelize model that allows you to create a `Package` model
* Implement the appropriate model-level validations to the `Package` model

## Getting started

1. Create a **.env** file at root-level of your project and copy the contents of
   the **.env.example** file into the newly created **.env** file.
2. Run `npm test` in the __phase-1__ directory to run all the Phase 1 test
   specs.

## Instructions

Your employer wants you to create a feature for your postal office for tracking
packages. A package should have the following attributes:

* `trackingNumber`
* `weightKg` (weight in kilograms)
* `sender` (name of the sender)
* `recipient` (full name of the recipient)
* `isDelivered` (flag indicating successful delivery)

Your job is to create a database schema as well as a Sequelize model for this
feature.

### Valid/Invalid data

Here is some **important** information you should know about how the data in the
schema should be represented:

* **no two packages** should have the same `trackingNumber`
* the table name should be `Packages`
* the model name should be `Package`

Take a look at the **test/data/package-values.js** file.

This file holds examples for both valid and invalid example values for all the
attributes.

### Create a migration and a model

Based on the example attribute values for every column in the
**test/data/package-values.js** file, you should be able to determine the
database-level constraints and model-level validations necessary to represent
this data well.

You should create:

* a migration file with the proper database-level constraints
* a model file with the proper model-level validations

To check all of your constraints and validations, run the following command in
the __phase-1__ directory:

```bash
npm test
```

To run each test file individually, run the appropriate command from the
following list in the __phase-1__ directory:

```bash
npm test test/00-trackingNumber-spec.js
npm test test/01-weightKg-spec.js
npm test test/02-sender-spec.js
npm test test/03-recipient-spec.js
npm test test/04-isDelivered-spec.js
npm test test/05-createdAt-spec.js
npm test test/06-updatedAt-spec.js
```

To remove the extra logging in the terminal when you run the test specs, in the
__config/database.js__ file, comment in the line `logging: false`.

In addition to the test specs, seeder files are included to help you debug:

You should be able to seed the database with the
**20220324203414-valid-packages.js** seed file, **BUT** you should **NOT** be
able to seed the database with any of the seeds in the
**20220325213652-invalid-packages.js** seed file.

> Note: you will be tested on the outcome of the test results, not whether or
> not the seed files run as expected.
