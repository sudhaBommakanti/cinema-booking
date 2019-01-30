class Login extends Component {

  constructor(props) {
    super(props);
    this.addRoute('/login', 'Logga in');
    this.addEvents({
      'click .submit-btn': 'testLogin',
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
    console.log(await user.save())
  }

  async testLogin() {

    let login = new Login({
      email: $('.email').val(),
      password: $('.password').val()
    });
    console.log(login);

    console.log(await login.save());
  }
}
