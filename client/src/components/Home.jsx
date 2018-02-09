import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router-dom';

const Home = ({ username }) => (
    <section className="home">
        {username ? (
            <div className="welcome">
                <h1>Hello, <b style={{ color: '#b40000' }}>{username}</b>!</h1>
                <p>simple service to create and share surveys</p>
                <Link className='button' to="/questionlist">Question list</Link>
            </div>
        ) : (
            <div className="welcome">
                <h1>answerIt</h1>
                <p>simple service to create and share surveys</p>
                <Link className='button' to="/signup">Try it!</Link>
            </div>
        )}
    </section>
);

export default Home;