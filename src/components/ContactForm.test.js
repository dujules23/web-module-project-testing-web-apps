import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    // Arrange:
    render(<ContactForm />)

    // Act:
    const header = screen.getByText(/contact form/i)

    // Assert:
    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    // Arrange:
    render(<ContactForm />)

    const firstName = screen.getByLabelText(/first Name/i);

   // Act:
    userEvent.type(firstName, "Dj");

    // Assert:
    const firstNameError = await screen.findByText(/error/i)
    expect(firstNameError).toBeInTheDocument();


});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    // Arrange:
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i});

    // Act:
    userEvent.click(submitButton);


    // Assert: 
    const errorFirstName = await screen.findAllByText(/firstname must have at least 5 characters/i);
    const errorLastName = await screen.findAllByText(/lastname is a required field/i);
    const errorEmail = await screen.findAllByText(/email must be a valid email/i);
    expect(errorFirstName).toBeTruthy();
    expect(errorLastName).toBeTruthy();
    expect(errorEmail).toBeTruthy();

    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    // Arrange:
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first Name/i);
    const lastName = screen.getByLabelText(/last Name/i);
    
    const submitButton = screen.getByRole('button', { name: /submit/i});

    // Act: 
    userEvent.type(firstName, "Action");
    userEvent.type(lastName, "Jackson");

    userEvent.click(submitButton);

    // Assert:
    const errorEmail = await screen.findAllByText(/email must be a valid email/i);
    expect(errorEmail).toBeTruthy();

    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    // Arrange:
    render(<ContactForm />);
    const email = screen.getByLabelText(/email/i);
    
    
    // Act:
    userEvent.type(email, "Um, is this an email?");

    // Assert:
    const errorEmail = await screen.findAllByText(/email must be a valid email/i);
    expect(errorEmail).toBeTruthy();


    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    // Arrange: 
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first Name/i);
    const email = screen.getByLabelText(/email/i);

    const submitButton = screen.getByRole('button', { name: /submit/i});

    // Act: 
    userEvent.type(firstName, "Johnny");
    userEvent.type(email, "JohnnyA@ymail.com");

    userEvent.click(submitButton);


    // Assert:
    const errorLastName = await screen.findAllByText(/lastname is a required field/i);
    expect(errorLastName).toBeTruthy();

    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    // Arrange: 
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first Name/i);
    const lastName = screen.getByLabelText(/last Name/i);
    const email = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /submit/i});

    // Act: 
    userEvent.type(firstName, "Johnny");
    userEvent.type(lastName, "Appleseed")
    userEvent.type(email, "JohnnyA@ymail.com");

    userEvent.click(submitButton);userEvent

    // Assert:
    const newFirstName = await screen.findAllByText(/Johnny/i);
    const newLastName = await screen.findAllByText(/Appleseed/i);
    const newEmail = await screen.findAllByText(/JohnnyA@ymail.com/i);

    expect(newFirstName).toBeTruthy();
    expect(newLastName).toBeTruthy();
    expect(newEmail).toBeTruthy();




    
});

test('renders all fields text when all fields are submitted.', async () => {
    // Arrange:
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first Name/i);
    const lastName = screen.getByLabelText(/last Name/i);
    const email = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /submit/i});

    // Act: 
    userEvent.type(firstName, "Johnny");
    userEvent.type(lastName, "Appleseed")
    userEvent.type(email, "JohnnyA@ymail.com");

    userEvent.click(submitButton);

    // Assert:
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    
});