import React from 'react';
import { Route } from 'react-router';
import FetchData from './components/FetchData';
import TestPage from "./components/TestPage";
import QuizSelector from "./components/QuizSelector";
import QuizRender from "./components/QuizRender";
import Background from "./components/Background";
import InfoForm from "./components/InfoForm";
export default () => (
  <div>
      <Route path exact  ='/' component = {QuizSelector} />
     <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
      <Route path='/bg/Quiz/:id?' component={QuizRender} />
      <Route path='/QuizRender' component={QuizRender} />
      <Route path='/bg' component={Background} />
      <Route path='/bg/Tp/:id' component={TestPage} />
      <Route path='/bg/Info/:id' component={InfoForm} />
      <Route path='/bg/QuizRender/:id?' component={QuizRender} />
  </div>
);
