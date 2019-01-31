class NavBar extends Component {
    constructor() {
      super();
      this.navItems = [
        new NavItem('Start', '/'),
        new NavItem('Logga In', '/login'),
        new NavItem('Boka biljetter', '/showtime'),
        new NavItem('Platser', '/auditoriums')
      ];
      this.addEvents({
        'click .loggedin': 'logout'
      });
    }
   
    async logout() {
      // create new Login object and call delete on it to logout
      let logout = new Login();
      await logout.delete();
      App.app.checkIfLoggedIn();
    }
   }