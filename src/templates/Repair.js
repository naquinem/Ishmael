
import React, { useRef, useState } from 'react';
import data from '../jsonfiles/rohdata.json';

function Repair() {

    const [lists, setList] = useState(data)
    const [updateState, setUpdateState] = useState(-1)
    return(
        <div className='crud'>
            <div>
            <AddList setList = {setList }/>
            <form onSubmit={handleSubmit}>
            <table>
                <thead>
                    <tr>
                        <th>Quarter</th>
                        <th>Week</th>
                        <th>Total Repair Output</th>
                        <th>Total Headcount</th>
                        <th>Repair Output per Head Goal</th>
                        <th>Actual Repair Output per Head</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        lists.map((current) => (
                            updateState === current.id ? <EditList current={current} lists={lists} setList={setList}/> :                        
                            <tr>
                                <td>{current.quarter}</td>
                                <td>{current.workWeek}</td>
                                <td>{current.totalOutput}</td>
                                <td>{current.totalHeadcount}</td>
                                <td>{current.goal}</td>
                                <td>{current.totalOutput/current.totalHeadcount}</td>
                                <td>
                                    <button className='edit' onClick={() => handleEdit(current.id)}>Edit</button>
                                    <button className='delete' type='button' onClick={() => handleDelete(current.id)}>Delete</button>
                                </td>
                            </tr>
                            
                        ))
                    }
                </tbody>
                
            </table>
            </form>
            </div>
        </div>
    )

    function handleEdit(id) {
        setUpdateState(id)
    }
    function handleDelete(id) {
        const newlist = lists.filter((li) => li.id !== id)
        setList(newlist)
    }
    function handleSubmit(event) {
        event.preventDefault()
        const quarter = event.target.elements.quarter.value
        const workWeek = event.target.elements.workWeek.value
        const totalOutput = event.target.elements.totalOutput.value
        const totalHeadcount = event.target.elements.totalHeadcount.value
        const goal = event.target.elements.goal.value
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, quarter: quarter, workWeek: workWeek, totalOutput: totalOutput, totalHeadcount: totalHeadcount, goal: goal} : li
        ))

        setList(newlist)
        setUpdateState(-1)
    }
}

function EditList({current, lists, setList}) {
    function handInputquarter(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, quarter :value} : li
        ))

        setList(newlist)
    }
    function handInputworkWeek(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, workWeek :value} : li
        ))

        setList(newlist)
        
    }
    function handInputtotalOutput(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, totalOutput :value} : li
        ))

        setList(newlist)
        
    }
    function handInputtotalHeadcount(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, totalHeadcount :value} : li
        ))

        setList(newlist)
        
    }
    function handInputgoal(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, goal :value} : li
        ))

        setList(newlist)
        
    }
    return(
        <tr className='increment'>
            <td><input type="text" onChange={handInputquarter} name='quarter' value={current.quarter}/></td>
            <td><input type="text" onChange={handInputworkWeek} name='workWeek' value={current.workWeek}/></td>
            <td><input type="text" onChange={handInputtotalOutput} name='totalOutput' value={current.totalOutput}/></td>
            <td><input type="text" onChange={handInputtotalHeadcount} name='totalHeadcount' value={current.totalHeadcount}/></td>
            <td><input type="text" onChange={handInputgoal} name='goal' value={current.goal}/></td>
            <td><button type='submit'>Add Data</button></td>
        </tr>
    )
}

function AddList({setList}) {
    const quarterRef = useRef()
    const workWeekRef = useRef()
    const totalOutputRef = useRef()
    const totalHeadcountRef = useRef()
    const goalRef = useRef()

    function handleSubmit(event) {
        event.preventDefault();
        const quarters = event.target.elements.quarter.value;
        const workWeek = event.target.elements.workWeek.value;
        const totalOutput = event.target.elements.totalOutput.value;
        const totalHeadcount = event.target.elements.totalHeadcount.value;
        const goal = event.target.elements.goal.value;
        const newlist = {
            id: 6,
            quarters,
            workWeek,
            totalOutput,
            totalHeadcount,
            goal
        }
        setList((prevList)=> {
            return prevList.concat(newlist)
        })
        quarterRef.current.value = ""
        workWeekRef.current.value = ""
        totalOutputRef.current.value = ""
        totalHeadcountRef.current.value = ""
        goalRef.current.value = ""
    }
    return(
        <form className='addForm' onSubmit={handleSubmit}>
            <input type="text" name="quarter" placeholder="Enter work week" ref={quarterRef}/>
            <input type="text" name="workWeek" placeholder="Enter work week" ref={workWeekRef}/>
            <input type="text" name="totalOutput" placeholder="Enter output" ref={totalOutputRef}/>
            <input type="text" name="totalHeadcount" placeholder="Enter headcount" ref={totalHeadcountRef}/>
            <input type="text" name="goal" placeholder="Enter goal" ref={goalRef}/>
            <button type="submit">Add</button>
        </form>
    )
}

export default Repair
