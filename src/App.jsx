import { useContext } from 'react';
import { Route, Routes } from 'react-router';

import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import NewProject from './components/Projects/NewProject';
import Projects from './components/Projects/Projects';
import SignInForm from './components/SignInForm/SignInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Landing />}
        />

        <Route
          path="/sign-in"
          element={<SignInForm />}
        />

        <Route
          path="/sign-up"
          element={<SignUpForm />}
        />

        <Route
          path="/projects"
          element={user ? <Projects /> : <Landing />}
        />

        <Route
          path="/projects/new"
          element={user ? <NewProject /> : <Landing />}
        />
      </Routes>
    </>
  );
};

export default App;