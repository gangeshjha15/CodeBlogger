import DataProvider from "./context/DataProvider";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

//components
// import Login from "./components/account/Login";
import TestLogin from "./components/account/TestLogin";
// import Home from "./components/home/Home";
import Header from "./components/header/Header";
import CreatePost from "./components/posts/CreatePost";
import DetailView from "./components/details/DetailView";
import UpdatePost from "./components/posts/UpdatePost";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import TestHome from "./components/home/TestHome";
import Profile from "./components/profile/Profile";

  const PrivateRoute = ({isUserAuth, ...props})=>{
    return isUserAuth?
    <>
      <Header />
      <Outlet/>
    </>
    : <Navigate replace to='/login' />
  }

function App() {

  const [isUserAuth, setIsUserAuth] = useState(false)

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: "64px" }}>
          <Routes>
            {/* <Route path="/login" element={<Login setIsUserAuth={setIsUserAuth} />} /> */}

            <Route path="/login" element={<TestLogin setIsUserAuth={setIsUserAuth} />} />

            {/* Private Routes making */}
            {/* <Route path="/" element={<PrivateRoute isUserAuth={isUserAuth}/>} >
              <Route path="/" element={<Home />} />
            </Route> */}

            <Route path="/" element={<PrivateRoute isUserAuth={isUserAuth}/>} >
              <Route path="/" element={<TestHome/>} />
            </Route>

            <Route path="/create" element={<PrivateRoute isUserAuth={isUserAuth}/>} >
              <Route path="/create" element={<CreatePost />} />
            </Route>

            <Route path="/details/:id" element={<PrivateRoute isUserAuth={isUserAuth}/>} >
              <Route path="/details/:id" element={<DetailView/>} />
            </Route>

            <Route path="/update/:id" element={<PrivateRoute isUserAuth={isUserAuth}/>} >
              <Route path="/update/:id" element={<UpdatePost/>} />
            </Route>


            <Route path="/about" element={<PrivateRoute isUserAuth={isUserAuth}/>} >
              <Route path="/about" element={<About/>} />
            </Route>

            {/* <Route path="/about" element={<PrivateRoute isUserAuth={isUserAuth}/>} >
              <Route path="/about" element={<TestHome/>} />
            </Route> */}


            <Route path="/contact" element={<PrivateRoute isUserAuth={isUserAuth}/>} >
              <Route path="/contact" element={<Contact/>} />
            </Route>

            <Route path="/profile" element={<PrivateRoute isUserAuth={isUserAuth}/>} >
              <Route path="/profile" element={<Profile/>} />
            </Route>


          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
