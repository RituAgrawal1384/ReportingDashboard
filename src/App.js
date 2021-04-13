import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar'
import Home from './components/home';
import Regression from './components/regression';
import Steps from './components/steps';
import Failure from './components/failure';
import Main from './components/main';
import { lbus, apps,phFiles,myFiles } from "./data/dropdown";
// import { stockData } from "./data/jsondata";

// import { Link, Switch, Route} from 'react-router';
import {Route, Switch, Redirect} from 'react-router-dom';


class App extends Component {
 

  //mount phase
  constructor(props){
    super(props);
    console.log("App Constructer");
    this.state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
    selectedOption1: lbus[1],
    selectedOption2: { value: "sales", label: "Sales Portal" },
    latestStepsKpis:[],
    regressionData:[],
    totalPassed:0,
    totalFailed:0,
  };

    this.handleChangeLbu =this.handleChangeLbu.bind(this)
  }

getTotalScenarios1(fileData) {
  let totalSen = 0;
  const totalDuration = fileData.map((data) => {
    totalSen = data.elements.length + totalSen;
     return totalSen;
  });
  console.log(totalDuration);
  return totalSen;
}

 getTotalExecutionTime1(fileData) {
    let exeTime = 0;
    const totalDuration = fileData.map((data) => {
      return data.elements.map((element) => {
        return element.steps.map((step, count) => {
          if (step.result.duration) 
          {
            exeTime = step.result.duration + exeTime;
          }
          return null;
        });
      });
    });
     console.log(totalDuration);
    exeTime = exeTime / 1000000000 / 60 / 60;
    let myNumberWithTwoDecimalPlaces = parseFloat(exeTime).toFixed(2);
    return myNumberWithTwoDecimalPlaces;
  } 

  getTotalPassedScenarios1(fileData) {
  let passedCount = 0;
  const totalDuration = fileData.map((data) => {
    return data.elements.map((element) => {
      let failCount = 0;
       element.steps.map((step, count) => {
        if (step.result.status === "failed" || step.result.status === "skipped")
          failCount = 1;
         return null;  
      });
      if (failCount === 0) passedCount = 1 + passedCount;
       return null;  
    });
    
  });
   console.log(totalDuration);
  return passedCount;
}

 getTotalFailedScenarios1(fileData) {
  let passedCount = 0;
  const totalDuration = fileData.map((data) => {
    return data.elements.map((element) => {
      let failCount = 0;
      element.steps.map((step, count) => {
        if (step.result.status === "failed" || step.result.status === "skipped")
          failCount = 1;
         return null;    
      });
      if (failCount === 1) passedCount = 1 + passedCount;
       return null;  
    });
  });
   console.log(totalDuration);
  return passedCount;
}

//mount phase
  componentDidMount(){
    //AJAX Call for server data
    console.log("App Mounted");
    let latestReportData = this.getRegressionDataBasedOnLBU();
     this.setState({ latestStepsKpis:latestReportData[0].steps, totalPassed:latestReportData[0].passed,totalFailed:latestReportData[0].failed});
  
    }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }


  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    return { oldValue: prevState.value };
  }

  componentDidUpdate(prevProps,prevState,snapshot) {
    // Typical usage (don't forget to compare props):
    if (this.state.selectedOption1 !== prevState.selectedOption1) {
     let latestReportData = this.getRegressionDataBasedOnLBU();
     this.setState({ latestStepsKpis:latestReportData[0].steps, totalPassed:latestReportData[0].passed,totalFailed:latestReportData[0].failed});
  
    }
  }



   getRegressionDataBasedOnLBU(){
    let executionData = [];
    let latestFileData =[];
    let index1=0;
    const lbu = this.state.selectedOption1.label;
    let tempData =null;
    switch(lbu) {
      case 'MY':
          tempData=myFiles
          break;
      case 'PH':
          tempData=phFiles
          break;
      default:;
    }
    // if(lbu === "MY"){
    //   tempData=phFiles;
    // }
    let latestDate =this.getLatestDate(tempData);
     tempData.map((fileData) => {
      let myLib = require('.' + fileData.jsonFilePath);
      let totalSen = this.getTotalScenarios1(myLib);
      let totalExec = this.getTotalExecutionTime1(myLib);
      let totalPassed = this.getTotalPassedScenarios1(myLib);
      let totalFailed = this.getTotalFailedScenarios1(myLib);
      if(latestDate === fileData.date){
        let latestStepsKpis = this.getStepsKpis(myLib);
        latestFileData.push({"steps":latestStepsKpis,"passed":totalPassed,"failed":totalFailed});
        // this.setState({ latestStepsKpis, totalPassed,totalFailed});
       
      }
         
      executionData.push({"id":index1,"date":fileData.date,"lbu":this.state.selectedOption1.label,"environment":fileData.env, "totalScenarios":totalSen,"totalExecTime":totalExec,"totalPassed":totalPassed, "totalFailed":totalFailed, "report":fileData.reportPath});
      index1++;
       return null;  

      });

       this.setState({ regressionData:executionData });
       return latestFileData;
  }

 getLatestDate(data) {
   // convert to timestamp and sort
   var sorted_ms = data.map(function(item) {
      return new Date(item.date).getTime()
   }).sort(); 
   // take latest
   var latest_ms = sorted_ms[sorted_ms.length-1];
   // convert to js date object 
   let formattedDate = new Date(latest_ms).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
   return formattedDate;
  }

  handleChangeLbu = (selectedOption1) => {
    this.setState({ selectedOption1 });
    console.log(`Option selected:`, selectedOption1);
  };

  handleChangeApp = (selectedOption2) => {
    this.setState({ selectedOption2 });
    console.log(`Option selected:`, selectedOption2);
  };

getStepsKpis(fileData) {
  let steps = [];
  let index = 1;
  fileData.map((data) => {
    return data.elements.map((element) => {
      element.steps.map((step, count) => {
        if (step.result.duration){
          let exeTime = step.result.duration / 1000000000;
          // steps.push({"id":index,"name":step.name,"time":parseFloat(exeTime).toFixed(2)});
           const index1 = steps.findIndex((e) => e.name === step.name);

            if (index1 === -1) {
                steps.push({"id":index,"name":step.name,"time":parseFloat(exeTime).toFixed(2)});
                index++;
            } else {
                steps[index1].time = ((parseFloat(steps[index1].time) + parseFloat(exeTime)).toFixed(2))/2;
            }

        } 
         return null;  
      });
      return null;  
    });
  });
  return steps;
}


  handleDelete = (counterId) => {
    console.log("counter Number", counterId);
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    console.log(counter);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  //mount phase
  render() { 
    console.log("App rendered");
    

    return ( 
      <React.Fragment>
      <NavBar totalCounters={this.state.counters.filter(c=> c.value >0).length}/>
     
      <main className="container">
        {<Main
          onLbuChange={this.handleChangeLbu}
          onAppChange={this.handleChangeApp}
          selectedOption1={this.state.selectedOption1}
          selectedOption2={this.state.selectedOption2}
          lbuOptions={lbus}
          appOptions={apps}
        />}
        <br/>
        {/* <Counters
          counters ={this.state.counters}
          onReset={this.handleReset}
          onIncrement={this.handleIncrement}
          onDelete={this.handleDelete}
        /> */}
      </main>
       <Switch>
        <Route exact path="/Home" render={(props) => (
              <Home {...props} isAuthed={true} totalPassedSenario={this.state.totalPassed} totalFailedSenario={this.state.totalFailed}/>
            )} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        {/* <Route exact path="/Regression" render={(props) => (
              <Regression {...props} isAuthed={true} lbu={this.state.selectedOption1} totalSenario={this.getTotalScenarios()} totalExeTime={this.getTotalExecutionTime()} totalPassedSenario={this.getTotalPassedScenarios()} totalFailedSenario={this.getTotalFailedScenarios()}/>
            )} /> */}

        <Route exact path="/Regression" render={(props) => (
            <Regression {...props} isAuthed={true} regressionData1={this.state.regressionData}/>
          )} />
         <Route exact path="/Steps" render={(props) => (
              <Steps {...props} isAuthed={true} stepsData={this.state.latestStepsKpis}/>
            )} />
          <Route exact path="/Failure" component={Failure} />
     </Switch>
      </React.Fragment>
     );
  }
}

export default App;
