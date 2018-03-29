import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'proptypes';
import { Session } from 'meteor/session';

// My code
import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';


export const NoteList = (props) => {

    const renderNotes = () => {
        if (props.notes.length > 0) {
            return props.notes.map(note => {
                return <NoteListItem key={note._id} note={note} />;
            });
        }
        return <NoteListEmptyItem />;
    }

    return (
        <div className="item-list">
            <NoteListHeader />
            <br/>
            {renderNotes()}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Meteor.subscribe('notes');
    return {
        notes: Notes.find({},{ sort: { updatedAt: -1 } }).fetch().map(note => {
            return {
                ...note,
                selected: note._id === selectedNoteId,
            }
        })
    };
})(NoteList);