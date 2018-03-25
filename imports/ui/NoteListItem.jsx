import React from 'react';
import moment from 'moment';
import PropTypes from 'proptypes';


export default NoteListItem = (props) => {
    return (
        <div>
            <h5>{props.note.title || 'Untitled note'}</h5>
            <p>{moment(props.note.updatedAt).format('Y-MM-DD')}</p>
        </div>
    );
};

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired
};