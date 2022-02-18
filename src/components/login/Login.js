import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    onEventForm = () => {
        if (this.state.email == "") {
            this.emailInput.focus();
            return;
        }

        if (this.state.password == "") {
            this.passwordInput.focus();
            return;
        }

        window.location.href = "./principal";
    }

    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <>
                <style>{'html,body,#root{height:100%;}'}</style>
                <div className="form-content text-center bg-white">
                    <form className="form-signin">
                        <img className="mb-4" src="https://getbootstrap.com/docs/4.6/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input
                            ref={(input) => { this.emailInput = input; }}
                            onChange={this.handleChangeEmail}
                            value={this.state.email}
                            type="email"
                            id="inputEmail"
                            className="form-control"
                            placeholder="Email address"
                            required=""
                            autoFocus="" />

                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input
                            ref={(input) => { this.passwordInput = input; }}
                            onChange={this.handleChangePassword}
                            value={this.state.password}
                            type="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="Password"
                            required="" />

                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div>
                        <button onClick={this.onEventForm} type="button" className="btn btn-lg btn-primary btn-block">Sign in</button>
                        <p className="mt-5 mb-3 text-muted">© 2017-2021</p>
                    </form>
                </div>
            </>
        );
    }

}


export default Login;