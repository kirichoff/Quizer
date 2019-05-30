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

export default () => (

  <div>
      <Route path ={'/Home'} component = {QuizSelector} />
        <Route path={'/Bar'} component={BarRender}/>
        <Route path={'/Pie'}  component = {PieRender} />
      <Route path={'/bg/info/:id'} component={InfoForm} />
      <Route path={'/bg/Test/:id'} component={AgregateComponent}  />
      <Route path={'/Home/Login'} component={LogIn}/>
      <Route path={'/bg/Admin'} component={AdminAgregateComponent}/>
      <Route path={'/bg/QuizRender/:id' }component={QuizRender} />
  </div>

);
