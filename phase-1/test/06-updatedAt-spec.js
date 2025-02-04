const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const { resetDB } = require("./utils/sql-utils");
const { runValidations, runConstraints } = require("./utils/test-utils");
const data = require("./data/package-values");
const { VALID, INVALID } = data;

describe("`updatedAt` has the proper default value constraint", () => {
  beforeEach(function () {
    return resetDB();
  });

  const columnName = "updatedAt";
  it('defaults to a value of "CURRENT_TIMESTAMP" when the value is not explicitly set', async () => {
    // test not null in SQLite3
    await expect(
      runConstraints({ [columnName]: 'DEFAULT' }),
      `"${columnName}" was supposed to pass constraints when not explicitly set`
    ).to.not.eventually.be.rejectedWith(Error);
  });
});
