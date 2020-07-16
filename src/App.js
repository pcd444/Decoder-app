import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

class LoadText extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: "Copy and paste here", output: ""};
  }

  handleChange = (event)=>{
    this.setState({value: event.target.value});
  }

  handleSubmit = (event)=>{
    this.props.enableForwardButton();
    this.props.changeParentState({rawtext: this.state.value});
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

class UpperLower extends React.Component{
  constructor(props){
    super(props);
    this.state = {textin: props.text0, textout: props.text0};
  }

  makeUpper = (event) => {
    this.setState({textout: this.state.textin.toUpperCase()});
    this.props.enableForwardButton();
    this.props.changeParentState({augmented_text: this.state.textin.toUpperCase()});
  }
  makeLower = (event) => {
    this.setState({textout: this.state.textin.toLowerCase()});
    this.props.enableForwardButton();
    this.props.changeParentState({augmented_text: this.state.textin.toLowerCase()});
  }
  noChange = (event) => {
    this.setState({textout: this.state.textin});
    this.props.enableForwardButton();
    this.props.changeParentState({augmented_text: this.state.textin});
  }

  render(){
    return(<div>
              <div>{this.state.textin}</div>
              <button onClick = {this.makeUpper}>Make uppercase</button>
              <button onClick = {this.makeLower}>Make lowercase</button>
              <button onClick = {this.noChange}>No change</button>
              <div>{this.state.textout}</div>
          </div>);
  }
}

class ChooseColor extends React.Component{
  constructor(props){
    super(props);
    this.state = {textin: props.text1, color: "black"}
  }

  setColor = (color, event) => {
    this.setState({color: color});
    this.props.enableForwardButton();
    this.props.changeParentState({color: color});
  }

  render(){
    return(
      <div>
        <div>{this.state.textin}</div>
        <button onClick = {(e) => this.setColor("red", e)}>Red</button>
        <button onClick = {(e) => this.setColor("blue", e)}>Blue</button>
        <button onClick = {(e) => this.setColor("black", e)}>Black</button>
        <div style = {{color: this.state.color}}>{this.state.textin}</div>
      </div>
    );
  }
}
class ChooseFont extends React.Component{
  constructor(props){
    super(props);
    this.state = {textin: props.text1, font: "default"}
  }

  setFont = (font,event) => {
    this.setState({font: font})
  }

  render(){
    return(
      <div>
        <div>{this.state.textin}</div>
        <button onClick = {(e) => this.setFont("",e)}>default</button>
        <button onClick ={(e) => this.setFont("Curior New",e)}>Curior new</button>
        <button onClick ={(e) => this.setFont("Impact",e)}>Impact</button>
        <div style ={{fontFamily: this.state.font, color: this.props.color}}>{this.state.textin}</div>
      </div>
    );
  }
}

class DemoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {currStep: 0, rawtext: undefined, augmented_text: undefined, color: undefined, forwardButtonEnabled: false};
  }

  enableForwardButton = () => {
    this.setState({forwardButtonEnabled: true});
  }

  changeParentState = (newState) => {
    this.setState(newState);
  }

  render(){
    var element = null
    switch(this.state.currStep){
      case 0:
        element = <LoadText enableForwardButton = {this.enableForwardButton} changeParentState = {this.changeParentState}/>
        break;
      case 1:
        element = <UpperLower text0 = {this.state.rawtext} enableForwardButton = {this.enableForwardButton} changeParentState = {this.changeParentState}/>
        break;
      case 2:
        element = <ChooseColor text1 = {this.state.augmented_text} enableForwardButton = {this.enableForwardButton} changeParentState = {this.changeParentState}/>
        break;
      case 3:
        element = <ChooseFont text1 =  {this.state.augmented_text} color = {this.state.color}></ChooseFont>
        break;
      default:
        alert("Error: step out of range");
        break;
    }
    

    return(
      <div>
        <h1>Demo App v 1.0</h1>
        <CompletionBar step = {this.state.currStep} stepList = {['Load txt', 'Upper/Lower', 'Choose color', 'Choose font']}></CompletionBar>
        {element}
        {this.state.currStep !== 0?<button onClick = {() => this.setState({currStep: this.state.currStep - 1, forwardButtonEnabled: false})}>Last step (loses work){'\u2B05'}</button>: null}
    {this.state.currStep !== 3?<button disabled = {!this.state.forwardButtonEnabled} onClick = {() => this.setState({currStep: this.state.currStep + 1, forwardButtonEnabled: false})}>Next step {'\u27A1'}</button>:null}
      </div>
    );
  }

}



function CompletionBar(props){
  const stepList = props.stepList;
  const elementList = stepList.map((stepName, index) => <CompletionStep myStep = {index} currentStep = {props.step} stepName = {stepName} key ={stepName}/>);
  return(
    <div className = 'step-container'>
      {elementList}
    </div>
  );
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




class LoadCodeText extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: "Copy and paste here", output: ""}
  }

  isInputValid(input){
    const regex = /[^a-zA-Z ]/;
    return(!regex.test(input));
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    if(this.isInputValid(this.state.value)){
      this.setState({output: this.state.value});
      this.props.enableForwardButton();
      this.props.changeParentState({rawtext: this.state.value});
    }
    else{
      alert("Invalid input");
    }
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

class IC_Calculation extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  
  computeIthIC(string, n, i){
    var tallys = this.tallyIthPlace(string,n,i);
    var tally;
    var sum = 0;
    for(tally of tallys){
      sum += tally * (tally - 1);
    }
    return(sum/(n * (n - 1)));
  }

  tallyIthPlace(string, n, i){
    var tally = new Array(26).fill(0);
    while(i < n){
      tally[string.charCodeAt(i) - 65] += 1;
      i += n;
    }
    return(tally);
  }

  render(){
    return(
      <div>
        
      </div>
    );
  }
}

class Standard_IC_Calculation extends React.Component{
  constructor(props){

  }

  render(){
    return(
    <div>
      
    </div>
    );
  }
}



class App extends React.Component {
  constructor(props){
    super(props);
    // This is the state that is needed to jump between steps
    this.state = {currStep: 0, rawtext: undefined, polyAlphKeywordLen: undefined, polyAlphKeyword: undefined, forwardButtonEnabled: false}
  }

  enableForwardButton = () => {
    this.setState({forwardButtonEnabled: true});
  }

  changeParentState = (newState) => {
    this.setState(newState);
  }

  render(){
    var element;
    switch (this.state.currStep){
      case 0:
        element = <LoadCodeText enableForwardButton = {this.enableForwardButton} changeParentState = {this.changeParentState}/>;
        break;
      case 1:
        // Statistic calc & length decision
        break;
      case 2:
        // Aligning alphabets
        break;
      case 3:
        // Final keyword
        break;
      default:
        alert("Error. The step was out of bounds.");
    }
    return(
      <div>
        <h1>Decoder App v 0.1</h1>
        <CompletionBar step = {this.state.currStep} stepList = {["Load text", "Statistics", "Tallies & Alphabets", "Final Keyword"]}></CompletionBar>
        {element}
        {this.state.currStep !== 0?<button onClick = {() => this.setState({currStep: this.state.currStep - 1, forwardButtonEnabled: false})}>Last step (loses work){'\u2B05'}</button>: null}
        {this.state.currStep !== 3?<button disabled = {!this.state.forwardButtonEnabled} onClick = {() => this.setState({currStep: this.state.currStep + 1, forwardButtonEnabled: false})}>Next step {'\u27A1'}</button>:null}
      </div>
    );

  }
}


export default App;
