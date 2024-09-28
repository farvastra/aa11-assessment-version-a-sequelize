const { exec } = require("child_process");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

module.exports.runSQL = (statement) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      process.env.DB_FILE,
      sqlite3.OPEN_READWRITE
    );
    db.run(statement, function (err) {
      db.close();
      err ? reject(err) : resolve();
    });
  });
};

const runMigrations = async function () {
  return new Promise((resolve, reject) => {
    const migrate = exec(
      "npx sequelize-cli db:migrate",
      { env: process.env },
      (err) => (err ? reject(err) : resolve())
    );
  });
};

// const removeTestDB = async function () {
//   return new Promise((resolve, reject) => {
//     const deleteDB = exec(
//       `rm ${process.env.DB_FILE} || true`,
//       { env: process.env },
//       err => (err ? reject(err): resolve())
//     );
//   }
// )};

const removeTestDB = async function () {
  return new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, process.env.DB_FILE);
    fs.unlink(dbPath, (err) => {
      if (err && err.code !== "ENOENT") {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
// module.exports.seedAllDB = async function () {
//   return new Promise((resolve, reject) => {
//     const seed = exec(
//       "npx sequelize-cli db:seed:all",
//       { env: process.env },
//       (err) => (err ? reject(err) : resolve())
//     );
//   });
// };

const execPromise = promisify(exec);

module.exports.seedAllDB = async function () {
  try {
    // Run the seed command
    const { stdout, stderr } = await execPromise(
      "npx sequelize-cli db:seed:all",
      {
        env: process.env,
      }
    );
    if (stdout) {
      console.log(`stdout: ${stdout}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    return "Seed operation completed successfully";
  } catch (error) {
    console.error(`Error during seed operation: ${error.message}`);
    throw new Error(`Failed to seed database: ${error.message}`);
  }
};


module.exports.seedDBFile = async function (fileName) {
  try {
    const { stdout: statusProcess } = exec(
      `npx sequelize-cli db:migrate:status`,
      { env: process.env }
    );

    const statusProcessString = statusProcess.toString();

    if (statusProcessString.includes(`Migration ${fileName} is not pending`)) {
      console.log(
        `Skipping seed file ${fileName} because migration is not pending`
      );
    } else {
      exec(`npx sequelize-cli db:seed --seed ${fileName}`, {
        env: process.env,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const replaceFilesScript = `
destination_dir=.
original_dir=./test/original-files
find "$original_dir" -type f -exec bash -c 'cp -v $0 "\${0/$1/$2}"' {} $original_dir $destination_dir \\;
`;

module.exports.resetFiles = async function () {
  return new Promise((resolve, reject) => {
    const replaceFilesProcess = exec(
      replaceFilesScript,
      { env: process.env },
      (err) => (err ? reject(err) : resolve())
    );
    replaceFilesProcess.stdout.on("data", function (data) {
      console.log(data);
    });
  });
};

module.exports.resetDB = async function () {
  await removeTestDB();
  await runMigrations();
};
