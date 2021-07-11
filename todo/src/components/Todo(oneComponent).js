import React, { Component } from 'react'

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks:[{id:1, txt:"Task 1"},{id:2, txt:"Task 2"},{id:3, txt:"Task 3"}],
            currTask:""
        }
    }
    handleChange=(e)=>{
        let val=e.target.value;
        //console.log(val)
        this.setState({currTask:val});
    }
    onSubmit=()=>{
        //this.state.tasks.push({id:this.state.tasks.length+1, txt:this.state.currTask})
        //we have to create new array or object (remember objects are made in heap) and set the changed state address to present state obj address 
        //so that  react can recognize a change in the state of object as there is a change in address
        if(this.state.currTask!=""){
            let newArray=[...this.state.tasks, {id:this.state.tasks.length + 1, txt: this.state.currTask}];
            this.setState({tasks:newArray, currTask:""});
        }
    }
    onDelete=(id)=>{
        console.log(this);
        console.log(id);
        // this.setState({currTask:"fa"});
        let filteredArr=this.state.tasks.filter((task)=>task.id!=id);
        this.setState({tasks:filteredArr})
    }

    //step 1 create static page with 3 tasks
    render() {
        return (
            <div>
                <div className="input-container">
                <input type="text" value={this.state.currTask} onChange={this.handleChange}></input>
                <button onClick={this.onSubmit}>Add</button>
            </div>
            <div className="class-list">
                <ul>
                    {
                        this.state.tasks.map(task=>(   
                            <li>
                                <h1>{task.txt}</h1>
                                <button onClick={()=>this.onDelete(task.id)}>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            </div>
            
        )
    }
}
