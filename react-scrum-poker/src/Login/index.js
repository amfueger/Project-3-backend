import React, { Component } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';


class Login extends Component{
	constructor(){
		super();

		this.state = {
			username: '',
			email: '',
			password: '',
			company: ''
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		const loginResponse = await fetch('http:localhost:9000/auth', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const parsedResponse = await loginResponse.json();
		if(parsedResponse.data === 'login successful'){
			this.props.history.push('/profile');
			//Validation?
		}
	}
	render(){
		return(
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
			)
	}
}

export default Login;