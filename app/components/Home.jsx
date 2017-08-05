import React, {Component} from 'react';
import queryString from 'query-string';
import {observer} from 'mobx-react';
import {extendObservable} from 'mobx';
import {Link, withRouter} from 'react-router-dom';

import MainLayout from 'MainLayout';
import PostList from 'PostList';
import BlockUI from 'BlockUI';

import postAPI from 'postAPI';

class Home extends Component {
    constructor (props) {
        super (props);

        extendObservable(this, {
            posts: [],
            sort: queryString.parse(location.search).sort || 'date:-1'
        });

        // Get all posts
        this.getPosts ();
    }

    componentDidUpdate () {
        if (this.sort !== queryString.parse(location.search).sort) {
            this.sort = queryString.parse(location.search).sort;
            
            this.getPosts ();
        }
    }

    getPosts () {
        const {location} = this.props;
        const params = queryString.parse(location.search); // Get post params from URL

        postAPI.query(params.sort)
               .then(this.onGetPostsSuccess.bind(this), this.onGetPostsFail.bind(this));
    }

    onGetPostsSuccess (posts) {
        this.posts = posts;
    }

    onGetPostsFail (error) {
        console.error (error);
    }

    onDeletePostSuccess () {
        this.getPosts();
    }

    handleSortChange (e) {
        const sortBy = e.target.value;
        const {history} = this.props;

        history.push(`/?sort=${sortBy}`);
    }

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
                                    <p>
                                        <Link to="/post/new" className="btn btn-xs btn-info"><i className="fa fa-plus"></i> New Post</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <div className="post-sorting pull-right">
                                <select className="form-control" value={this.sort} onChange={this.handleSortChange.bind(this)}>
                                    <option value="date:-1">Newest Post First</option>
                                    <option value="date:1">Oldest Post First</option>
                                    <option value="title:1">Post Title A-Z</option>
                                    <option value="title:-1">Post Title Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <PostList posts={this.posts} />
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
};

export default withRouter(observer(Home));