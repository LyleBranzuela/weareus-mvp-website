// Required packages for testing
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

// Components to be tested
import NavigationBar from '../general-components/NavigationBar.js';
import NavigationBar2 from '../general-components/NavigationBar2.js';
import Error404Page from '../general-components/Error404Page.js';
import Footer from '../general-components/Footer.js';
import CustomButton from '../general-components/CustomButton.js';




// Snapshot tests for UI testing.
test('Navbar 1 Renders properly', () => {
    const tree = renderer.create(<Router><NavigationBar /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Navbar 2 Renders properly', () => {
    const tree = renderer.create(<Router><NavigationBar2 /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Error 404 Page Renders properly', () => {
    const tree = renderer.create(<Router><Error404Page /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Footer Renders properly', () => {
    const tree = renderer.create(<Router><Footer /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Custom Button Renders properly', () => {
    const tree = renderer.create(<Router><CustomButton /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});



