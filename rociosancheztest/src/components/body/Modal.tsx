import { useState } from 'react'
type Props = {
  task: any[],
  setTask: any,
  show: boolean,
  setShow: any,
  currentTask: any,
}

interface ITask {
  id: number;
  name: string;
  done: boolean;

}
export const Modal = ({ task, setTask, show, setShow, currentTask }: Props) => {
  const [newTask, setNewTask] = useState<ITask[]>([]);
  const handleAdd = () => {

    if (!(newTask[0].name === '' || newTask[0].name === undefined || newTask[0].name === null || newTask[0].name.length === 0)) {
      console.log(currentTask.name);
      const newNewTask: ITask[] = task.filter(task => task.id !== currentTask.id);
      newNewTask.unshift(newTask[0]);
      setTask(newNewTask);
      console.log(newNewTask);
      localStorage.setItem('items', JSON.stringify(newNewTask));
      setShow(false);
    }

  }

  const handleCancel = () => {
    setShow(false);
  }

  const handleOnChange = (value: string) => {
    setNewTask([{ ...currentTask, name: value }]);
    console.log(newTask);
  }
  return (
    <div className='modal-container'>
      <form>
        <input onChange={e => handleOnChange(e.target.value)} defaultValue={currentTask.name} type="text" placeholder='Enter title' />
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}
