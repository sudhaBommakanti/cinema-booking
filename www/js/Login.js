class Login extends REST {

  static get baseRoute() {
    return 'login/';
  }

  async delete() {
    this._id = 1;
    return super.delete();
  }
}
