import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Home, HomeDetails, CreateHome, Auth, HomeType} from './pages';
import HomeSearched from "./pages/HomeSearched";

const App = () => {
  return (
    <>
        <BrowserRouter>      
          <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/auth" element={<Auth/>} />
              <Route path="/home_type" element={<HomeType/>} />
              <Route path="/create_home" element={<CreateHome/>} />
              <Route path="/homedetails/:id" element={<HomeDetails/>} /> {/* I want this page to be a modal page */}
              <Route path="/home_searched" element={<HomeSearched/>} /> 
            </Routes> 
          </main>
        </BrowserRouter>
        <ToastContainer/>
    </>

  )
}

export default App