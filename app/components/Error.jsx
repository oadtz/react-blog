import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import MainLayout from 'MainLayout';

class Error extends Component {
    render () {
        return (
            <MainLayout>
                <header className="intro-header error-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>Oops !</h1>
                                    <hr className="small"/>
                                    <span className="subheading">There is something wrong</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            Please try again later or go back to <Link to="/">home page</Link>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
};

export default Error;