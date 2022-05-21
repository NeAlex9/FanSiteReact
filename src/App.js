import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Layout from "./components/Layout";
import Author from './components/pages/Author'
import WorksCollectionLayout from "./components/pages/worksPage/WorksCollectionLayout";
import ImageList from "./components/pages/worksPage/ImageList";
import TitleList from "./components/pages/worksPage/TitleList";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Media from "./components/pages/mediaPage/Media";

function App() {
  return (
      <Layout>
        <Routes>
          <Route exact path='/' element={<Author/>}/>
          <Route exact path='/works' element={<WorksCollectionLayout/>}>
            <Route index element={<ImageList/>}/>
            <Route path={"TitleList"} element={<TitleList/>}/>
          </Route>
          <Route path={"media"} >
            <Route path={":id"} element={<Media />}/>
          </Route>
          <Route exact path="/logIn" element={<LogIn />}/>
          <Route exact path="/signUp" element={<SignUp />}/>
        </Routes>
      </Layout>)
}

export default App;
