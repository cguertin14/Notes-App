import React from 'react';
import { withRouter } from 'react-router';

// My Code
import PrivateHeader from './PrivateHeader';

export default withRouter(() => {
    return (
        <div> 
            <PrivateHeader title="Dashboard" />
            <div className="page-content">
                Dashboard page content.
            </div>
        </div>
    );
});