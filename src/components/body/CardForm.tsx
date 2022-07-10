import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './StyleForm.css'
import 'bootswatch/dist/pulse/bootstrap.min.css';
import { Modal } from './Modal';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  id: number;
  name: string;
  done: boolean;

}
export const CardForm = () => {
  const [newTask, setNewTask] = useState<string>('');
  const [task, setTask] = useState<ITask[]>([]);
  const [currentTask, setCurrentTask] = useState({});
  const [show, setShow] = useState(false);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask, getIndex(task));
    setNewTask('');
  }

  const getIndex = (task: ITask[]) => {
    let id = 0;
    let result = true;
    while (result) {
      if (task.filter(task => task.id === id).length) {
        id++;
      } else {
        result = false;
      }
    }
    return id;
  }

  const handleEdit = (id: number) => {
    const newTask: ITask[] = task.filter(task => task.id === id);
    setCurrentTask(newTask[0]);
    console.log(newTask[0]);
    setShow(true);
  }
  const handleDelete = (id: number) => {
    const newTasks: ITask[] = task.filter(task => task.id !== id);
    setTask(newTasks);
    localStorage.setItem('items', JSON.stringify(newTasks));
  }
  const addTask = (name: string, id: number): void => {
    const newTasks: ITask[] = ([{ id, name, done: false }, ...task]);
    setTask(newTasks);
    localStorage.setItem('items', JSON.stringify(newTasks));
    if (newTask === '' || newTask === undefined || newTask === null || newTask.length === 0) {
      alert('Please enter a task');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('items')) {
      getStorage();
    }
  }, [])

  const getStorage = () => {
    const storage = JSON.parse(localStorage.getItem('items')!);
    localStorage.setItem('items', JSON.stringify(storage));
    setTask(storage);
  }


  return (
    <div className='cardContainer'>
      {
        show ? <Modal task={task} setTask={setTask} show={show} setShow={setShow} currentTask={currentTask} /> : null
      }
      <form className='form-container' onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder='Enter title'
          onChange={e => setNewTask(e.target.value)}
          value={newTask}
          className='input-container'
          autoFocus
        />
        <br />
        <button className='btn btn-primary'>ADD</button>
      </form>
      {
        task.map((t: ITask, id: number) => {
          return (
            <div className='cardBody' key={id} id={t.id.toString()}>
              <button className='btn'><CheckCircleIcon color="secondary" className='btn-checkout' /></button>
              <p style={{ textDecoration: t.done ? 'line-through ' : '' }}>{t.name}</p>
              <button onClick={() => handleEdit(t.id)} className='btn'><EditIcon color="disabled" className='btn-edit' /></button>
              <button onClick={() => handleDelete(t.id)} className='btn'><DeleteIcon color="disabled" className='btn-delete' /></button>
            </div>
          )
        }
        )}
    </div>
  );
}