const express = require(`express`);
const app = express();
// const url = require(`url`);
// const qs = require(`querystring`);
// const bodyParser = require(`body-parser`);
const db = require(`oracledb`);
// const template = require(`./template.js`);
const code = require(`./code.js`);

app.use(express.static(__dirname + "/"));

app.get(`/`, (req, res) => {
  res.send(code.login);
});

app.get(`/join`, (req, res) => {
  res.send(code.join);
});

app.use(express.json());
app.use(express.urlencoded());
// app.use(express.bodyParser);

//post 방식
app.post(`/check`, (req, res) => {
  id = req.body.id;
  pw = req.body.pw;
  name = req.body.name;

  res.send(code.check(id, pw, name));
});

app.post(`/loginAsk`, (req, res) => {
  id = req.body.id;
  pw = req.body.pw;
  let result;
  db.getConnection(
    {
      user: "test1",
      password: "test1",
      connectString: "localhost/xe"
    },
    (err, connection) => {
      db.autoCommit = true;
      if (err) {
        console.error(err);
        return;
      }
      var sql = "select pw from member where id=:id";

      var binddata = [id];

      // console.log(sql);

      connection.execute(sql, binddata, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log("1");
        // console.log(result);
        // console.log(result.rows);
        if (result.rows == pw) {
          result = true;
        } else {
          result = false;
        }

        connection.close(err => {
          if (err) {
            console.error(err.message);
          }
          if (result) {
            res.redirect("/main");
          } else {
            res.redirect("/");
          }
        });
      });
    }
  );
});

app.get(`/main`, (req, res) => {
  res.send(code.main);
});

app.post(`/result`, (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;
  let name = req.body.name;

  db.getConnection(
    {
      user: "test1",
      password: "test1",
      connectString: "localhost/xe"
    },
    (err, connection) => {
      db.autoCommit = true;
      if (err) {
        console.error(err);
        return;
      }
      var sql = "insert into member values(:id, :pw, :name, sysdate)";

      var binddata = [id, pw, name];

      console.log(sql);

      connection.execute(sql, binddata, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(result);
        connection.close(err => {
          if (err) {
            console.error(err.message);
          }
          res.send("" + result);
        });
      });
    }
  );

  res.redirect(`/`);
});

console.log("Done");
app.listen(3000);
