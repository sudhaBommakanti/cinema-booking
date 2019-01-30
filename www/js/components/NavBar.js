class NavBar extends Component {

    constructor(){
      super();
      this.navItems = [
        new NavItem('Start', '/'),
        new NavItem('Logga In', '/login')
      ];
      this.addEvents({
        'click .loggedin': 'logout'
      });
    }

    logout(){
      alert("LOGOUT");
      // create new Login object and call delete on it to logout
    }
  
  }
  