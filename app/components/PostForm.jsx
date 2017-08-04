import React, {Component} from 'react';

class PostForm extends Component {
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <form className="sentMessage" id="contactForm" novalidate="">
                            <div className="row control-group">
                                <div className="form-group col-xs-12 floating-label-form-group controls">
                                    <label>Title</label>
                                    <input type="text" className="form-control" placeholder="Title" id="name" required="" data-validation-required-message="Please enter your name." aria-invalid="false"/>
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="row control-group">
                                <div className="form-group col-xs-12 floating-label-form-group controls">
                                    <label>Date</label>
                                    <input type="email" className="form-control" placeholder="Date" id="email" required="" data-validation-required-message="Please enter your email address."/>
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="row control-group">
                                <div className="form-group col-xs-12 floating-label-form-group controls">
                                    <label>Content</label>
                                    <textarea rows="5" className="form-control" placeholder="Content" id="message" required="" data-validation-required-message="Please enter a message."></textarea>
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default PostForm;