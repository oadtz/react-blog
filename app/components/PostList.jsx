import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class PostList extends Component {
    componentWillUpdate () {
        console.log ('xxxx');
    }

    handleSortChange (e) {
        const sortBy = e.target.value;

        this.props.history.push('/?sort=' + sortBy);
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <div className="post-sorting pull-right">
                            <select className="form-control" onChange={this.handleSortChange.bind(this)}>
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
                        <div className="post-preview">
                            <Link to="/post/xxxx">
                                <h2 className="post-title">
                                    Man must explore, and this is exploration at its greatest
                                </h2>
                            </Link>
                            <p className="post-meta">Posted by <a href="#">Start Bootstrap</a> on September 24, 2014</p>
                            <p className="post-actions">
                                <button className="btn btn-xs"><i className="fa fa-edit"></i> Edit</button>
                                <button className="btn btn-xs"><i className="fa fa-trash"></i> Delete</button>
                            </p>
                        </div>
                        <hr/>
                        <div className="post-preview">
                            <Link to="/post/xxxx">
                                <h2 className="post-title">
                                    I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.
                                </h2>
                            </Link>
                            <p className="post-meta">Posted by <a href="#">Start Bootstrap</a> on September 18, 2014</p>
                            <p className="post-actions">
                                <button className="btn btn-xs"><i className="fa fa-edit"></i> Edit</button>
                                <button className="btn btn-xs"><i className="fa fa-trash"></i> Delete</button>
                            </p>
                        </div>
                        <hr/>
                        <div className="post-preview">
                            <Link to="/post/xxxx">
                                <h2 className="post-title">
                                    Science has not yet mastered prophecy
                                </h2>
                                <h3 className="post-subtitle">
                                    We predict too much for the next year and yet far too little for the next ten.
                                </h3>
                            </Link>
                            <p className="post-meta">Posted by <a href="#">Start Bootstrap</a> on August 24, 2014</p>
                            <p className="post-actions">
                                <button className="btn btn-xs"><i className="fa fa-edit"></i> Edit</button>
                                <button className="btn btn-xs"><i className="fa fa-trash"></i> Delete</button>
                            </p>
                        </div>
                        <hr/>
                        <div className="post-preview">
                            <Link to="/post/xxxx">
                                <h2 className="post-title">
                                    Failure is not an option
                                </h2>
                                <h3 className="post-subtitle">
                                    Many say exploration is part of our destiny, but it’s actually our duty to future generations.
                                </h3>
                            </Link>
                            <p className="post-meta">Posted by <a href="#">Start Bootstrap</a> on July 8, 2014</p>
                            <p className="post-actions">
                                <button className="btn btn-xs"><i className="fa fa-edit"></i> Edit</button>
                                <button className="btn btn-xs"><i className="fa fa-trash"></i> Delete</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter(PostList);