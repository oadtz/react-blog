import React from 'react';
import BlockUi from 'react-block-ui';
import { Loader, Types } from 'react-loaders';

import 'style-loader!css-loader!react-block-ui/style.css';
import 'style-loader!css-loader!../../styles/loaders.min.css';

class BlockUI extends React.Component {
    render () {
        var { scope, loading, children, animation } = this.props;
        var loader = (
            <Loader active type={animation} color="#02a17c"/>
        );

        return (
            <BlockUi tag={scope} blocking={loading} loader={loader}>
                {children}
            </BlockUi>
        );
    }
};

BlockUI.defaultProps = {
    scope: 'div',
    loading: false,
    animation: 'ball-beat'
};

export default BlockUI;