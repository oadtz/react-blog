import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

class PostList extends Component {
    render () {
        const {posts} = this.props;
        var postList = posts.map(post => {
            return (
                <div key={post.id}>
                    <div className="post-preview">
                        <Link to={`/post/${post.id}`}>
                            <h2 className="post-title">
                                {post.title}
                            </h2>
                        </Link>
                        <p className="post-meta">Posted on {moment.unix(post.date).format('MMMM Do, YYYY')}</p>
                    </div>
                    <hr/>
                </div>
            );
        });

        return (
            <div>
                {postList}
            </div>
        );
    }
};

export default PostList;