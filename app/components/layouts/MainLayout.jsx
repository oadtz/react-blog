import React, {Component} from 'react';

import SiteNav from 'SiteNav';
import SiteFooter from 'SiteFooter';

class MainLayout extends Component {
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