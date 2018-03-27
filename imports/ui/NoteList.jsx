import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'proptypes';

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
        <div>
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
    Meteor.subscribe('notes');
    return {
        notes: Notes.find().fetch()
    };
})(NoteList);