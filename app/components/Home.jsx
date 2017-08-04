import React, {Component} from 'react';

import MainLayout from 'MainLayout';
import PostList from 'PostList';

class Home extends Component {
    render () {
        return (
            <MainLayout>
                <header className="intro-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>React-Blog</h1>
                                    <hr className="small"/>
                                    <span className="subheading">A Simple Blog Made with React</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <PostList />
            </MainLayout>
        );
    }
};

export default Home;