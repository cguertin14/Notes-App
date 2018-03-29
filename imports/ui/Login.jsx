import React from 'react';
import PropTypes from 'proptypes';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export class Login extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        this.props.loginWithPassword({ email }, password, (err) => {
            if (err) {
                this.setState({ error: 'Unable to login, check email and password' });
            } else {
                this.setState({ error: '' });
            }
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input type="password" ref="password" name="password" placeholder="Password" />
                        <button type="submit" className="button">Login</button>
                    </form>

                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginWithPassword: PropTypes.func.isRequired
};

export default withTracker(() => {
    return {
        loginWithPassword: Meteor.loginWithPassword
    };
})(Login);