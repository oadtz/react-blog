import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {extendObservable} from 'mobx';
import {withRouter} from 'react-router-dom';

import MainLayout from 'MainLayout';
import PostForm from 'PostForm';
import BlockUI from 'BlockUI';

import postAPI from 'postAPI';

class PostEdit extends Component {
    constructor (props) {
        super (props);

        extendObservable(this, {
            post: {},
            loading: false
        });

        // Get post from postid
        this.getPost (this.props.match.params.post);
    }

    getPost (id) {
        this.loading = true;

        postAPI.get(id)
               .then(this.onGetPostSuccess.bind(this), this.onGetPostFail.bind(this));
    }

    onGetPostSuccess (post) {
        this.loading = false;
        this.post = post;
    }

    onGetPostFail (error) {
        console.error(error);
        this.loading = false;
        this.props.history.push ('/error');
    }

    handleSave (post) {
        this.loading = true;

        postAPI.update(post)
               .then(this.onSuccess.bind(this), this.onFail.bind(this));
    }

    onSuccess (post) {
        this.loading = false;
        // Redirect to post view
        this.props.history.replace (`/post/${post.id}`);
    }

    onFail (error) {
        console.error (error);
        this.loading = false;
        this.props.history.push ('/error');
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
                <BlockUI scope="div" loading={this.loading}>
                    <PostForm post={this.post} onSave={this.handleSave.bind(this)} />
                </BlockUI>
            </MainLayout>
        );
    }
};

export default withRouter(observer(PostEdit));