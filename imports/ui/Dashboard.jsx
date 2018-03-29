import React from 'react';
import { withRouter } from 'react-router';

// My Code
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default withRouter(() => {
    return (
        <div>
            <PrivateHeader title="Dashboard" />
            <div className="page-content">
                <NoteList />
                <Editor />
            </div>
        </div>
    );
});