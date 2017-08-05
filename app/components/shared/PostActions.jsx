import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import postAPI from 'postAPI';

class PostActions extends Component {
    handleEditPostClick (postId) {
        this.props.history.push(`/post/${postId}/edit`);
    }

    handleDeletePostClick (postId) {
        if (confirm('Are you sure to remove this post? This cannot be undone'))
            postAPI.delete(postId)
                   .then(this.onDeleteSuccess.bind(this), this.onDeleteFail.bind(this));
    }

    onDeleteSuccess () {
        if (this.props.onDeleteSuccess)
            this.props.onDeleteSuccess ();
    }

    onDeleteFail (error) {
        alert ('Delete failed. Please try again later');
        console.error (error);

        if (this.props.onDeleteFail)
            this.props.onDeleteFail ();
    }

    render () {
        const {id} = this.props;

        return (
            <div className="post-actions">
                <button type="button" onClick={this.handleEditPostClick.bind(this, id)} className="btn btn-xs btn-info"><i className="fa fa-edit"></i> Edit</button>
                <button type="button" onClick={this.handleDeletePostClick.bind(this, id)} className="btn btn-xs btn-default"><i className="fa fa-trash"></i> Delete</button>
            </div>
        );
    }
};

PostActions.propTypes = {
    id: PropTypes.string.isRequired,
    onDeleteSuccess: PropTypes.func,
    onDeleteFail: PropTypes.func
};

export default withRouter(PostActions);