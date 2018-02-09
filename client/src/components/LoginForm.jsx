import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({
    onSubmit,
    onChange,
    errors,
    successMessage,
    user
}) => (
    <div className="log-in section-content form">
        <h1>Log in</h1>
        <form onSubmit={onSubmit} method="post" action="/">
            {successMessage && successMessage !== 'undefined' &&
                <div className="row">
                    <span className="error">{successMessage}</span>
                </div>
            }
            {errors.summary && 
                <div className="row">
                    <span className="error">{errors.summary}</span>
                </div>
            }
            <input type="text" name="email" placeholder="email" onChange={onChange}/>
            <input type="password" name="password" placeholder="password" onChange={onChange}/>
            <input type="submit" value="Log in" />
            <span>Don't have an account? <Link to={'/signup'}>Create one</Link>.</span>
        </form>
    </div>
);

export default LoginForm;