import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleStatus, updateTask } from '../store/tasksSlice';

export default function Item({task}){
    const dispatch = useDispatch();
    const handleDelete = () => dispatch(deleteTask(task.id));
    const handleToggle = () => dispatch(toggleStatus(task.id));
    const handleUpdate = () => dispatch(updateTask(task))

    const [updatedTitle, setUpdatedTitle] = useState(task.title);
    const [visible, setVisible] = useState(true);
    const [update, setUpdate] = useState(false);
    const classes = ['todo'];

    if (task.status) {
        classes.push('status');
    }
        
    const handleUpdateTask = (e) => {                
        if (e.key === 'Enter' && e.target.value !== ''){
            const updTask = {...task, title:updatedTitle};
            handleUpdate(updTask);
            setUpdate(false);
        }        
    }

    const updateElement = () => {
        setUpdate(true);
    }

    const removeElement = () => {
        setVisible(prev => !prev);
        handleDelete();
    }
    return (
        <>
            {visible && (
                <li className={classes.join(' ')}>
                    <div className='label'>
                        <label>                        
                            <input type="checkbox"
                            checked={task.status}
                            onChange={handleToggle} />
                            <span>{updatedTitle}</span>                                              
                        </label>
                        <div>
                            <i className='material-icons blue-grey-text' onClick={updateElement}>edit</i>
                            <i className="material-icons orange-text text-accent-4" 
                                onClick={removeElement}
                                >
                                delete
                            </i>
                        </div>  
                    </div>
                    {update && (
                        <div>
                        <input type='text' 
                            value={updatedTitle}
                            onChange={event => setUpdatedTitle(event.target.value)}
                            onKeyDown={handleUpdateTask}
                            />
                        <label>Update task name</label>
                    </div>
                    )}
                </li>
            )}
        </>
    )
}

