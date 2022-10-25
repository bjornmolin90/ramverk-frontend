/* global test expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Auth from '../../components/Auth';
import 'jest-canvas-mock';

const setToken = () => false; 
const user = "user"
const setUser = () => false;


test('render Auth, test that emailField is present and that it changes to correct value ',
    async () => {
        const { getByTestId } = render(<Auth setToken={setToken} user={user} setUser={setUser} />);

        const emailTest = await getByTestId("authEmail");

        expect(emailTest).toBeDefined();


        fireEvent.change(emailTest, { target: { value: 'test@mail.com' } });
        expect(emailTest.value).toBe('test@mail.com');
    });
    
test('render Auth, test that passwordField is present and that it changes to correct value ',
    async () => {
        const { getByTestId } = render(<Auth setToken={setToken} user={user} setUser={setUser} />);

        const passwordTest = await getByTestId("authPassword");

        expect(passwordTest).toBeDefined();


        fireEvent.change(passwordTest, { target: { value: 'Password' } });
        expect(passwordTest.value).toBe('Password');
    });
