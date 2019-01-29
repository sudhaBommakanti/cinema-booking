class Login extends Component {

  constructor(){
    super();
    this.addRoute('/login', 'Logga in');
  }
  static get baseRoute() {
    return 'login/';
  }

  async delete() {
    this._id = 1;
    return super.delete();
  }
}
