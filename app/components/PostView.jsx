import React, {Component} from 'react';
import moment from 'moment';
import {observer} from 'mobx-react';
import {extendObservable} from 'mobx';
import {withRouter} from 'react-router-dom';

import MainLayout from 'MainLayout';
import HtmlContent from 'HtmlContent';

import PostActions from 'PostActions';

import postAPI from 'postAPI';

class PostView extends Component {
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

    onDeletePostSuccess () {
        this.props.history.replace ('/');
    }

    onGetPostFail (error) {
        alert ('Load post failed. Redirecting to home');
        console.error(error);
        this.props.history.replace ('/');
    }

    render () {
        return (
            <MainLayout>
                <header className="intro-header post-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="site-heading">
                                    <h1>{this.post.title}</h1>
                                    {this.post.date && <span className="meta">Posted on {moment.unix(this.post.date).format('MMMM Do, YYYY')}</span>}
                                    {this.post.id && <PostActions id={this.post.id} onDeleteSuccess={this.onDeletePostSuccess.bind(this)}  />}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                
                <article className="post-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                {this.post.content && <HtmlContent content={this.post.content} />}
                            </div>
                        </div>
                    </div>
                </article>
            </MainLayout>
        );
    }
};

export default withRouter(observer(PostView));