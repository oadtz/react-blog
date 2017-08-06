import React, {Component} from 'react';
import queryString from 'query-string';
import {observer} from 'mobx-react';
import {extendObservable} from 'mobx';
import {Link, withRouter} from 'react-router-dom';

import MainLayout from 'MainLayout';
import PostList from 'PostList';
import BlockUI from 'BlockUI';

import postAPI from 'postAPI';
import session from '../utils/session';

class Home extends Component {
    constructor (props) {
        super (props);

        extendObservable(this, {
            posts: [],
            sort: session.get('posts_sort') || 'date:-1',
            loading: false
        });

        // Get all posts from firebase when first load this page
        this.getPosts ();
    }

    getPosts () {
        const {location} = this.props;
        const params = queryString.parse(location.search); // Get post params from URL
        
        this.loading = true;
        postAPI.query(params.sort)
               .then(this.onGetPostsSuccess.bind(this), this.onGetPostsFail.bind(this));
    }

    onGetPostsSuccess (posts) {
        const key = this.sort.split(':')[0];
        const dir = this.sort.split(':')[1] || 1;

        this.loading = false;

        posts.sort ((a, b) => {
            if (key === 'title') {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                }

                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                }
                
                return 0;
            }
            
            return a[key] - b[key];
        });
        
        if (parseInt(dir) === -1) {
            posts.reverse();
        }

        this.posts = posts;
    }

    onGetPostsFail (error) {
        console.error (error);
        this.loading = false;
        this.props.history.push ('/error');
    }

    handleDeletePostSuccess () {
        this.getPosts();
    }

    handleSortChange (e) {
        const sort = e.target.value;
        
        this.sort = sort;
        session.set('posts_sort', sort);

        this.getPosts ();
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
                            <BlockUI scope="div" loading={this.loading}>
                                <PostList posts={this.posts} onDeleteSuccess={this.handleDeletePostSuccess.bind(this)} />
                            </BlockUI>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
};

export default withRouter(observer(Home));