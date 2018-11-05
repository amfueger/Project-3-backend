import React, { Component } from 'react';

class GitHubUserRepos extends Component {
  render(){

    console.log(`this.props.allRepos: `, this.props.allRepos);
    console.log(`typeof this.props.allRepos: `, typeof this.props.allRepos);

    let isArr = Array.isArray(this.props.allRepos);
    console.log(`this.props.allRepos isArr: `, isArr);

    let allRepos = Array.from(this.props.allRepos);
    console.log(`allRepos: `, allRepos);

  	const gitHubUserReposList = allRepos.map((repo, i) => {
      return (<li key={i}>{repo.name}</li>);
      // if (repo.has_issues === true) {
    		// return (
    		// 	<li key={repo.id}>
    		// 		User id: {repo.id} | 
    		// 		User name: {repo.name}<br/>
    		// 	</li>
    		// )
      // } else {
      //   return (
      //     <li>Repo: {repo.name} has no issues</li>
      //   )
      // }
  	})

    return (
      <div>
  			<h2>GitHub User Repos List</h2>
  			<ul>{gitHubUserReposList}</ul>    	
      </div>
    )
  }
}
export default GitHubUserRepos;
