import './App.css';
import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import docsModel from './models/docs';
import { io } from "socket.io-client";

let sendToSocket = false;

function changeSendToSocket(value) {
    sendToSocket = value;
}

function App() {
    const [value, setValue] = useState('');
    const [currentDoc, setCurrentDoc] = useState({});
    const [docs, setDocs] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        (async () => {
            const allDocs = await docsModel.getAllDocs();

            setDocs(allDocs);
        })();
    }, [currentDoc]);

    useEffect(() => {
        setSocket(io("http://localhost:1337"));

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (socket && currentDoc instanceof Array  && sendToSocket) {
            const data = {
                "_id": currentDoc[0]._id,
                "content": value,
                "name": currentDoc[0].name
            };

            socket.emit("input", data);
        }
        changeSendToSocket(true);
    }, [value]);

    useEffect(() => {
        if (socket) {
            socket.on("ack", function (data) {
                changeSendToSocket(false);

                setValue(data.content);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (currentDoc instanceof Array) {
            socket.emit("create", currentDoc[0]._id);
        }
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
