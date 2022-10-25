/* global test expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SendGrid from '../../components/SendGrid';
import 'jest-canvas-mock';

let currentDoc = {};
const sendMail = jest.fn(); 
const email = "test@mail.com"
const setEmail = () => false;


test('render SendGrid, test that emailField is present and that it changes to correct value ',
    async () => {
        const { getByTestId } = render(<SendGrid currentDoc={currentDoc}  sendMail={sendMail} email={email} setEmail={setEmail}/>);

        const emailTest = await getByTestId("emailField");

        expect(emailTest).toBeDefined();


        fireEvent.change(emailTest, { target: { value: 'test@mail.com' } });
        expect(emailTest.value).toBe('test@mail.com');
    });
    
const msg = {
    name: "test"
}

test('render SendGrid, test that button works and calls the sendMail function',
    async () => {
        const { getByTestId } = render(<SendGrid currentDoc={currentDoc} sendMail={sendMail} email={email} setEmail={setEmail} />);

        const button = await getByTestId("button");

        expect(button).toBeDefined();
        fireEvent.click(button);

        expect(sendMail).toHaveBeenCalled();
    });

