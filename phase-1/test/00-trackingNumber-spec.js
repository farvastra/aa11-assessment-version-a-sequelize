const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const { resetDB } = require("./utils/sql-utils");
const { runValidations, runConstraints } = require("./utils/test-utils");
const data = require("./data/package-values");
const { VALID, INVALID } = data;

describe("`trackingNumber` has the proper constraints and validations", () => {
  beforeEach(function () {
    return resetDB();
  });

  const columnName = "trackingNumber";

  it("allows valid data", async () => {
    for (let value of data[columnName][VALID]) {
      await expect(
        runValidations({ [columnName]: value }),
        `"${columnName}" was supposed to pass validations when set to "${value}"`
      ).to.not.eventually.be.rejectedWith(Error);
    }
  });

  it("does not allow invalid data", async () => {
    for (let value of data[columnName][INVALID]) {
      await expect(
        runValidations({ [columnName]: value }),
        // runValidations({ [columnName]: value, trackingNumber: "1234567890" }),
        `"${columnName}" was supposed to fail validations when set to "${value}"`
      ).to.eventually.be.rejectedWith(Error);
    }

    let uniqueValue = "9876543210";
    await expect(
      runConstraints({ [columnName]: uniqueValue }, false),
      `"${columnName}" was not supposed to fail constraints when set to "${uniqueValue}"`
    ).to.not.eventually.be.rejectedWith(Error);
    await expect(
      runConstraints({ [columnName]: uniqueValue }),
      `"${columnName}" was supposed to fail constraints when there are duplicate values`
    ).to.eventually.be.rejectedWith(Error);

    // test not null in SQLite3
    await expect(
      runConstraints({ [columnName]: null }),
      `"${columnName}" was supposed to fail constraints when set to "NULL"`
    ).to.eventually.be.rejectedWith(Error);
  });
});
