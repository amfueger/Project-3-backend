import React, { Component } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
// import gitHubStuff from '../gitHubStuff.js';


class Login extends Component {
	constructor(){
		super();

		this.state = {
			username: 'charlotteprevost',
			email: 'email',
			password: 'password',
			company: 'GA'
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		console.log(`After preventDefault`);
		
		const loginResponse = await fetch('http://localhost:9000/auth/register', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const parsedResponse = await loginResponse.json();

		console.log(`<Login> handleSubmit() parsedResponse`, parsedResponse);

		if(parsedResponse.data === 'login successful'){
			// this.props.history.push('/profile');
			//Validation?
			this.props.handleLogin(this.state.username, true);
		}
	}

	// handleSubmitGitHub = async (e) => {
	// 	e.preventDefault();
	// 	console.log(`after preventDefault`);
	// 	const goToGitHubLoginResponse = await fetch('https://github.com/login/oauth/authorize?client_id=' + gitHubStuff.client_id);
	// 	// 	, {
	// 	// 	mode: 'no-cors',
	// 	// 	// client_id: gitHubStuff.client_id,
	// 	// 	redirect_uri: 'http://localhost:9000/auth/register',
	// 	// 	headers: {
	// 	// 		'Access-Control-Allow-Origin': 'http://localhost:9000/auth/register'
	// 	// 	}
	// 	// }
	// 	console.log(`after goToGitHubLoginResponse`, goToGitHubLoginResponse);
	// 	const parsedResponse = await goToGitHubLoginResponse.json();

	// 	console.log(`<Login> handleSubmitGitHub() parsedResponse`, parsedResponse);

	// 	if(parsedResponse.data === 'login successful'){
	// 		this.props.history.push('/profile');
	// 		// Validation?
	// 		this.props.handleLogin(this.state.username, true);
	// 	}
	// }

	render(){
		// console.log(`gitHubStuff: `, gitHubStuff);
		return(
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Label> Username: </Label>
					<Form.Input type='text' name='username' onChange={this.handleChange} />
					<Label> Email: </Label>
					<Form.Input type='text' name='email' onChange={this.handleChange} />
					<Label> Password: </Label>
					<Form.Input type='text' name='password' onChange={this.handleChange} />
					<Label> Company: </Label>
					<Form.Input type='text' name='company' onChange={this.handleChange} />
					<Button type='Submit' color='blue'>Login</Button>
				</Form>
				<br/>
				<br/>
				<Form onSubmit={this.handleSubmitGitHub}>
					<Label> Login With GitHub: </Label><br/>
					<Button type='Submit' color='blue'>Login</Button>
				</Form>
			</div>
		)
	}
}

export default Login;