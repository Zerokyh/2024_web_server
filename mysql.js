const mysql = require("mysql2/promise");

const getStudents = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "qwer1234",
      database: "attendance",
    });

    const [results] = await connection.query("SELECT * FROM STUDENTS");
    console.log(results);
    await connection.end();
    return results;
  } catch (err) {
    console.log(err);
  }
};

getStudents();
