class Login extends Component {
  constructor(props) {
    super(props);
    this.addRoute('/login', 'Logga in');

    this.addEvents({
      'click .submit-btn': 'login',

      'click .register-btn': 'register'
    })
    this.loggedIn = false;
    this.createAccount = false;
  }
  static get baseRoute() {
    return 'login/';
  }

  /**
  *
  * To go back to the start page after logged out and loads the web browser
  *
  */

  mount() {
    this.createAccount = false;
    this.render();
  }

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
    let validateEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validatePasswordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (validateEmailRegEx.test(user.email)) {
      if (validatePasswordRegEx.test(user.password) === false) {
        $(this.baseEl).find('#registerModalPassword').modal({ show: true });
        return;
      }
      await user.save();
      $('.email').val('')
      $('.password').val('')
      this.createAccount = true;
      this.render();
      return;
    } else {
      $(this.baseEl).find('#registerModalEmail').modal({ show: true });
    }
  }

  async login() {
    let login = new Login({
      email: $('.email').val(),
      password: $('.password').val()
    });
    let result = await login.save();
    if (result.error) {
      alert(result.error);
      return;
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