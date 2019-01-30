class Login extends Component {
    constructor(props) {
    super(props);
    this.addRoute('/login', 'Logga in');
    this.addEvents({
      'click .submit-btn': 'login',
      'click .register-btn': 'register'
    })
  }
  static get baseRoute() {
    return 'login/';
  }

  async delete() {
    this._id = 1;
    return super.delete();
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
      // replace with something smoother
      alert(result.error);
    }
    App.app.checkIfLoggedIn();
    $('.email').val('')
    $('.password').val('')
  }
}
