class App extends Component {

    constructor(){
      super();
      this.navBar = new NavBar();
      this.pageContent = new PageContent();
      App.app = this; // make this globally reacheable through App.app
      // only in the App class:
      new Router(this.pageContent);
      $('body').html(this.render());

      this.checkIfLoggedIn()
    }

    async checkIfLoggedIn(){
      App.loggedInUser = await Login.find();
      App.loggedInUserEmail = (App.loggedInUser || {}).email;
      this.navBar.render();
    }

  }
  