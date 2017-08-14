import React, { Component } from 'react';

export default class Home extends Component {

	componentWillMount() {
		// console.log("Home is mounting");
	}

	componentWillUnmount() {
		// console.log("Home is unmounting");
	}

    render() {
        return (<h1>{'Home Page'}</h1>);
    }

}
