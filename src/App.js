import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar'
import Home from './components/home';
import Regression from './components/regression';
import Steps from './components/steps';
import Failure from './components/failure';
import DetailedReport from './components/detailedReport';
import Main from './components/main';
import { lbus, apps,platform,pulse,salesPortal,hrPortal,pulseops } from "./data/dropdown";
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
    selectedOption3:{ value: "Android", label: "Android" },
    latestStepsKpis:[],
    regressionData:[],
    totalPassed:0,
    totalFailed:0,
    status:"",
    latestDate:null,
    failureData:[],
    reportData:[],
    reportDate:[],
    isAppAccessible: false,
    appAccessName:["Pulse For Ops","Pulse"],
     
  };

    this.handleChangeLbu =this.handleChangeLbu.bind(this)
    this.handleChangeApp =this.handleChangeApp.bind(this)
    this.handlePlatformApp =this.handlePlatformApp.bind(this)
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
    const app = this.state.selectedOption2.label;
    this.state.appAccessName.includes(app)?this.setState({isAppAccessible:true}):this.setState({isAppAccessible:false});

    this.getFailuresOnLBU();
    this.getDetailedReport();
    let latestReportData = this.getRegressionDataBasedOnLBU();
     this.setState({ latestStepsKpis:latestReportData[0].steps, totalPassed:latestReportData[0].passed,totalFailed:latestReportData[0].failed, latestDate:latestReportData[0].date});
  
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
    if ((this.state.selectedOption1 !== prevState.selectedOption1) || (this.state.selectedOption2 !== prevState.selectedOption2) || (this.state.selectedOption3 !== prevState.selectedOption3)) {
      this.getFailuresOnLBU();
      this.getDetailedReport();
     let latestReportData = this.getRegressionDataBasedOnLBU();
     if(latestReportData.length > 0){
     this.setState({ latestStepsKpis:latestReportData[0].steps, totalPassed:latestReportData[0].passed,totalFailed:latestReportData[0].failed,latestDate:latestReportData[0].date});
     }
  
    }
  }

  getRunDataForApp(app,lbu,platform){
    let tempData =null;
    switch(app) {
      case 'sales':
          tempData=salesPortal
          tempData = tempData.filter((fData) => {
                if (
                  fData.lbu.toLowerCase().includes(lbu.toLowerCase())
                ) {
                  return fData;
                }
                return null;
              });
          break;
      case 'hr':
          tempData=hrPortal
          tempData = tempData.filter((fData) => {
                if (
                  fData.lbu.toLowerCase().includes(lbu.toLowerCase())
                ) {
                  return fData;
                }
                return null;
              });
          break;
        case 'pulse':
          tempData=pulse
          tempData = tempData.filter((fData) => {
                if (
                  fData.lbu.toLowerCase().includes(lbu.toLowerCase()) && fData.platform.toLowerCase().includes(platform.toLowerCase()) 
                ) {
                  return fData;
                }
                return null;
              });
          break;
        case 'pulsevn':
          tempData=pulseops
          tempData = tempData.filter((fData) => {
                if (
                  fData.lbu.toLowerCase().includes(lbu.toLowerCase()) && fData.platform.toLowerCase().includes(platform.toLowerCase()) 
                ) {
                  return fData;
                }
                return null;
              });
          break;
      default:;
    }
    return tempData;
  }

   getRegressionDataBasedOnLBU(){
    let executionData = [];
    let latestFileData =[];
    let index1=0;
    let status= "passed";
    const lbu = this.state.selectedOption1.value;
    const app = this.state.selectedOption2.value;
    const platform = this.state.selectedOption3.value;
    let tempData =this.getRunDataForApp(app,lbu,platform);
    if(tempData !== null){
      let latestDate =this.getLatestDate(tempData);
      tempData.map((fileData) => {
        let myLib = require('.' + fileData.jsonFilePath);
        let totalSen = this.getTotalScenarios1(myLib);
        let totalExec = this.getTotalExecutionTime1(myLib);
        let totalPassed = this.getTotalPassedScenarios1(myLib);
        let totalFailed = this.getTotalFailedScenarios1(myLib);
        if(latestDate === fileData.date){
          let latestStepsKpis = this.getStepsKpis(myLib);
          latestFileData.push({"steps":latestStepsKpis,"passed":totalPassed,"failed":totalFailed,"date":latestDate});
          // this.setState({ latestStepsKpis, totalPassed,totalFailed});
        
        }

        if(totalFailed !==0){
            status="failed";
        }else{
          status="passed";
        }
          
        executionData.push({"id":index1,"date":fileData.date,"lbu":this.state.selectedOption1.label,"build":fileData.build,"environment":fileData.env, "totalScenarios":totalSen,"totalExecTime":totalExec,"totalPassed":totalPassed, "totalFailed":totalFailed, "report":fileData.reportPath,"status":status});
        index1++;
        return null;  

        });
    }

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

  getFailureDetails(fileData) {
    // let featureData = [];
    let scenariosData = [];
   fileData.map((feature) => {
      feature.elements.map((scenario) => {
         let stepData = [];
         let errorMessage ="";
        scenario.steps.map((step) => {
          if (step.result.status === "failed"){
              errorMessage=step.result.error_message;
               stepData.push({"label": "Step: " + step.name,"icon": "fa fa-folder","children":[{"label":"Error: " + errorMessage,"icon": "fa fa-folder"}]});

          }
         
          return null;    
        });
       
        let myString = errorMessage.split(':')[0];
        console.log(myString)
        if(myString !== ""){
          const index1 = scenariosData.findIndex((e) => e.label === myString);
            if (index1 === -1) {
              scenariosData.push({"label":myString,"icon": "fa fa-folder","children":[]});

              // scenariosData.push({"errorname":myString,"features":{"featurename":feature.name,"scenarios":{"scenarioname":scenario.name,"steps":stepData}}});
              const index2 = scenariosData.findIndex((e) => e.label === myString);
              scenariosData[index2].children[0]={"label":"Scenario: " + scenario.name+"["+feature.uri+"]","icon": "fa fa-folder","children":stepData};

            } else {
              scenariosData[index1].children[Object.keys(scenariosData[index1].children).length]={"label":"Scenario: " + scenario.name+"["+feature.uri+"]","icon": "fa fa-folder","children":stepData};
              // scenariosData[index1].features.push({"featurename":feature.name,"scenarios":{"scenarioname":scenario.name,"steps":stepData}});
            }
       }
        return null;  
      });
        // featureData.push({"name":feature.name,"scenarios":scenariosData});
         return null;  
    });
  return scenariosData;
}

  getFailuresOnLBU(){
    let executionData = [];
    let index1=0;
    const lbu = this.state.selectedOption1.value;
    const app = this.state.selectedOption2.value;
    const platform = this.state.selectedOption3.value;
    let tempData =this.getRunDataForApp(app,lbu,platform);
  
    if(tempData !== null){
     tempData.map((fileData) => {
      let myLib = require('.' + fileData.jsonFilePath);
      let featureData = this.getFailureDetails(myLib);
      executionData.push({"id":index1,"label":fileData.date + "["+fileData.env+"]","icon": "fa fa-folder","children":featureData});
      index1++;
       return null;  

      });
    }
       this.setState({ failureData:executionData });
       return executionData;
  }

  getDetailedReport(){
    let reportData = [];
    let reportDate=[];
    let index1=0;
    const lbu = this.state.selectedOption1.value;
    const app = this.state.selectedOption2.value;
    const platform = this.state.selectedOption3.value;
    let tempData =this.getRunDataForApp(app,lbu,platform);
  
    if(tempData !== null){
     tempData.map((fileData) => {
      let myLib = require('.' + fileData.jsonFilePath);
      let featureData = this.getReportFeatureData(myLib);
      reportData.push({"id":index1,"label":fileData.date + "["+fileData.env+"]","icon": "fa fa-folder","children":featureData});
      reportDate.push({ value: fileData.date + "["+fileData.env+"]", label: fileData.date + "["+fileData.env+"]" });
      index1++;
       return null;  

      });
    }
       this.setState({ reportData:reportData,
        reportDate:reportDate
       });
       return reportData;
  }

  getReportFeatureData(fileData) {
    let featureData = [];
    let index=0;
   fileData.map((feature) => {
      let exeTime = 0;
      let status="Passed";
      let totalScenariosCount=0;
      let totalScenariosFailedCount=0;
      let totalScenariosPassedCount=0;
      let stepCount=0;
      let totalStepsFailedCount=0;
      let totalStepsPassedCount=0;
      let totalStepsSkipCount=0;
      feature.elements.map((scenario) => {
        let scenarioStatus= "Passed";
        scenario.steps.map((step) => {
          if (step.result.status === "failed"){
             status="Failed";
             scenarioStatus="Failed";
             totalStepsFailedCount++;
          }else if (step.result.status === "skipped"){
             totalStepsSkipCount++;
          }else if (step.result.status === "passed"){
             totalStepsPassedCount++;
          }
          if (step.result.duration) 
          {
            exeTime = step.result.duration + exeTime;
          }
          stepCount++;
          return null;    
        });
        totalScenariosCount++;
        if(scenarioStatus==="Passed"){
            totalScenariosPassedCount++;
        }else if(scenarioStatus==="Failed"){
            totalScenariosFailedCount++;
        }
        // stepData.push({"totalsteps":stepCount,"passedcount":totalStepsPassedCount,"failedcount":totalStepsFailedCount,"skippedcount":totalStepsSkipCount});

        // scenariosData.push({"totalScenarios":totalScenariosCount,"passedcount":totalScenariosPassedCount,"failedcount":totalScenariosFailedCount,"totalSteps": stepData.totalsteps,"stepPassed":stepData.passedcount,"stepFailed":stepData.failedcount,"skippedcount":stepData.skippedcount});
        return null;  
      });
       exeTime = exeTime / 1000000000 / 60 / 60;
      let myNumberWithTwoDecimalPlaces = parseFloat(exeTime).toFixed(2);
      let tagName=" ";
      if(typeof feature.tags !== "undefined"){
         feature.tags.map((tag) => {
            tagName =tagName + tag.name;
            return null;
         });
         
      }
        featureData.push({"id":index,"name":feature.uri,"tag":tagName,"status":status,"exectime":myNumberWithTwoDecimalPlaces,"totalscenarios":totalScenariosCount,"scPassed":totalScenariosPassedCount, "scFailed":totalScenariosFailedCount,"totalsteps":stepCount,"stepPassed":totalStepsPassedCount, "stepFailed":totalStepsFailedCount,"stepSkipped":totalStepsSkipCount});
         index++;
        return null;  
    });
  return featureData;
}

  handleChangeLbu = (selectedOption1) => {
    this.setState({ selectedOption1,
      latestStepsKpis:[],
       totalPassed:0,
       totalFailed:0,
     });
  };

  handleChangeApp = (selectedOption2) => {
    this.setState({ selectedOption2,
      latestStepsKpis:[],
       totalPassed:0,
       totalFailed:0,
    });
    const app = selectedOption2.label;
    this.state.appAccessName.includes(app)?this.setState({isAppAccessible:true}):this.setState({isAppAccessible:false});
  };

   handlePlatformApp = (selectedOption3) => {
    this.setState({ selectedOption3 ,
      latestStepsKpis:[],
       totalPassed:0,
       totalFailed:0,
    });
    console.log(`Option selected:`, selectedOption3);
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
          onPlatformChange={this.handlePlatformApp}
          selectedOption1={this.state.selectedOption1}
          selectedOption2={this.state.selectedOption2}
          selectedOption3={this.state.selectedOption3}
          lbuOptions={lbus}
          appOptions={apps}
          platforms={platform}
          isAppAccessible={this.state.isAppAccessible}
          appAccessName={this.state.appAccessName}
        />}
        <br/>
        {/* <Counters
          counters ={this.state.counters}
          onReset={this.handleReset}
          onIncrement={this.handleIncrement}
          onDelete={this.handleDelete}
        /> */}
      </main>
      {this.state.isAppAccessible ? (
       <Switch>
        <Route exact path="/Home" render={(props) => (
              <Home {...props} isAuthed={true} totalPassedSenario={this.state.totalPassed} totalFailedSenario={this.state.totalFailed} latestDate={this.state.latestDate} regressionData1={this.state.regressionData}/>
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
          <Route exact path="/Failure" render={(props) => (
            <Failure {...props} isAuthed={true} failureData={this.state.failureData}/>
          )} />
           <Route exact path="/Detailed" render={(props) => (
            <DetailedReport {...props} isAuthed={true} reportData={this.state.reportData} reportDate={this.state.reportDate}/>
          )} />
     </Switch>
      ):(<div className="app-access">You do not have access to this Application.</div>)}
      </React.Fragment>
     );
  }
}

export default App;
