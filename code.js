const template = require(`./template.js`);

module.exports = {
  login: `
  ${template.before}
      <h1>사이트 메인</h1>
      <form action="/loginAsk" method="post">
        <div id="inputdiv">
          ID &nbsp;<input type="text" name="id" width="" id="id" /> PW
          &nbsp;<input type="password" name="pw" id="pw" width="" />
        </div>
        <div id="buttondiv">
          <input type="submit" value="login" />
          <input type="button" value="join" id="joinbutton" />
        </div>
      </form>
      <script>
        const joinbutton = document.querySelector("#joinbutton");
        joinbutton.addEventListener("click", event =>{
            location.href = "/join"
          })
      </script>
      ${template.after}
      `,
  join: `
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
          `;
  },
  main: `
  ${template.before}
  <h1>Welcome</h1>
  <button id="logoutbutton">logout</button>
  <script>
  const logoutbutton = document.querySelector("#logoutbutton");
  logoutbutton.addEventListener("click", () =>{
    location.href = "/"
  })
  </script>
  ${template.after}
  `
};

/*
const code = {
  main: `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <style>
        form {
          border: 1px solid gray;
          display: flex;
          flex-direction: column;
          width: 200px;
        }
  
        #inputdiv {
          display: flex;
          flex-direction: column;
        }
  
        #id,
        #pw {
          display: inline;
        }
      </style>
    </head>
    <body>
      <h1>사이트 메인</h1>
      <form action="/loginAsk" method="post">
        <div id="inputdiv">
          ID &nbsp;<input type="text" name="id" width="" id="id" /> PW
          &nbsp;<input type="password" name="pw" id="pw" width="" />
        </div>
        <div id="buttondiv">
          <input type="submit" value="login" />
          <input type="button" value="join" id="joinbutton" />
        </div>
      </form>
      <script>
        const joinbutton = document.querySelector("#joinbutton");
      </script>
    </body>
  </html>
  
    `,
  join: `
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
        `;
  }
};
*/
