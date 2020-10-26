// Required packages for testing
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

// Components to be tested
import AboutPage from '../pages/AboutPage.js';
import ContactUs from '../pages/ContactUsPage.js';
import ForPractitionersPage from '../pages/ContactUsPage.js';
import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage.js';
import PractitionerListPage from '../pages/PractitionerListPage.js';
import PractitionerProfile from '../pages/PractitionerProfile.js';
// import RegisterPage from '../pages/RegisterPage.js';
// import SearchPage from '../pages/SearchPage.js';
// import TermsAndConditionsPage from '../pages/TermsAndConditionsPage.js';


// Snapshot tests for UI testing.
test('About Page Renders properly', () => {
    const tree = renderer.create(<Router><AboutPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Contact Renders properly', () => {
    const tree = renderer.create(<Router><ContactUs /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('For-Practitioners Page Renders properly', () => {
    const tree = renderer.create(<Router><ForPractitionersPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

// test('Home Page Renders properly', () => {
//     const tree = renderer.create(<Router><HomePage /></Router>).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// test('Login Page Renders properly', () => {
//     const tree = renderer.create(<Router><LoginPage /></Router>).toJSON();
//     expect(tree).toMatchSnapshot();
// });

test('Practitioner List Page Renders properly', () => {
    const tree = renderer.create(<Router><PractitionerListPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Practitioner Profile Renders properly', () => {
    const tree = renderer.create(<Router><PractitionerProfile /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

// test('Ts & Cs Page Renders properly', () => {
//     const tree = renderer.create(<Router><TermsAndConditionsPage /></Router>).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// test('Register Page Renders properly', () => {
//     const tree = renderer.create(<Router><RegisterPage /></Router>, {createNodeMock}).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// test('Search Page Renders properly', () => {
//     const tree = renderer.create(<Router><SearchPage /></Router>).toJSON();
//     expect(tree).toMatchSnapshot();
// });





