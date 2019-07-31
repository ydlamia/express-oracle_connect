const express = require(`express`);
const app = express();
// const url = require(`url`);
// const qs = require(`querystring`);
// const bodyParser = require(`body-parser`);
const db = require(`oracledb`);


const template = {
    before: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    
    <body>`,
    after: `
    </body>
    
    </html>`
}

const code = {

    html: `
    ${template.before}
        <form action="/login" method="get">
            <input type="submit" value="로그인창 이동">
        </form>
    ${template.after}
    
    
    `,
    login: `
    ${template.before}
        <form action="/check" method="post">
            아이디 입력 : <input type="text" name="id" ><br>
            비밀번호 입력 : <input type="password" name="pw" ><br>
            이름 입력 : <input type="text" name="name" ><br>
            <input type="submit" value="transfer">
        </form>
        ${template.after}
    `,
    check: function check(id, pw, name) {
        return `
        ${template.before}
            <form action="/result" method="post">
                아이디 : ${id}<br><input type=hidden name="id" value=${id}> 
                비밀번호 : ${pw}<br><input type=hidden name="pw" value=${pw}>
                이름 : ${name}<br><input type=hidden name="name" value=${name}>
                <input type="submit" value="confirm">
            </form>
            ${template.after}
        `
    }
};



app.get(`/`, (req, res) => {
    res.send(code.html);
})

app.get(`/login`, (req, res) => {
    res.send(code.login);
})
/*
//get방식
app.get(`/result`, (req, res) => {
    var qsstr = qs.parse(url.parse(req.url).query);
    id = qsstr.id;
    pw = qsstr.pw;
    res.send(code.result(id, pw))
})
*/

app.use(express.json());
app.use(express.urlencoded())
// app.use(express.bodyParser);

//post 방식
app.post(`/check`, (req, res) => {
    id = req.body.id;
    pw = req.body.pw;
    name = req.body.name;
    // console.log(name);

    res.send(code.check(id, pw, name))
})

app.post(`/result`, (req, res) => {

    // console.log("id : " + req.body.id);
    // console.log("pw : " + req.body.pw);
    // console.log("name : " + req.body.name);
    let id = req.body.id;
    let pw = req.body.pw;
    let name = req.body.name;

    db.getConnection({
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
            // var sql = `insert into member values('` + id + `','` + pw + `','` + name + `',sysdate)`;
            // var sql = "insert into member values('" + id + "','" + pw + "','" + name + "',sysdate)";
            // var sql = "insert into member values('test','test1','jay',sysdate)";
            var sql = "insert into member values(:id, :pw, :name, sysdate)";

            var binddata = [
                id, pw, name
            ];

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
                    res.send('' + result)
                })

                // console.log(result.rows);

            })
            /*
            connection.execute("commit", (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(result.rowsAffected);

                // console.log(result.rows);

            })
            */

        }
    )

    res.redirect(`/`)
})



console.log("Done")
app.listen(3000);