import React from 'react';
import moment from 'moment';
import PropTypes from 'proptypes';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data'


export const NoteListItem = (props) => {
    return (
        <div onClick={() => {
            props.Session.set('selectedNoteId',props.note._id)}
        }>
            <h5>{props.note.title || 'Untitled note'}</h5>
            {props.note.selected ? 'Selected' : undefined }
            <p>{moment(props.note.updatedAt).format('Y-MM-DD')}</p>
        </div>
    );
};

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default withTracker(() => {
    return { Session };
})(NoteListItem);