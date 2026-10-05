import { useContext } from 'react';
import { Route, Routes } from 'react-router';

import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';

import ConsultationDetails from './components/Consultations/ConsultationDetails';
import Consultations from './components/Consultations/Consultations';
import EditConsultation from './components/Consultations/EditConsultation';

import EditMaterial from './components/Materials/EditMaterial';
import MaterialDetails from './components/Materials/MaterialDetails';
import Materials from './components/Materials/Materials';
import NewMaterial from './components/Materials/NewMaterial';

import EditOrder from './components/Orders/EditOrder';
import OrderDetails from './components/Orders/OrderDetails';
import Orders from './components/Orders/Orders';

import ConsultationForm from './components/Professionals/ConsultationForm';
import EngineerProfile from './components/Professionals/EngineerProfile';
import Professionals from './components/Professionals/Professionals';

import NewProject from './components/Projects/NewProject';
import ProjectDetails from './components/Projects/ProjectDetails';
import Projects from './components/Projects/Projects';

import EditServiceRequest from './components/ServiceRequests/EditServiceRequest';
import ServiceRequestDetails from './components/ServiceRequests/ServiceRequestDetails';
import ServiceRequests from './components/ServiceRequests/ServiceRequests';

import ServiceRequestForm from './components/Services/ServiceRequestForm';
import Services from './components/Services/Services';
import SpecialistProfile from './components/Services/SpecialistProfile';

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

        <Route
          path="/projects/:projectId"
          element={user ? <ProjectDetails /> : <Landing />}
        />

        <Route
          path="/professionals"
          element={user ? <Professionals /> : <Landing />}
        />

        <Route
          path="/engineers/:engineerId"
          element={user ? <EngineerProfile /> : <Landing />}
        />

        <Route
          path="/engineers/:engineerId/consultation"
          element={user ? <ConsultationForm /> : <Landing />}
        />

        <Route
          path="/consultations"
          element={user ? <Consultations /> : <Landing />}
        />

        <Route
          path="/consultations/:consultationId"
          element={user ? <ConsultationDetails /> : <Landing />}
        />

        <Route
          path="/consultations/:consultationId/edit"
          element={user ? <EditConsultation /> : <Landing />}
        />

        <Route
          path="/services"
          element={user ? <Services /> : <Landing />}
        />

        <Route
          path="/specialists/:specialistId"
          element={user ? <SpecialistProfile /> : <Landing />}
        />

        <Route
          path="/specialists/:specialistId/request"
          element={user ? <ServiceRequestForm /> : <Landing />}
        />

        <Route
          path="/service-requests"
          element={user ? <ServiceRequests /> : <Landing />}
        />

        <Route
          path="/service-requests/:requestId"
          element={user ? <ServiceRequestDetails /> : <Landing />}
        />

        <Route
          path="/service-requests/:requestId/edit"
          element={user ? <EditServiceRequest /> : <Landing />}
        />

        <Route
          path="/materials"
          element={user ? <Materials /> : <Landing />}
        />

        <Route
          path="/materials/new"
          element={user ? <NewMaterial /> : <Landing />}
        />

        <Route
          path="/materials/:materialId"
          element={user ? <MaterialDetails /> : <Landing />}
        />

        <Route
          path="/materials/:materialId/edit"
          element={user ? <EditMaterial /> : <Landing />}
        />

        <Route
          path="/orders"
          element={user ? <Orders /> : <Landing />}
        />

        <Route
          path="/orders/:orderId"
          element={user ? <OrderDetails /> : <Landing />}
        />

        <Route
          path="/orders/:orderId/edit"
          element={user ? <EditOrder /> : <Landing />}
        />
      </Routes>
    </>
  );
};

export default App;