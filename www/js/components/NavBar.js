class NavBar extends Component {
    constructor() {
        super();
        this.navItems = [
            new NavItem('Start', '/'),
            new NavItem('Logga In', '/login'),
            new NavItem('Platser', '/auditoriums')
        ];
    }
}