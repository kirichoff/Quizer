import React,{Component} from 'react';
import { Route } from 'react-router';
import QuizSelector from "./components/QuizSelector";
import QuizRender from "./components/QuizRender";
import  InfoForm from  './components/InfoForm'
import AgregateComponent from "./components/AgregateComponent";
import AdminAgregateComponent from "./components/AdminAgregateComponent";
import BarRender from "./components/BarRender";
import PieRender from "./components/PieRender";
import LogIn from "./components/LogIn";
import {Background,Background2} from "./components/Background";
import StatistickRender from "./components/StatistickRender";
import Help from "./components/Help";
import Login from "./pages/Login/Login";
import TestsList from "./pages/TestsList/TestsList";
import {Redirect} from "react-router-dom";
import Results from "./pages/Result/Results";
export default () => (

  <div>
      <Redirect from={'/'} to={'/bg/LoginBeta'} />
      <Route path={'/bg/LoginBeta'} component={Login} />
      <Route path={'/bg2/TestsList'} component={TestsList} />
      <Route path={'/bg2/Results/:id'} component={Results} />
      <Route path={'/Bar'} component={BarRender}  />
      <Route path={'/Stat/:id'} component={StatistickRender}/>
      <Route path={'/Pie'}  component = {PieRender} />
      <Route path={'/bg/info/:id'} component={InfoForm} />
      <Route path={'/bg'} component={Background} />
      <Route path={'/bg2'} component={Background2} />
      <Route path={'/Help'} component={Help} />
      <Route path={'/bg/Test/:id'} component={AgregateComponent}  />
      <Route path={'/Home/Login'} component={LogIn}/>
      <Route path={'/bg/Admin'} component={AdminAgregateComponent}/>
      <Route path={'/bg/QuizRender/:id' }component={QuizRender} />
  </div>

);
