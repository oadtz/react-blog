import React from 'react';
import ReactDOM from 'react-dom';

import App from 'App';

// App css
require('style-loader!css-loader!less-loader!applicationStyles')

if (document.getElementById('app')) {
    ReactDOM.render(<App /> , document.getElementById('app'));
}
