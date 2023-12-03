const mysql = require("mysql2/promise");

const querySql = async ({ query, values = [] }) => {
  const db = await mysql.createConnection({
    host: "crickcruiser-crick-cruiser.a.aivencloud.com",
    port:"10543",
    user: "avnadmin",
    password: "AVNS_Z-OsLcI50pN17xDjzED",
    database: "criccruiser"
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
