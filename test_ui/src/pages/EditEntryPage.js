import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import ornament from '../ornament.png';
import watercolor from '../watercolor.png';

export const EditEntryPage = ({entryToEdit}) => {

    const [title, setTitle] = useState(entryToEdit.title);
    const [year, setYear] = useState(entryToEdit.year);
    const [language, setLanguage] = useState(entryToEdit.language);

    const history = useHistory();

    const editEntry = async () => {
        const editedEntry = { title, year, language };
        const response = await fetch(`/entries/${entryToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedEntry),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the entry!");
        } else {
            alert(`Failed to edit the entry, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (

        <div id="container">

            <img src={ornament} id="ornament" alt="ornament"/>
            <div id="vl"></div>
            <div id="vl2"></div>

            <div id="banner">
                <img src={watercolor} id="watercolor" alt="watercolor"/>
                <div id="header">ambient</div>
                <div id="subheader">an intuitive journal</div>
            </div>

        <div id="left-side">

            <div id="edit-entry">

                <p>
                    Title<br></br>
                    <input id="edit-title" type="text" value={title}
                     onChange={e => setTitle(e.target.value)}/>
                    </p>

                <p>
                    Date<br></br>
                    <input id="edit-date" type="text" value={year}
                     onChange={e => setYear(e.target.value)}/>
                </p>

                <p>
                    <textarea id="edit-text" type="text" value={language}
                     onChange={e => setLanguage(e.target.value)}/>
                </p>
                    
                <button id="edit-entry-button" onClick={editEntry}>Submit</button>

            </div>

        </div>

        <div id="sidebar"></div>
        
        <div id="vl"></div></div>
    );
}

export default EditEntryPage;