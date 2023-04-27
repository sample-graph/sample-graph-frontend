import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Content, Section } from 'react-bulma-components';

import { AppHeader } from './Header';
import { AppFooter } from './Footer';
import { AppAbout } from './About';
import { Search } from './Search';
import { DisplayGraph } from './Graph';

function AppBase(core) {
  return (
    <div className="App">
      <AppHeader/>
        <Section>
          <Container>
            <Content>
              {core}
            </Content>
          </Container>
        </Section>
      <AppFooter/>
    </div>
  );
}

export function AppHome() {
  return AppBase(
    <React.Fragment>
      <Search/>
      <hr/>
      <AppAbout/>
    </React.Fragment>
  );
}

export function AppGraph() {
  return AppBase(
    <React.Fragment>
      <DisplayGraph/>
    </React.Fragment>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AppHome/>}
        />
        <Route
          path="/graph/:id"
          element={<AppGraph/>}
        />
      </Routes>
    </Router>
  );
}
