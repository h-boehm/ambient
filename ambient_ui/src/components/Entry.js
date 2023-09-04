import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

function Entry({ entry, onDelete, onEdit }) {
    return (
        <div id="entry">
            <tr>
                <td id="entry-title" colspan="3">{entry.title}</td>
            </tr>
            <tr>
                <td id="entry-date">{entry.year}</td>
                <td id="entry-edit"><MdEdit size="16" onClick={() => onEdit(entry)} 
                    onMouseOver={({target})=>target.style.color="gold"} onMouseOut={({target})=>target.style.color="midnightblue"}/></td>
                <td id="entry-delete"><MdDelete size="16" onClick={() => onDelete(entry._id)} 
                    onMouseOver={({target})=>target.style.color="gold"} onMouseOut={({target})=>target.style.color="midnightblue"}/></td>
            </tr>
            <tr>
                <td id="entry-text" colspan="3">{entry.language}</td>
            </tr>
        </div>
    );
}

export default Entry;