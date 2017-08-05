import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';


class HtmlContent extends Component {
    componentDidMount () {
        var $el = $(this.el);
        var content = this.props.content;

        // Insert html content to div with jquery
        $el.html(content);
    }

    render () {
        //Create empty div with ref
        return (
            <div ref={el => this.el = el}>
            </div>
        );
    }
};

HtmlContent.propTypes = {
    content: PropTypes.string.isRequired
};

export default HtmlContent;