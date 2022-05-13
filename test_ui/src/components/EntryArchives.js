import React from 'react';
import Entry from './Entry';

function EntryList({ entries, onEdit, onDelete }) {
    return (
        <table id="entries">
            <tbody>
                {entries.map((entry, i) => <Entry entry={entry}
                    onEdit = {onEdit}
                    onDelete = {onDelete}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default EntryList;