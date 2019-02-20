class Login extends Component {
    constructor(props) {
    super(props);
    this.addRoute('/login', 'Logga in');
    
    this.addEvents({
      'click .submit-btn': 'login',

      'click .register-btn': 'register'
    })
    this.loggedIn = false;
  }
  static get baseRoute() {
    return 'login/';
  }
 
  /**
  *
  * To go back to the start page after logged out and loads the web browser
  *
  */

  async delete() {
    this._id = 1;
    await super.delete();

    Router.goto('/');
    location.reload()

    
  }
 
  async register() {
    let user = new User({
      email: $('.email').val(),
      password: $('.password').val()
    });
    await user.save();
    $('.email').val('')
    $('.password').val('')
  }
 
  async login() {
    let login = new Login({
      email: $('.email').val(),
      password: $('.password').val()
    });
    let result = await login.save();
    if (result.error) {
      alert(result.error);
    }
    App.app.checkIfLoggedIn();
    this.loggedIn = true;

    /**
    *
    * Router that goes to the booking page after the user logged in
    *
    */
    Router.goto('/mybookings');
  }
 }