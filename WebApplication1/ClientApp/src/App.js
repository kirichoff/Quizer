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
import Background from "./components/Background";
import StatistickRender from "./components/StatistickRender";

export default () => (

  <div>
      <Route exact path ={'/'} component = {QuizSelector} />
        <Route path={'/Bar'} component={BarRender}  />
        <Route path={'/Stat/:id'} component={StatistickRender}/>
        <Route path={'/Pie'}  component = {PieRender} />
      <Route path={'/bg/info/:id'} component={InfoForm} />
      <Route path={'/bg'} component={Background} />
      <Route path={'/bg/Test/:id'} component={AgregateComponent}  />
      <Route path={'/Home/Login'} component={LogIn}/>
      <Route path={'/bg/Admin'} component={AdminAgregateComponent}/>
      <Route path={'/bg/QuizRender/:id' }component={QuizRender} />
  </div>

);
