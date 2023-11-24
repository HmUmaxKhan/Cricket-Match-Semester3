const mysql = require("mysql2/promise");

const querySql = async ({ query, values = [] }) => {
  const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Password123#",
    database: "Cricket-Match"
  });

  try {
    // Filter out any undefined values in the values array
    const filteredValues = values.filter((value) => value !== undefined);

    const [results] = await db.execute(query, filteredValues);
    db.end();
    return results;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it at a higher level
  }
};

module.exports = querySql;
