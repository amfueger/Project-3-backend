import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import GitHubUserRepoIssues from '../GitHubUserRepoIssues';

class GitHubUserRepos extends Component {


  constructor(){
    super();

    this.state = {
      repoSelected: false,
      repoName: '',
      issues: []
    }
  }

  handleChange = (e, { value }) => {
    this.setState({
      repoName: value
    })
    console.log(`handleChange this.state: `, this.state);
  }

  getIssues = async (e) => {

    this.setState({
      repoName: e.currentTarget.value
    })

    console.log(`getIssues this.state: `, this.state);

    // try {
    //   const repos     = await fetch('https://api.github.com/users/' + this.state.username + '/repos');
    //   const reposJson = await repos.json();
    //   return reposJson;

    // } catch(err){
    //   console.log(`Error in getIssues() => catch(err){}\n`, err);
    //   return err;
    // }
  }
  render(){

    let isArr = Array.isArray(this.props.allRepos);
    console.log(`this.props.allRepos isArr: `, isArr);

    let allRepos = Array.from(this.props.allRepos);
    console.log(`allRepos: `, allRepos);

    const gitHubUserReposList = allRepos.map((repo, i) => {
      return {name: repo.name, text: repo.name, key: repo.id, value: repo.name}
    })
    
    const { value } = this.state;

    return (
      <div>
        <h2>GitHub User Repos List</h2>
        <Dropdown onChange={this.handleChange} placeholder='Select Repo' fluid selection options={gitHubUserReposList} value={value} />
        <GitHubUserRepoIssues repoIssues={this.state.issues}/>
      </div>
    )
  }
}
export default GitHubUserRepos;
