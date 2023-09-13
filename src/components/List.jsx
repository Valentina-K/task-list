import Item from './Item';
import {useSelector} from "react-redux";
import { getTasks } from '../store/selectors';

export default function List(){
    const tasks = useSelector(getTasks);

    return (
        <ul>
            {tasks.map(task => <Item key={task.id} task={task} />)}
        </ul>
    )
}

