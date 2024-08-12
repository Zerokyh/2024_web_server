const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "qwer1234",
//   database: "studentattendance",
// });

const db = mysql.createPool({
  host: "studentdb.mysql.database.azure.com",
  user: "zero",
  password: "P@ssw0rd",
  database: "studentattendance",
  // ssl: {
  //   rejectUnauthorized: true, // 기본적으로 SSL 인증서를 확인하도록 설정
  // },
});

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const DB = {
  QUERY: {
    USERAUTHENTICATION: {
      LOGIN:
        "SELECT * FROM userauthentication WHERE account = ? AND password = ?",
      LOGINUSER: "SELECT * FROM userauthentication WHERE account = ?",
      CHANGEPWD: "UPDATE userauthentication SET password = ? WHERE account = ?",
    },
    COURSE: "SELECT * FROM studentattendance.course",
    JOIN: {
      STUDENT_ENROLLMENT_COURSE: `SELECT student.*, enrollment.*, course.*
        FROM (studentattendance.student AS student
        INNER JOIN studentattendance.enrollment AS enrollment
            ON student.student_id = enrollment.student_id
        INNER JOIN studentattendance.course AS course
            ON enrollment.course_id = course.course_id)
        WHERE course.course_id = ?
        ORDER BY student.student_id ASC`,

      STUDENT_SCHEDULE: `SELECT userauthentication.*, teacher.*, teaching.*, course.*, enrollment.*
        FROM (studentattendance.userauthentication AS userauthentication
        INNER JOIN studentattendance.teacher AS teacher
            ON userauthentication.user_id = teacher.user_id
        INNER JOIN studentattendance.teaching AS teaching
            ON teacher.teacher_id = teaching.teacher_id
        INNER JOIN studentattendance.course AS course
            ON teaching.course_id = course.course_id
        INNER JOIN studentattendance.enrollment AS enrollment
            ON teaching.course_id = enrollment.course_id)
        WHERE enrollment.student_id = ?`,

      FIND_STUDENT_NAME: `SELECT student.*, enrollment.*, course.*
        FROM (studentattendance.student AS student
        INNER JOIN studentattendance.enrollment AS enrollment
            ON student.student_id = enrollment.student_id
        INNER JOIN studentattendance.course AS course
            ON enrollment.course_id = course.course_id)
        WHERE student.student_name = ?
        ORDER BY student.student_id ASC`,
    },
  },
};

const executeQuery = async (query, params = []) => {
  try {
    const [results] = await db.execute(query, params);
    return results;
  } catch (err) {
    console.error("error executing query:", err);
    throw err;
  }
};

app.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const results = await executeQuery(DB.QUERY.USERAUTHENTICATION.LOGIN, [
      id,
      password,
    ]);
    if (results.length > 0) {
      res
        .status(200)
        .send({ message: `반갑습니다 😍😎 ${id}님! 접속을 환영합니다!` });
    } else {
      res
        .status(401)
        .send({ message: "ID 또는 비밀번호를 다시 확인해보세요." });
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/profile", async (req, res) => {
  const { account } = req.query;
  const results = await executeQuery(DB.QUERY.USERAUTHENTICATION.LOGINUSER, [
    account,
  ]);
  res.json(results);
});

app.get("/account", async (req, res) => {
  const { account } = req.query;
  const results = await executeQuery(DB.QUERY.USERAUTHENTICATION.LOGINUSER, [
    account,
  ]);
  res.json(results);
});

app.post("/account/changepwd", async (req, res) => {
  const { account, newPassword } = req.body;
  try {
    await executeQuery(DB.QUERY.USERAUTHENTICATION.CHANGEPWD, [
      newPassword,
      account,
    ]);
    res.status(200).send({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (err) {
    console.error("비밀번호 변경 중 오류 발생 :", err);
    res.status(500).send({ message: "비밀번호 변경 중 오류가 발생했습니다." });
  }
});

app.get("/course", async (req, res) => {
  const results = await executeQuery(DB.QUERY.COURSE);
  res.json(results);
});

app.get("/consulting_students_list", async (req, res) => {
  const { course_id } = req.query;
  const results = await executeQuery(DB.QUERY.JOIN.STUDENT_ENROLLMENT_COURSE, [
    course_id,
  ]);
  res.json(results);
});

app.get("/student_schedule", async (req, res) => {
  const { student_id } = req.query;
  const results = await executeQuery(DB.QUERY.JOIN.STUDENT_SCHEDULE, [
    student_id,
  ]);
  res.json(results);
});

app.get("/passivecheck", async (req, res) => {
  const results = await executeQuery(DB.QUERY.COURSE);
  res.json(results);
});
app.get("/passivecheck_students_list", async (req, res) => {
  const { course_id } = req.query;
  const results = await executeQuery(DB.QUERY.JOIN.STUDENT_ENROLLMENT_COURSE, [
    course_id,
  ]);
  res.json(results);
});
app.post("/passivecheck_search_studentname", async (req, res) => {
  const { student_name } = req.body;
  const results = await executeQuery(DB.QUERY.JOIN.FIND_STUDENT_NAME, [
    student_name,
  ]);
  res.json(results);
});
