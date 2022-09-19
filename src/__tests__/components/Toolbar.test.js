/* global test expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toolbar from '../../components/Toolbar';

let value = "Hej";
const setValue = () => false;
const setCurrentDoc = () => false;
let currentDoc = {};
let docs = [];

test('render Toolbar, test select with default value and Choose a document is present on screen ',
    async () => {
        const { getByTestId } = render(<Toolbar value={value} setValue={setValue}
            currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} docs={docs} />);

        expect(screen.getByText(/Choose a document/i)).toBeInTheDocument();
        const select = await getByTestId("select");

        expect(select).toBeDefined();
        expect(select.value).toBe("-99");
    });

test('render Toolbar and test that nameField is present and that the value is correct ',
    async () => {
        const { getByTestId } = render(<Toolbar value={value} setValue={setValue}
            currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} docs={docs} />);

        const name = await getByTestId("nameField");

        expect(name).toBeDefined();


        fireEvent.change(name, { target: { value: 'docname' } });
        expect(name.value).toBe('docname');
    });
