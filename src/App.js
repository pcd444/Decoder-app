import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

class TxtArea extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: "Copy and paste here", output: ""}
  }

  handleChange = (event)=>{
    this.setState({value: event.target.value});
  }

  handleSubmit = (event)=>{
    this.setState({output: this.state.value});
  }
  render(){
    return(
      <div>
        Copy and paste encrypted text here.
        <textarea value = {this.state.value} onChange = {this.handleChange}/>
        
        <button onClick = {this.handleSubmit}>Click to load text</button>
        {this.state.output}

      </div> 
    );
  }
}


class DemoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {currStep: 0,};
  }

  render(){
    var element = null
    switch(this.state.currStep){
      case 0:
        element = <LoadTxt></LoadTxt>
        break;
      case 1:
        break;
      default:
        break;
    }
    

    return(
      <div>
        <h1>Demo App v 1.0</h1>
        <CompletionBar step = {this.state.currStep}></CompletionBar>
        {element}
        {this.state.currStep !== 0?<button onClick>Left arrow</button>: null}
        {this.state.currStep !== 3?<button>Right arrow</button>:null}
      </div>
    );
  }
}

class LoadTxt extends React.Component{
  render(){
    return(
      <TxtArea></TxtArea>
    );
  }
}

function CompletionBar(props){
  return(
  <div className = 'step-container'>
    <CompletionStep myStep = {0} currentStep = {props.step} stepName = 'Load txt'/>
    <CompletionStep myStep = {1} currentStep = {props.step} stepName = 'Upper/Lower'/>
    <CompletionStep myStep = {2} currentStep = {props.step} stepName = 'Choose color'/>
    <CompletionStep myStep = {3} currentStep = {props.step} stepName = 'Choose font'/>
  </div>);
}

function CompletionStep(props){
  if (props.myStep === props.currentStep){
    return(
    <div className = 'step-item step-item-in-progress'>
      {props.stepName}
    </div>);    
  }
  if (props.myStep < props.currentStep){
    return(
    <div className = 'step-item step-item-complete'>
      {props.stepName}
    </div>);    
  }
  if (props.myStep > props.currentStep){
    return(
    <div className = 'step-item step-item-not-started'>
      {props.stepName}
    </div>);    
  }
  else{
    return(<div>BAD, the thing fell through</div>)
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default DemoApp;
