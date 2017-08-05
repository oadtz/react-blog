import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import MainLayout from 'MainLayout';
import PostForm from 'PostForm';

import postAPI from 'postAPI';

class PostCreate extends Component {
    handleCreate (post) {
        postAPI.store(post)
               .then(this.onSuccess.bind(this), this.onFail.bind(this));
    }

    onSuccess (post) {
        // Redirect to post view
        this.props.history.replace (`/post/${post.id}`);
    }

    onFail (error) {
        alert ('Save failed. Please try again');
        console.error (error);
    }

    render () {
        return (
            <MainLayout>
                <header className="intro-header post-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>New Post</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <PostForm onSave={this.handleCreate.bind(this)} />
            </MainLayout>
        );
    }
};

export default withRouter(PostCreate);