import "../styles/Toolbar.css";
import { FaRegSave } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import React, { useState } from 'react';
import docsModel from '../models/docs';


function Toolbar( props ) {
    const [docName, setDocName] = useState("");

    async function fetchDoc(event) {
        if (event.target.value !== "-99") {
            let docs = await docsModel.getAllDocs();

            const doc = docs.filter(doc => doc.name === event.target.value);

            props.setCurrentDoc(doc);

            props.setValue(doc[0].content);
            setDocName(doc[0].name);
        }
    }

    async function addUser(event) {
        if (event.target.value !== "-99" && "_id" in props.currentDoc) {
            await docsModel.addUser({id: props.currentDoc[0]._id, user: event.target.value});
        }
    }

    function changeHandler(event) {
        setDocName(event.target.value);
    }


    async function save() {
        let doc;
        const result = props.docs.find(({ name }) => name === docName);

        if (typeof result === 'undefined') {
            doc = await docsModel.saveDoc({
                content: props.value, name: docName, users: [props.user.email]
            });
            props.setCurrentDoc(doc);
        } else {
            doc = await docsModel.updateDoc({content: props.value, name: docName, _id: result._id});
            props.setCurrentDoc(doc);
        }
    }

    function create() {
        props.setValue("");
        setDocName("");
        props.setCurrentDoc({});
    }

    return (
        <div className="toolbar">
            <div className="create">
                <IoCreateOutline className="createIcon" onClick={create} />
            </div>
            <div>
                <FaRegSave className="saveIcon" onClick={save} />
            </div>
            <div>
                <input data-testid="nameField" name="name" placeholder="Name of doc"
                    onChange={changeHandler} value={docName}/>
            </div>
            <div className="docSelect">
                <select
                    onChange={fetchDoc}
                    data-testid="select"
                >
                    <option value="-99" key="0">Choose a document</option>
                    {props.docs
                        .filter((doc) => doc.users.includes(props.user.email))
                        .map((doc, index) => <option value={doc.name}
                            key={index}>{doc.name}</option>)}
                </select>
            </div>
            <div className="docSelect">
                <select
                    onChange={addUser}
                >
                    <option value="-99" key="0">Choose a user to give permission</option>
                    {props.users.map((user, index) => <option value={user.email}
                        key={index}>{user.email}</option>)}
                </select>
            </div>
        </div>
    );
}

export default Toolbar;


