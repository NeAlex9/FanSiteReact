import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Layout from "./components/Layout";
import Author from './components/pages/Author'
import WorksCollectionLayout from "./components/pages/worksPage/WorksCollectionLayout";
import TitleCollection from "./components/pages/worksPage/TitleCollection";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import Media from "./components/pages/mediaPage/Media";
import ImageCollection from "./components/pages/worksPage/ImageCollection";

function App() {
  return (
      <Layout>
        <Routes>
          <Route exact path='/' element={<Author/>}/>
          <Route exact path='/works' element={<WorksCollectionLayout/>}>
            <Route index element={<ImageCollection/>}/>
            <Route path={"TitleCollection"} element={<TitleCollection/>}/>
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
