const bcrypt = require('bcrypt');

module.exports = class LoginHandler {

 constructor(app, User){
   this.app = app;
   this.User = User;
   this.createLoginRoute();
   this.createCheckIfLoggedInRoute();
   this.createLogoutRoute();
 }

 createLoginRoute(){
   this.app.post('/json/login', async (req,res) => {
     let data = req.body;
     let user = await this.User.findOne({email: data.email});
     if(!user){
       res.json({error: 'No such user!'});
       return;
     }
     let match = await bcrypt.compare(data.password + passwordSalt, user.password);
     if(!match){
       res.json({error: 'The password does not match!'});
       return;
     }
     req.session.user = user;
     req.session.save();
     res.json({loggedIn: true});
   });

 }

 createCheckIfLoggedInRoute(){
   this.app.get('/json/login', (req, res) => {
     if(!req.session.user){
       res.json({error: 'Not logged in!'});
       return;
     }
     res.json({email: req.session.user.email});
   });
 }

 createLogoutRoute(){
   this.app.delete('/json/login/*', (req, res) => {
     delete req.session.user;
     req.session.save();
     res.json({loggedOut: true});
   });
 }

}