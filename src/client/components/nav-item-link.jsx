import React from 'react';
import { NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default class NavItemLink extends React.Component {

	constructor(props) {
        super(props);
        this.onNavItemClick = this.onNavItemClick.bind(this);
        this.state = { redirectTo: null };
    }

    componentDidUpdate() {
        if (this.state.redirectTo) {
            this.setState({ redirectTo: null });
        }
    }

    onNavItemClick() {
        this.setState({ redirectTo: this.props.to });
    }

    renderContent() {
        const navItemProps = Object.assign({}, this.props);
        delete navItemProps.to;
        delete navItemProps.history;
        delete navItemProps.children;

        if (this.state.redirectTo) {
            return <Redirect push to={{ pathname: this.state.redirectTo }} />;
        }

        return (<NavItem {...this.props} onClick={this.onNavItemClick}>
                    { this.props.children }
                </NavItem>);
    }

    render() {
        return this.renderContent();
    }
}

NavItemLink.propTypes = {
	to: PropTypes.string,
    children: PropTypes.node
};
