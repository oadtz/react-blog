import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SiteNav extends Component {
    render () {
        return (
            <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/"><i className="fa fa-home"></i> Home</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};

export default SiteNav;