import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {observer} from 'mobx-react';
import {extendObservable} from 'mobx';

import MainLayout from 'MainLayout';
import PostForm from 'PostForm';
import BlockUI from 'BlockUI';

import postAPI from 'postAPI';

class PostCreate extends Component {
    constructor (props) {
        super (props);

        extendObservable(this, {
            loading: false
        });
    }

    handleCreate (post) {
        this.loading = true;

        postAPI.store(post)
               .then(this.onSuccess.bind(this), this.onFail.bind(this));
    }

    onSuccess (post) {
        this.loading = false;
        // Redirect to post view
        this.props.history.replace (`/post/${post.id}`);
    }

    onFail (error) {
        this.loading = false;
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
                <BlockUI scope="div" loading={this.loading}>
                    <PostForm onSave={this.handleCreate.bind(this)} />
                </BlockUI>
            </MainLayout>
        );
    }
};

export default withRouter(observer(PostCreate));