
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './Home';
import PostPage from './Postpage';
import DestinationPage from "./Destination";
import Postmap from "./Postmap";
import List from "./List";
import CreatePost from "./Createpost";
import PostDetail from "./PostDetail";
import SavedPlaces from "./SavedPlaces";
import LoginPage from "./LoginPage";
import SignupPage from "./Signin";
import ProfilePage from "./ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/destination" element={<DestinationPage />} />
        <Route path="/Postmap/:id" element={<Postmap/>}/>
        <Route path="/List" element={<List/>}/>
        <Route path="/CreatePost" element={<CreatePost/>}/>
        <Route path="/PostDetail/:id" element={<PostDetail/>}/>
        <Route path="/SavePlaces" element={<SavedPlaces/>}/>
        <Route path="/LoginPage" element={<LoginPage/>}/>
        <Route path="/Signup" element={<SignupPage/>}/>
        <Route path="/ProfilePage" element={<ProfilePage/>}/>
      </Routes>
      
    </>
    
  );
}

export default App;
