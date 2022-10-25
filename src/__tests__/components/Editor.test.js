/* global test expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Editor from '../../components/Editor';
import 'jest-canvas-mock';

let value = "This is a test";
const setValue = () => false;

test('render editor and test that the value of the editor is displayed on the page ', () => {
    render(<Editor value={value} setValue={setValue} />);

    expect(screen.getByText(/This is a test/i)).toBeInTheDocument();
});
