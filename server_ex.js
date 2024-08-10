const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const DATABASE = {
  LOGIN: {
    host: "localhost",
    user: "root",
    password: "qwer1234",
    database: "attendance",
  },
};

const mysql = require("mysql2/promise");
const getStudents = async (sql) => {
  try {
    const connection = await mysql.createConnection(DATABASE.LOGIN);
    const [results] = await connection.query(sql);
    await connection.end();
    return results;
  } catch (err) {
    console.log(err);
  }
};

// const getIdStudents = async (id) => {
//   try {
//     const connection = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "qwer1234",
//       database: "attendance",
//     });

//     const [results] = await connection.query(
//       `SELECT * FROM STUDENTS WHERE ID = ${id}`
//     );
//     await connection.end();
//     return results;
//   } catch (err) {
//     console.log(err);
//   }
// };

// const getAddStudents = async (address) => {
//   try {
//     const connection = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "qwer1234",
//       database: "attendance",
//     });

//     const [results] = await connection.query(
//       `SELECT * FROM STUDENTS WHERE ADDRESS LIKE "${address}%"`
//     );
//     await connection.end();
//     return results;
//   } catch (err) {
//     console.log(err);
//   }
// };
app.use(bodyParser.json());
app.listen(3000); // localhost:3000으로 실행

app.get("/", (req, res) => {
  res.send("<h1>오여누는 지각생이다.</h1>");
});

app.get("/icecream", (req, res) => {
  res.send("오여누는 메로나를 좋아한다");
});

app.get("/rap", (req, res) => {
  res.send("오여누는 랩을 좋아한다");
});

app.get("/movie", (req, res) => {
  const movie = [
    {
      name: "인사이드아웃2",
      running: 90,
    },
    {
      name: "파일럿",
      running: 100,
    },
    {
      name: "사랑의 하츄핑",
      running: 70,
    },
  ];

  res.json(movie);
});

// /students 치면
// app.get("/students", async (req, res) => {
//   res.json(await getStudents());
// });

app.get("/students", async (req, res) => {
  const data = await getStudents("select * from students");
  console.log(data);
  res.send(`
    <section style="display: flex; flex-direction: column; gap: 20px">
        ${data
          .map(({ name, phone, address }) => {
            return `
            <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100px;
          padding: 20px;
        "
      >
        <div
          style="
            width: 50px;
            height: 50px;
            border-radius: 9999px;
            border: 1px solid grey;
          "
        >
          <img
            style="
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: 9999px;
            "
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgGCQkKBwoHBwYGBxsIFQgKIB0WIiAdHx8YIiggGBolGxMfITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0NDysZFRkrLSsrKystKysrKysrKysrKysrKysrKysrKysrKy0rKysrKysrKysrKysrKysrKysrK//AABEIAOYA2wMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEG/8QAOxABAQABAwEEBQcKBwAAAAAAAAIDAQQSMgUiUnIxM0JRYhNBcYKRorEUIyRTkpOhwdHhERUhNGFjgf/EABgBAQEBAQEAAAAAAAAAAAAAAAADAgEE/8QAHBEBAQEBAQADAQAAAAAAAAAAAAECETESIUFR/9oADAMBAAIRAxEAPwD64B73kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB1wvwZf2NXOoAAAAAAAAAAAAAAAAAAAAAACXBt73Ffm57vtVXolJs9rW4vlXRp1V4v+NGvEzEaTM8Z06ZY1rjUz1Vw7DFHrPzlfF6PsWpmZ6ZifLL0Tttb4OaiL6pmvNLocFLP2fjr1fcrw/MzsuLJhrjknj+FfQ3nGbFGaOGSe7/Gfobm7GblgiXcYK2+TjXT7NeKUSrAAAAAAAAAAAAAAAAA6xxV5Jxz1a1xcr3ZOPlku/dPGfNq5byEjRxY5w49Mc9OjoEFQAAAAAEG8wflGCp9rTvR5mK+hY2/x8Nxfh178/wDqmL+M6iuAowAAAAAAAAAAAAAANXsvT9GqvfdMprdl6/o/0XTO/Gs+rYCLYAAAAAAze1tO9ir4alpM7tbXvY5+Gq/BrPrmvGeAsmAAAAAAAAAAAAAANDsnJ3rj39+f5s93gusOTS5+av2pc1Ox2X7bw5i5udLnp1nk6QUAAAAAAGP2jk57ivDEzH9Wnus07fBV+10z8VMTXXl3vepifrOq8AUYAAAAAAAAAAAAAAAAWtluvyeuNer1+7Xva06zU8prlOvhfPptvuMu36e9P6mvQxrPWpptirh32G+quFeGvR9qzprNdNcvLSdnG+vQeVUz1VpPmpweucmScMVeSuM6K2bfYo9X36+H0fazc+a9xXLJXlnp0luZtcunW63FbjJy6Z06J8MoQVTAAAAAAAAAAAAAAAAAAASY8GW+mKr4uP8AoCN7prU9NVPlpans/NXV8nP1kmnZl+1ln6s6ufKO8qn8rl/WZf3mrnXWq6q5eal//LP+37n93OvZl+zl0rzTq58ocqiLV7DcT7M15aV6x3HrMes+aXexzjkB0AAAAAAAAAAAAAAAS4MF7i+M/Wr5pBHppy7s97yrmDs+772auE+H513bbWNvHd71+1lr0p07v+NzKHFtcOHpjTl4q72qYGGgBwAADXQAVs2xw30zwrxY/wCihn2eXF3uuPFP89GwNTVjlzHzw1d1sZvv4/8ACL/hTLqai6mp41p1SrNSsWceAOuAAAAAAAAAOscVdTE9WtcQd7bBW4ycZ6farwy2cWPHijhjnjLzb4Z2+PTHP1q8VJEda6pJwAZdAAAAAAAAAAEG6207ifDenTScdGBU1FVFTxrRy19/tvlsfKeuPvT7mQtm9Ts4AOuAAAAAADS7Mw8ZrLXVr3Y8rPiedaRPVrUy3omYiZnp0mZljd+msx6Ak2AAAAAAAAAAAAAAMntHBwz856b+7TWQbzF8rtrn2tO9Pm0azeVyzsYoCyYAAAAAC32ZHLccvBNV9ZrKHZE93JXxTK+ju/amfABl0AAAAAAAAAAAAAAABhbmOGe8furu+X0o1vtOeO45e+JVF54lfQB0AAAAa3Zf+2rz1+Gi2COvVJ4AMugAAAAAAAAAAAAAAAM3tb1mP6K/FQBbPid9AGnH/9k="
            alt=""
          />
          <div>${name}</div>
          <div style="font-size: 12px">${phone}</div>
          <div style="font-size: 12px">${address}</div>
        </div>
      </div>
            `;
          })
          .join("")}
        </section>
    `);
});

app.get("/api/students", async (req, res) => {
  res.json(await getStudents());
});

app.get("/cars/:id", (req, res) => {
  res.send(`Cars ID : ${req.params.id}`);
});

// student 아이디로 고유 학생만 나타내기! json
// app.get("/api/students/:id", async (req, res) => {
//   const data = await getStudents(
//     `SELECT * FROM STUDENTS WHERE ID = ${req.params.id}`
//   );
//   res.json(data[0]);
// });

// 주소로 검색
app.get("/api/students/search", async (req, res) => {
  const data = await getStudents(
    `SELECT * FROM STUDENTS WHERE ADDRESS LIKE "${req.query.address}%"`
  );
  res.json(data);
});

app.post("/api/students/test", (req, res) => {
  const { name, age, desc } = req.body;
  console.log({ name, age, desc });
  res.json({ result: "ㅊㅋ" });
});

// 학생 이름 수정하는 API 만들기
// post id와 이름을 줬을때, 수정하면됨
const updateStudentsID = async (id, name) => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "qwer1234",
      database: "attendance",
    });

    const [results] = await connection.query(
      `UPDATE STUDENTS set name="${name}" WHERE ID=${id}`
    );
    await connection.end();
    return results;
  } catch (err) {
    console.log(err);
  }
};

// app.post("/api/student/rename", async (req, res) => {
//   const { id, name } = req.body;
//   updateStudentsID(id, name);
//   const data = await getStudents();
//   res.json(data);
// });

// app.post("/api/student/rename", async (req, res) => {
//   const { id, name } = req.body;
//   const data = await updateStudentsID(id, name);
//   res.json(data);
// });

app.post("/api/student/rename", async (req, res) => {
  const { id, name } = req.body;
  const data = await updateStudentsID(
    `UPDATE STUDENTS set name="${name}" WHERE ID=${id}`
  );
  res.json(data);
});
