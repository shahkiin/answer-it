const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();

function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/signup', (req, res, next) => {

    const validationResult = validateSignupForm(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            confirmation: 'fail',
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-signup', (err) => {

        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    confirmation: 'fail',
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            }

            return res.status(400).json({
                confirmation: 'fail',
                message: 'Could not process the form.'
            });
        }

        return res.status(200).json({
            confirmation: 'success',
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {

    const validationResult = validateLoginForm(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            confirmation: 'fail',
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('local-login', (err, token, userData) => {

        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    confirmation: 'fail',
                    message: err.message
                });
            }

            return res.status(400).json({
                confirmation: 'fail',
                message: 'Could not process the form.'
            });
        }

        return res.json({
            confirmation: 'success',
            message: 'You have successfully logged in!',
            token: token,
            userData: userData
        });
    })(req, res, next);
});


module.exports = router;