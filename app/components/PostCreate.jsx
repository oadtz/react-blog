import React, {Component} from 'react';

import MainLayout from 'MainLayout';
import PostForm from 'PostForm';

class PostCreate extends Component {
    render () {
        return (
            <MainLayout>
                <header className="intro-header post-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>New Post</h1>
                                    <span className="subheading">
                                        <button className="btn btn-success"><i className="fa fa-save"></i> Save</button>
                                        <button className="btn btn-default">Cancel</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <PostForm />
            </MainLayout>
        );
    }
};

export default PostCreate;