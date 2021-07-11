

//Uplifting the state object (for sibling communication), InputContainer uses both the state varaibles i.e. tasks and currTask;
//currTask to display the value of input and capture task.txt
//tasks array to append new task to it. 
//Whereas TaskContainer uses only tasks array to delete tasks
//as changes to CurrentTask only affects InputContainer we can make one more change i.e. to put the state--> currTask in 
//inputcontainer class so that whenever the state of currTask changes both tasklist as well as InputContainer don't get re-rendered;


import React, { Component } from 'react'

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks:[{id:1, txt:"Task 1"},{id:2, txt:"Task 2"},{id:3, txt:"Task 3"}]
        }
    }
    // handleChange=(e)=>{
    //     let val=e.target.value;
    //     //console.log(val)
    //     this.setState({currTask:val});
    // }
    onSubmit=(arg)=>{
        //note that onSubmit will take an argument now as currTask is not the state on Todo class but now a state of Input class

        //this.state.tasks.push({id:this.state.tasks.length+1, txt:this.state.currTask})
        //we have to create new array or object (remember objects are made in heap) and set the changed state address to present state obj address 
        //so that  react can recognize a change in the state of object as there is a change in address
        if(arg!==""){
            let newArray=[...this.state.tasks, {id:this.state.tasks.length + 1, txt: arg}];
            this.setState({tasks:newArray});
        }
    }
    onDelete=(id)=>{
        // console.log(this);
        console.log(id);
        // this.setState({currTask:"fa"});
        let count=0;
        let filteredArr=this.state.tasks.filter((task)=>task.id!==id);
        let newArr=filteredArr.map((obj)=>{
            count++;
            obj.id=count;
            return obj;
        })
        this.setState({tasks:newArr})
    }

    //step 1 create static page with 3 tasks
    render() {
        return (
            <>
                <InputContainer taskAdder={this.onSubmit}/>
                <TaskList tasks={this.state.tasks} delTask={this.onDelete}/>
            </>
            
        )
    }
}

// NOW WE CAN MAKE THE COMPONENTS INPUTCONTAINER AND TASKSLIST AS FUNCTIONAL COMPONENT AS WE USE PROPS AND NO STATE 
//IS STORED HERE
//we can get rid of "this"

//NOTE THE USE OF InputContainer both as class that holds state and also one that passes parameter to parent class

class InputContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            currTask:''
        }
    }
    handleChange=(e)=>this.setState({currTask:e.target.value})

    render() {
        return (
            <div className="input-container">
                <input type="text" value={this.state.currTask} onChange={this.handleChange}></input>
                <button onClick={()=>{this.props.taskAdder(this.state.currTask)
                this.setState({currTask:""})}}>Add</button>
            </div>
        )
    }
}

class TaskList extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="class-list">
                <ul>
                    {
                        this.props.tasks.map(task=>(   
                            <li>
                                <h1>{task.txt}</h1>
                                <button onClick={()=>this.props.delTask(task.id)}>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}




