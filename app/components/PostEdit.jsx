import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {extendObservable} from 'mobx';
import {withRouter} from 'react-router-dom';

import MainLayout from 'MainLayout';
import PostForm from 'PostForm';

import postAPI from 'postAPI';

class PostEdit extends Component {
    constructor (props) {
        super (props);

        extendObservable(this, {
            post: {}
        });

        // Get post from postid
        this.getPost (this.props.match.params.post);
    }

    getPost (id) {
        postAPI.get(id)
               .then(this.onGetPostSuccess.bind(this), this.onGetPostFail.bind(this));
    }

    onGetPostSuccess (post) {
        this.post = post;
    }

    onGetPostFail (error) {
        alert ('Load post failed. Redirecting to home');
        console.error(error);
        this.props.history.replace ('/');
    }

    handleSave (post) {
        postAPI.update(post)
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
                                    <h1>Edit Post</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <PostForm post={this.post} onSave={this.handleSave.bind(this)} />
            </MainLayout>
        );
    }
};

export default withRouter(observer(PostEdit));