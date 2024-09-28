require("dotenv").config();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
let runSQL;
try {
  const sqlite3 = require("better-sqlite3");

  runSQL = (statement) => {
    return new Promise((resolve, reject) => {
      const db = sqlite3(process.env.DB_FILE);
      const stmt = db.prepare(statement);
      try {
        const result = stmt.run();
        db.close();
        resolve(result);
      } catch (err) {
        db.close();
        reject(err);
      }
    });
  };
} catch {
  const sqlite3 = require("sqlite3").verbose();

  runSQL = (statement) => {
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
}

module.exports.runSQL = runSQL;

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
//     const dbPath = path.join(__dirname, process.env.DB_FILE);
//     fs.unlink(dbPath, (err) => {
//       if (err && err.code !== "ENOENT") {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };

// const removeTestDB = async function () {
//   return new Promise((resolve, reject) => {
//     const deleteDB = exec(
//       `rm ${process.env.DB_FILE} || true `,
//       { env: process.env },
//       (err) => (err ? reject(err) : resolve())
//     );
// });
// };

const removeTestDB = async function () {
  return new Promise((resolve, reject) => {
    const dbPath = process.env.DB_FILE;

    // Check if DB_FILE is provided in the environment variables
    if (!process.env.DB_FILE) {
      return reject(new Error("DB_FILE environment variable is not set."));
    }

    fs.unlink(dbPath, (err) => {
      if (err && err.code !== "ENOENT") {
        reject(err);
      } else {
        if (err && err.code === "ENOENT") {
          console.log(`Test DB file not found: ${dbPath}`);
        }
        resolve();
      }
    });
  });
};

module.exports.resetDB = async function () {
  await removeTestDB();
  await runMigrations();
};
