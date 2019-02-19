class App extends Component {
    constructor() {
        super();
        this.navBar = new NavBar();
        this.footer = new Footer();
        this.pageContent = new PageContent();
        App.app = this; // make this globally reacheable through App.app
        this.checkIfLoggedIn();
        // Only in the app class
        new Router(this.pageContent);
        $('body').html(this.render());
    }

    async checkIfLoggedIn() {
        App.loggedInUser = await Login.find();
        App.loggedInUserEmail = (App.loggedInUser || {}).email;
        this.navBar.render();
    }

    async getAllAuditoriums() {
        this.auditoriums = await Auditorium.find();
    }

}