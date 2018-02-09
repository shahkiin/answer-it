import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = ({
    onSubmit,
    onChange,
    errors,
    user,
}) => (
    <div className="sign-up section-content form">
        <h1>Sign up</h1>
        <form onSubmit={onSubmit} action="/">
            {errors.summary &&
                <div className="row">
                    <span className="error">{errors.summary}</span>
                </div>
            }
            <input type="text" name="name" placeholder="username" onChange={onChange}/>
            <input type="text" name="email" placeholder="email" onChange={onChange}/>
            <input type="password" name="password" placeholder="password" onChange={onChange}/>
            <input type="submit" value="Create New Account" />
            <span>Already have an account? <Link to={'/login'}>Log in</Link></span>
        </form>
    </div>
);

export default SignUpForm;