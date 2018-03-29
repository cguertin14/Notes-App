import React from 'react';
import { withRouter } from 'react-router';

// My Code
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default withRouter(() => {
    return (
        <div>
            <PrivateHeader title="Notes" />
            <div className="page-content">
                <div className="page-content__sidebar">
                    <NoteList />
                </div>
                <div className="page-content__main">
                    <Editor />
                </div>
            </div>
        </div>
    );
});