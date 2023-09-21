import React from 'react';

import { Navigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import SpinLoader from 'components/SpinLoader/SpinLoader';

import './SignOut.scss';

export default class SignOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            errors: null,
            redirect: false,
        }
    }

    updateSubmitted(bool) {
        this.setState({submitted: bool});
    }

    componentDidMount() {
    }

    render() {
        const { redirect } = this.state;
        if (redirect)
            return <Navigate to='/' />

        return (
            <Form className="sign-out-form shadow rounded">
                <h5>Signing Out <SpinLoader/></h5>
            </Form>
        )
    }
}