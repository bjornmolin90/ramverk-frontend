import "../styles/Toolbar.css";
import { FaRegSave, FaFilePdf } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import React, { useState } from 'react';
import docsModel from '../models/docs';
import Pdf from "react-to-pdf";
import parse from 'html-react-parser';
import NewWindow from 'react-new-window';
import { Buffer } from "buffer";
/* import SendGrid from "./SendGrid"; */


function Toolbar( props ) {
    const [docName, setDocName] = useState("");
    const [popup, setPopUp] = useState(false);
    const ref = React.createRef();
    const content = props.currentDoc[0]?.content ? props.currentDoc[0].content : "";

    async function fetchDoc(event) {
        if (event.target.value !== "-99") {
            let docs = await docsModel.getAllDocs();

            const doc = docs.filter(doc => doc.name === event.target.value);

            props.setCurrentDoc(doc);

            props.setValue(doc[0].content);
            setDocName(doc[0].name);
            props.setTextEditor(doc[0].texteditor);
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
                content: props.value, name: docName, users: [props.user.email],
                texteditor: props.textEditor
            });
            props.setCurrentDoc(doc);
        } else {
            doc = await docsModel.updateDoc({content: props.value, name: docName, _id: result._id});
            props.setCurrentDoc(doc);
        }
    }

    const PdfView = () => (
        popup ?
            <NewWindow copyStyles={false}>
                <Pdf targetRef={ref} filename={`${docName}.pdf`}>
                    {({ toPdf }) =>  <button onClick={async () => {
                        toPdf();
                        setTimeout(() => {
                            showPdf(false);
                        }, 1000);
                    }}>
                    Download pdf
                    </button>}
                </Pdf>
                <div ref={ref} className="pdfView">{parse(content)}</div>
            </NewWindow> : ""
    );

    const showPdf = (bool) => (
        setPopUp(bool)
    );

    function create() {
        props.setValue("");
        setDocName("");
        props.setCurrentDoc({});
    }

    const toggleEditor = () => (
        props.setTextEditor(!props.textEditor)
    );

    function execute() {
        const data = {
            code: Buffer.from(props.value).toString('base64')
        };

        fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function(result) {
                let decodedOutput = Buffer.from(result.data, 'base64').toString('ascii');

                alert(`Executed code:\n${decodedOutput}`);
            });
    }


    return (
        <>
            {/* <SendGrid currentDoc={props.currentDoc} /> */}
            <PdfView/>
            <div className="toolbar">
                <div className="create">
                    <IoCreateOutline className="createIcon" onClick={create} />
                </div>
                <div>
                    <FaRegSave className="saveIcon" onClick={save} />
                </div>
                <div>
                    <FaFilePdf className="saveIcon" onClick={() => showPdf(true)} />
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
                <div>
                    <button onClick={toggleEditor}>{props.textEditor ? "code" : "text"}</button>
                </div>
                <div>
                    {props.textEditor ? "" : <button onClick={execute} >Execute</button>}
                </div>
                <span>
                    Permitted users: {
                        props.permittedUsers instanceof Object ?
                            props.permittedUsers.doc.users.join(", ") : "None"
                    }
                </span>
            </div>
        </>
    );
}

export default Toolbar;


