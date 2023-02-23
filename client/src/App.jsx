import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Home, HomeDetails, CreateHome, Auth, Apartment_for_rent, Studio_for_rent, Room_for_rent, Commercial_space_for_rent } from './pages';

const App = () => {
  return (
    <>
        <BrowserRouter>      
          <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/auth" element={<Auth/>} />
              <Route path="/studio_for_rent" element={<Studio_for_rent/>} />
              <Route path="/room_for_rent" element={<Room_for_rent/>} />
              <Route path="/apartment_for_rent" element={<Apartment_for_rent/>} />
              <Route path="/commercial_space_for_rent" element={<Commercial_space_for_rent/>} />
              <Route path="/create_home" element={<CreateHome/>} />
              <Route path="/homedetails" element={<HomeDetails/>} /> {/* I want this page to be a modal page */}
              
            </Routes> 
          </main>
        </BrowserRouter>
        <ToastContainer/>
    </>

  )
}

export default App