import './App.css';
import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import docsModel from './models/docs';

function App() {
    const [value, setValue] = useState('');
    const [currentDoc, setCurrentDoc] = useState({});
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        (async () => {
            const allDocs = await docsModel.getAllDocs();

            setDocs(allDocs);
        })();
    }, [currentDoc]);

    return (
        <>
            <Toolbar value={value} setValue={setValue} currentDoc={currentDoc}
                setCurrentDoc={setCurrentDoc} docs={docs} />
            <Editor value={value} setValue={setValue}/>
        </>
    );
}

export default App;
