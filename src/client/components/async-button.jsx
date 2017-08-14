import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class AsyncButton extends React.Component {

    render() {
        const props = this.props;
        const fetching = props.fetching;
        const fetchMsg = props.fetchMsg;

        const btnProps = Object.assign({},
            this.props,
            { disabled: fetching, bsStyle: props.bsStyle ? props.bsStyle : 'primary' });

        delete btnProps.fetching;
        delete btnProps.fetchMsg;

        if (fetching) {
            btnProps.onClick = null;
        }

        const faIcon = this.props.faIcon;

        return (
            <Button {...btnProps}>
                {fetching && <i className="fa fa-circle-o-notch fa-spin fa-fw" />}
                {!fetching && faIcon ? <i className={'fa fa-fw fa-' + faIcon}/> : null}
                {fetching && fetchMsg ? fetchMsg : this.props.children}
            </Button>
        );
    }
}

AsyncButton.propTypes = {
    fetching: PropTypes.bool,
    fetchMsg: PropTypes.string,
    children: PropTypes.any,
    faIcon: PropTypes.string
};

AsyncButton.defaultProps = {
    fetching: false,
    fetchMsg: 'Aguarde...'
};
