
async function testCheckLogin() {
  console.log(await Login.find());
}

async function testLogout() {
  let loginObj = new Login();
  console.log(await loginObj.delete());
}

//testLogin();
//testCheckLogin();
// testLogout();