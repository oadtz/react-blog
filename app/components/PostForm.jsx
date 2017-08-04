import React, {Component} from 'react';
import moment from 'moment';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import {observer} from 'mobx-react';
import {extendObservable} from 'mobx';
import Validator from 'validatorjs';

import 'style-loader!css-loader!react-datepicker/dist/react-datepicker.css';
import theme from 'style-loader!css-loader!react-quill/dist/quill.snow.css';

class PostForm extends Component {
    constructor (props) {
        super (props);

        extendObservable(this, {
            post: this.props.post || {
                title: '',
                date: moment(),
                content: ''
            },
            dateFocused: false,
            errors: {}
        });
    }

    handleSave (e) {
        e.preventDefault ();

        var validation = new Validator({
            title: this.post.title,
            date: this.post.date && this.post.date.toDate(),
            today: new Date(moment().format('MM/DD/YYYY')),
            content: this.post.content
        }, {
            title: 'required|max:64',
            date: 'required|date|after_or_equal:today',
            content: 'required'
        });

        if (validation.fails()) {
            this.errors = {
                title: validation.errors.first('title'),
                date: validation.errors.first('date'),
                content: validation.errors.first('content')
            };

            console.log (this.errors);

            return false;
        }
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
                                    <input type="text" className="form-control" value={this.post.title} onChange={e => this.post.title = e.target.value} maxLength="64" />
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="row control-group">
                                <div className="form-group col-xs-12 controls">
                                    <label>
                                        Date {this.errors.date && <small className="text-danger">({this.errors.date})</small>}
                                    </label>
                                    <DatePicker
                                        selected={this.post.date}
                                        onChange={date => this.post.date = date}
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
                                <div className="form-group col-xs-12 form-actions">
                                    <button type="submit" className="btn btn-success"><i className="fa fa-save"></i> Save</button>
                                    <button type="button" className="btn btn-default">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default observer(PostForm);