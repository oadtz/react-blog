import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Link} from 'react-router-dom';

import PostActions from 'PostActions';

class PostList extends Component {
    handleDeleteSuccess () {
        if (this.props.onDeleteSuccess)
            this.props.onDeleteSuccess();
    }

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
                        <PostActions id={post.id} onDeleteSuccess={this.handleDeleteSuccess.bind(this)} />
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

PostList.propTypes = {
    onDeleteSuccess: PropTypes.func
};

export default PostList;