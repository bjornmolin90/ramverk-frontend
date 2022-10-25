/* global test expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toolbar from '../../components/Toolbar';
import 'jest-canvas-mock';

let value = "Hej";
const setValue = () => false;
const setCurrentDoc = () => false;
let currentDoc = {};
let docs = [];
let users = ["bam@mail.com", "bjorn@mail.com"];
let user = "";
let permittedUsers = 
    {
        doc :
        {
            users: ["bam@mail.com", "bjorn@mail.com"]
        }
    };

let textEditor = true;
const setTextEditor = () => false;

test('render Toolbar, test select with default value and Choose a document is present on screen ',
    async () => {
        const { getByTestId } = render(<Toolbar value={value} setValue={setValue}
            currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} docs={docs}
            users={users} user={user} permittedUsers={permittedUsers}
            textEditor={textEditor} setTextEditor={setTextEditor} />);

        expect(screen.getByText(/Choose a document/i)).toBeInTheDocument();
        const select = await getByTestId("select");

        expect(select).toBeDefined();
        expect(select.value).toBe("-99");
    });

test('render Toolbar and test that nameField is present and that the value is correct ',
    async () => {
        const { getByTestId } = render(<Toolbar value={value} setValue={setValue}
            currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} docs={docs} 
            users={users} user={user} permittedUsers={permittedUsers}
            textEditor={textEditor} setTextEditor={setTextEditor} />);

        const name = await getByTestId("nameField");

        expect(name).toBeDefined();


        fireEvent.change(name, { target: { value: 'docname' } });
        expect(name.value).toBe('docname');
    });
