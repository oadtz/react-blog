import React, {Component} from 'react';

import SiteNav from 'SiteNav';
import SiteFooter from 'SiteFooter';

class MainLayout extends Component {
    componentDidMount () {
        window.scrollTo(0, 0);
    }

    render () {
        const {children} = this.props;

        return (
            <div>
                <SiteNav />
                {children}
                <SiteFooter />
            </div>
        );
    }
};

export default MainLayout;