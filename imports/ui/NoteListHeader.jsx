import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import { Notes } from './../api/notes';
import PropTypes from 'proptypes';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.meteorCall('notes.insert', (err,res) => {
                    if (res) {
                        props.Session.set('selectedNoteId',res);
                    }
                })
            }}>Create Note</button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
};

export default withTracker(() => {
    return {
        meteorCall: Meteor.call,
        Session
    };
})(NoteListHeader);