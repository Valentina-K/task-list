import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from './components/List';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from "./store/tasksSlice";
import {getTasks, getNotDoneTasks} from "./store/selectors";

function Main(){
    const dispatch = useDispatch();
    const date = new Date();
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.getHours().toString()+':'+date.getMinutes().toString();
    const tasks = useSelector(getTasks);
    const [tasksTitle, setTasksTitle] = useState('');    
    const notDone = useSelector(getNotDoneTasks);

    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks])

    const handleAddTask = (e) => {      
        if (e.key === 'Enter' && e.target.value !== ''){
            const newTask = 
            {
                id: uuidv4(),
                title: tasksTitle.concat(' '+month + ' ' + day + ', ' + year+ ': '+time),
                status: false
            }
            dispatch(addTask(newTask));            
            setTasksTitle('');
        }
    }    

    return (
        <div className='container'>
            <h1>Note your tasks</h1>
            <span>{month + ' ' + day + ', ' + year}</span>
            <div className='input-filed'>
                <input type='text' 
                value={tasksTitle}
                onChange={event => setTasksTitle(event.target.value)}
                onKeyDown={handleAddTask}
                />
                <label>Task name</label>
            </div>
            <span className="orange-text text-accent-4">Not done tasks - {notDone}</span>
            <List />
        </div>
    );
}

export default Main;