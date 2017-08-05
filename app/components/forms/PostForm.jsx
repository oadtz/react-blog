import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import {observer} from 'mobx-react';
import {extendObservable} from 'mobx';
import Validator from 'validatorjs';
import {withRouter} from 'react-router-dom';

import 'style-loader!css-loader!react-datepicker/dist/react-datepicker.css';
import 'style-loader!css-loader!react-quill/dist/quill.snow.css';

class PostForm extends Component {
    constructor (props) {
        super (props);
        
        extendObservable(this, {
            post: {
                title: '',
                date: moment(),
                content: ''
            },
            errors: {}
        });
    }

    componentWillReceiveProps (props) {
        if (props.post.date) {
            this.post = {
                ...props.post,
                date: moment.unix(props.post.date)
            };
        }
    }

    handleSave (e) {
        e.preventDefault ();

        // Define validation rules
        var validation = new Validator({
            title: this.post.title,
            date: this.post.date && moment(this.post.date).toDate(), // Convert to javascript datetime
            today: new Date(moment().format('MM/DD/YYYY')), // Set today for comparison, time will be 00:00:00
            content: this.post.content
        }, {
            title: 'required|max:64',
            date: 'required|date|after_or_equal:today', // Use the value from today above
            content: 'required'
        });

        // If validation failed, set error messages
        if (validation.fails()) {
            this.errors = {
                title: validation.errors.first('title'),
                date: validation.errors.first('date'),
                content: validation.errors.first('content')
            };

            return false;
        }

        this.errors = {};
        this.props.onSave(this.post);
    }

    handleCancel () {
        // Go back to previous screen
        this.props.history.go(-1);
    }

    handleContentChange (content) {
        this.post.content = content;
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <form onSubmit={this.handleSave.bind(this)}>
                            <div className="row control-group">
                                <div className="form-group col-xs-12 controls">
                                    <label>
                                        Title {this.errors.title && <small className="text-danger">({this.errors.title})</small>}
                                    </label>
                                    <input type="text" className="form-control" value={this.post.title} onChange={e => {this.post.title = e.target.value}} maxLength="64" />
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="row control-group">
                                <div className="form-group col-xs-12 controls">
                                    <label>
                                        Date {this.errors.date && <small className="text-danger">({this.errors.date})</small>}
                                    </label>
                                    <DatePicker
                                        className="form-control"
                                        selected={this.post.date}
                                        onChange={date => {this.post.date = date}}
                                        minDate={moment()}
                                        readOnly={true}
                                        />
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="row control-group">
                                <div className="form-group col-xs-12 controls has-error">
                                    <label>
                                        Content {this.errors.content && <small className="text-danger">({this.errors.content})</small>}
                                    </label>
                                    <ReactQuill 
                                        value={this.post.content}
                                        onChange={this.handleContentChange.bind(this)}
                                        style={{height: '250px'}}
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, false] }],
                                                ['bold', 'italic', 'underline','strike', 'blockquote'],
                                                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                                ['link', 'image'],
                                                ['clean']
                                            ],
                                        }}
                                        />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-xs-12 form-actions post-actions">
                                    <button type="submit" className="btn btn-success"><i className="fa fa-save"></i> Save</button>
                                    <button type="button" className="btn btn-default" onClick={this.handleCancel.bind(this)}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

PostForm.propTypes = {
    onSave: PropTypes.func.isRequired
};

export default withRouter(observer(PostForm));