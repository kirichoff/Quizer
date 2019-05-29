import React from 'react';
import { Route } from 'react-router';
import { ApplyTheme } from 'rambler-ui/theme'
import FetchData from './components/FetchData';
import TestPage from "./components/TestPage";
import QuizSelector from "./components/QuizSelector";
import QuizRender from "./components/QuizRender";
import QuizCard from "./components/QuizCard";
import  InfoForm from  './components/InfoForm'
import Background from "./components/Background";
import User from "./components/User";
import AgregateComponent from "./components/AgregateComponent";
import Index from  './components/MasonryComponent'
import AdminAgregateComponent from "./components/AdminAgregateComponent";
import AdminQuizRender from "./components/AdminQuizRender";
import Arrow from "./components/Arrow";
import {Masonry} from "react-virtualized";

export default () => (

  <div>
      <Route path exact  ='/' component = {QuizSelector} />
     <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
      <Route path='/bg/Quiz/:id?' component={QuizRender} />
      <Route path='/QuizRender' component={QuizRender} />
      <Route path='/bg' component={Background} />
      <Route path={'/Masonry'}  component={Index} />
      <Route path={'/User'} component={User} />
      <Route path='/Mansory/:itemsWithSizes?' component={Index} />
      <Route path='/bg/info/:id' component={InfoForm} />
      <Route path={'/bg/Test/:id'} component={AgregateComponent}  />
      <Route path={'/arrwo'} component={Arrow}/>
      <Route path={'/bg/Admin'} component={AdminAgregateComponent}/>
      <Route path='/bg/QuizRender/:id' component={QuizRender} />
  </div>

);
