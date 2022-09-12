import "../styles/Toolbar.css"
import { FaRegSave } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { useState } from 'react';
import docsModel from '../models/docs';


function Toolbar ( props ) {

    const [docName, setDocName] = useState("");

    function fetchDoc (event) {
        const doc = props.docs.filter(doc => doc.name === event.target.value)
        props.setCurrentDoc(doc)
        props.setValue(doc[0].content)
        setDocName(doc[0].name)
    }

    function changeHandler(event) {
        setDocName(event.target.value);
    }


    async function save () {
        let doc
        const result = props.docs.find(({ name }) => name === docName);
        if (typeof result === 'undefined') {
            doc = await docsModel.saveDoc({content: props.value, name: docName})
        } else {
            doc = await docsModel.updateDoc({content: props.value, name: docName, _id: result._id})
        }
        props.setCurrentDoc(doc)
        
    }

    function create () {
        props.setValue("")
        setDocName("")
        props.setCurrentDoc({})

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
                <input name="name" placeholder="Name of doc" onChange={changeHandler} value={docName}/>
            </div>
            <div className="docSelect">
                <select
                    onChange={fetchDoc} 
                    >
                    <option value="-99" key="0">Choose a document</option>
                    {props.docs.map((doc, index) => <option value={doc.name} key={index}>{doc.name}</option>)}
                </select>
            </div>
        </div>
    );
}

export default Toolbar;


