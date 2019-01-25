class Login extends REST {

  static get baseRoute() {
    return 'login/';
  }

  constructor(props) {
    super(props);
    this._id = 1;
  }
}
