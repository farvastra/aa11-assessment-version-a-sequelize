const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const { resetDB, seedAllDB } = require("../../test-utils/test-utils");
const { Car } = require("../db/models");
const { validCars } = require("../db/seeders/20220330155025-valid-car-seeds");

describe("Phase 2 Specs - Cars", () => {
  beforeEach(async () => {
    console.log("Resetting database...");
    await resetDB();
  });

  it("commits all seeder files successfully", async () => {
    console.log("Seeding database...");
    await expect(seedAllDB()).to.not.eventually.be.rejectedWith(Error);
    console.log("Database seeded, counting cars...");
    const numCars = await Car.count({});
    expect(numCars).to.be.at.least(
      validCars.length,
      "Database should have at least as many cars as there are in validCars"
    );
  });

  it("has at least 3 entries in the Cars table after committing all seeder files", async () => {
    await seedAllDB();
    const numCars = await Car.count({});
    expect(numCars).to.be.at.least(3);
  });
});
