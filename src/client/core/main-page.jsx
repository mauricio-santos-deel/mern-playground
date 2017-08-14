import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import '../less/app.less';

import RouteDefs from './route-defs';
import { NavItemLink } from '../components/index';

export default class MainPage extends Component {

    render() {
        return (
			<Router>
					<div>
						<Navbar inverse collapseOnSelect>
							<Navbar.Header>
								<Navbar.Brand>
									<Link to="/">{'G-Life'}</Link>
								</Navbar.Brand>
								<Navbar.Toggle />
							</Navbar.Header>
							<Navbar.Collapse>
								<Nav>
									<NavItemLink to="/home">
										{'Home'}
									</NavItemLink>
									<NavItemLink to="/login">
										{'Login'}
									</NavItemLink>
									<NavItemLink to="/tasks">
										{'Tasks'}
									</NavItemLink>
									<NavItemLink to="/upload">
										{'Upload'}
									</NavItemLink>
								</Nav>
							</Navbar.Collapse>
						</Navbar>

						<RouteDefs />
					</div>
				</Router>
		);
    }

}
