import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

const App = ()=> {
  let pageSize = 9;
  const apiKey = process.env.REACT_APP_apiKey;
  const [progress, setProgress] = useState(0)

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
    <LoadingBar 
      height= {3}
      color= "#f11946"
      progress={progress}
    />
    <Routes>
          <Route exact path="/" element={<News setProgress={setProgress}  apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress}  apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science"/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress}  apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment"/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress}  apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health"/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress}  apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress}  apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology"/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}


export default App;