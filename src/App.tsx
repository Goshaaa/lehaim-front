import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './page/home/Home';
import AboutPage from './page/about/About';
import SearchPatient from './page/searchPatient/SearchPatient';
import AddPatient from './page/addPatient/AddPatient';
import PatientCard from "./page/patientCard/PatientCard";
import EditAnalyzes from "./page/analyzes/EditAnalyzes";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/searhPatient" element={<SearchPatient />} />
        <Route path="/addPatient" element={<AddPatient />} />
        <Route path="/patientCard/:patientId" element={<PatientCard />} />
        <Route path="/patient/:patientId/analyzes/" element={<EditAnalyzes />} />
        <Route path="/patient/:patientId/analyzes/:testId" element={<EditAnalyzes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
