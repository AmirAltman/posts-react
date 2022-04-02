import { Routes, Route } from "react-router-dom";
import PostDashboard from "./pages/PostDashboard";
import StatsDashboard from "./pages/StatsDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {
  return (
      <div className="App">
        <h1>Welcome to Post-It!</h1>
        <Routes>
          <Route path="/" element={<PostDashboard />} />
          <Route path="stats" element={<StatsDashboard />} />
        </Routes>
      </div>
  );
}


export default App;
