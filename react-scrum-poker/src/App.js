import React, { Component } from 'react';
import './App.css';
// import NavHeaderNotLogged from './NavHeaderNotLogged';
// import NavHeaderLogged from './NavHeaderLogged';
import GitHubUserRepos from './GitHubUserRepos';
import Login from './Login';
// import Register from './Register';


class App extends Component {
	constructor(){
    super();

    this.state = {
    	logged: false,
    	username: '',
    	repos: [],
    	issues: []    
    }
	}

	handleLogin = (username, isLogged) => {
      console.log(`username: `, username);
      console.log(`isLoggedIn: `, isLogged);

      this.setState({
      	logged: isLogged,
      	username: username
      });

      this.componentDidMount();

	}

	getRepos = async () => {
		try {
	    const repos 	= await fetch('https://api.github.com/users/' + this.state.username + '/repos');
	    const reposJson = await repos.json();
	    return reposJson;

		} catch(err){
			console.log(`Error in getRepos() => catch(err){}\n`, err);
			return err;
		}
	}

	componentDidMount(){

		this.getRepos(this.state.username).then(data => {

			console.log(`repos data from componentDidMount: `, data);
			this.setState({repos: data});
			// console.log(`this.state.repos: `, this.state.repos);

		}).catch(err => {
      console.log(`Error in componentDidMount .catch(err){}\n`, err);			
		})
	}

        // {this.state.logged ? <NavHeaderLogged /> : <NavHeaderNotLogged />}
  render() {
    return (
      <div className="App">
	      <h1>App.js is rendering</h1>
        {this.state.logged ? <GitHubUserRepos allRepos={this.state.repos}/> : <Login handleLogin={this.handleLogin} />}
      </div>
    );
  }
}

export default App;
