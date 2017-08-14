import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';


import { server } from '../../core/server';

export default class Upload extends React.Component {

	constructor(props) {
		super(props);

		this.onDrop = this.onDrop.bind(this);

		this.state = {};
	}

	onDrop(files) {
		const self = this;

		server.postFile('/api/uploads', files[0], { extension: 'png', name: 'abc', fileName: 'asjdksjkdhd' })
			.then(data => {
				self.setState({ filename: data.filename });
			});
	}

	render() {
		return (<Grid>
					<Row>
						<Col sm={12}>
							<h1>{'File Upload'}</h1>
						</Col>
					</Row>
					<Row>
						<Col sm={6}>
							<Dropzone onDrop={this.onDrop} multiple={false}>
								<div>{'Try dropping a file here, or click to select a file to upload.'}</div>
							</Dropzone>
						</Col>
						{
							this.state.filename ?
								<Col sm={6}>
									<img src={`http://localhost:3000/uploadedFiles/${this.state.filename}`} width="100%" />
								</Col> : null
						}
					</Row>
				</Grid>);
	}
}
