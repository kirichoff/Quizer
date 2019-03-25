import React from 'react';
import { Route } from 'react-router';
import FetchData from './components/FetchData';
import TestPage from "./components/TestPage";
import QuizSelector from "./components/QuizSelector";
import QuizRender from "./components/QuizRender";
export default () => (
  <div>
      <Route path ='/' component = {QuizSelector} />
    <Route path ='/TestPage' component = {TestPage} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
      <Route path='/Quiz/:id?' component={QuizRender} />
  </div>
);
