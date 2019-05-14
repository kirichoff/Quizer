﻿import React from 'react';
import { Route } from 'react-router';
import FetchData from './components/FetchData';
import TestPage from "./components/TestPage";
import QuizSelector from "./components/QuizSelector";
import QuizRender from "./components/QuizRender";
import QuizCard from "./components/QuizCard";
import  InfoForm from  './components/InfoForm'
import Background from "./components/Background";
import User from "./components/User";
import AgregateComponent from "./components/AgregateComponent";
export default () => (
  <div>
      <Route path exact  ='/' component = {QuizSelector} />
     <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
      <Route path='/bg/Quiz/:id?' component={QuizRender} />
      <Route path='/QuizRender' component={QuizRender} />
      <Route path='/bg' component={Background} />
      <Route path='/bg/Tp' component={TestPage} />    
      <Route path='/bg/info/:id' component={InfoForm} />
      <Route path={'/bg/Test/:id'} component={AgregateComponent}  />
      <Route path='/bg/QuizRender/:id' component={QuizRender} />
  </div>
);
