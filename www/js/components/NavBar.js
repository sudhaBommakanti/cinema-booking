class NavBar extends Component {
    constructor() {
        super();
        this.addEvents({
            'click .loggedin': 'logout'
        });
        console.log('hej');
    }

    async logout() {
        // create new Login object and call delete on it to logout
        let logout = new Login();
        await logout.delete();
        App.app.checkIfLoggedIn();
    }

    get navItems() {
        console.log('rerender nav');
        let navItems = [
            new NavItem('Start', '/'),
            App.loggedInUserEmail ?
            /* */ new NavItem('Mina bokningar', '/mybookings') :
            /* */ new NavItem('Logga In', '/login'),
            new NavItem('Boka biljetter', '/showtime'),
            new NavItem('Platser', '/auditoriums')
        ];
        return navItems;
    }
}