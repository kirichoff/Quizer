import React, {Component} from 'react';
import  {connect} from 'react-redux'
import QuizRender from "./QuizRender";

const QuizRef = ({qw}) =>{
    console.log(qw)
    return(
        <QuizRender
            text ={qw.text}
            id = {qw.id}
            header={qw.header}
            img ={qw.src}
            date = {qw.date}
        />
    );
}
export default (QuizRef);