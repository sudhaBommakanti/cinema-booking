async function testLogin(){
 
  // credentials we want to login with
  let login = new Login({
    email: 'pontus@skibidi.com',
    password: '123abc'
  });
 
  // try to login
  console.log(await login.save());
 
}
 
async function testCheckLogin(){
  console.log(await Login.find());
}
 
async function testLogout(){
  let loginObj = new Login();
  console.log(await loginObj.delete());
}
 
testLogin();
//testCheckLogin();
// testLogout();
