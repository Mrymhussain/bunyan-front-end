import { useContext } from 'react';
import { Route, Routes } from 'react-router';

import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import EngineerProfile from './components/Professionals/EngineerProfile';
import Professionals from './components/Professionals/Professionals';
import NewProject from './components/Projects/NewProject';
import ProjectDetails from './components/Projects/ProjectDetails';
import Projects from './components/Projects/Projects';
import SignInForm from './components/SignInForm/SignInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import { UserContext } from './contexts/UserContext';
import ConsultationForm from './components/Professionals/ConsultationForm';

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

        <Route
          path="/projects/:projectId"
          element={user ? <ProjectDetails /> : <Landing />}
        />

        <Route
          path="/professionals"
          element={user ? <Professionals /> : <Landing />}
        />
        <Route
         path="/engineers/:engineerId/consultation"
         element={user ? <ConsultationForm /> : <Landing />}
         />

        <Route
          path="/engineers/:engineerId"
          element={user ? <EngineerProfile /> : <Landing />}
        />
      </Routes>
    </>
  );
};

export default App;