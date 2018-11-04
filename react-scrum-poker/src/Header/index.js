import React from 'react';
import { Header } from 'semantic-ui-react';

import { Link } from 'react-route-dom';

const Header = () => {
	return(
		<Header>
			<ul>
				<li>
					<Link to='/'>Login</Link>
				</li>
				<li>
					<Link to='/profile'>Profile</Link>
				</li>
			</ul>
		</Header>
		)
}

export default Header;