/* global test expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeEditor from '../../components/CodeEditor';
import 'jest-canvas-mock';

let value = "const test = 'test;";
const setValue = () => false;

test('render CodeEditor and test that the value of the editor is displayed on the page ', async () => {
    render(<CodeEditor value={value} setValue={setValue} />);
    setTimeout(() => {
        expect(screen.getByText("const test = 'test")).toBeInTheDocument();
    }, 1000);

});
