import './App.css';
import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import Auth from './components/Auth';
import docsModel from './models/docs';
import authModel from './models/auth';
import { io } from "socket.io-client";

let sendToSocket = false;
/* const url = "https://js-ramverk-editor-bjmo21.azurewebsites.net"; */
const url = "http://localhost:1337";

function changeSendToSocket(value) {
    sendToSocket = value;
}

function App() {
    const [value, setValue] = useState('');
    const [currentDoc, setCurrentDoc] = useState({});
    const [docs, setDocs] = useState([]);
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const allDocs = await docsModel.getAllDocs();
            const allUsers = await authModel.getAllUsers();

            setDocs(allDocs);
            setUsers(allUsers);
        })();
    }, [currentDoc]);

    useEffect(() => {
        (async () => {
            const allDocs = await docsModel.getAllDocs();

            setDocs(allDocs);
        })();
    }, [token]);

    useEffect(() => {
        setSocket(io(url));

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
        <main className="main">
            {token ?
                <>
                    <Toolbar value={value} setValue={setValue} currentDoc={currentDoc}
                        setCurrentDoc={setCurrentDoc} docs={docs} users={users} user={user} />
                    <Editor value={value} setValue={setValue}/>
                </>
                :
                <Auth setToken={setToken} user={user} setUser={setUser} />
            }
        </main>
    );
}

export default App;
