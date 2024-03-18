import React, { useState, useEffect } from 'react';
import './TaskTracker.css';

const TaskTracker = () => {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        return storedTasks || {
            todo: [],
            inProgress: [],
            done: []
        };
    });
    const [editIndex, setEditIndex] = useState({ column: null, index: null });
    const [editValue, setEditValue] = useState('');

    // Сохранение данных в localStorage при изменении состояния tasks
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (status, task) => {
        setTasks(prevState => ({
            ...prevState,
            [status]: [...prevState[status], task]
        }));
    };

    const moveTask = (sourceStatus, destinationStatus, taskIndex) => {
        const taskToMove = tasks[sourceStatus][taskIndex];
        setTasks(prevState => ({
            ...prevState,
            [sourceStatus]: prevState[sourceStatus].filter((_, index) => index !== taskIndex),
            [destinationStatus]: [...prevState[destinationStatus], taskToMove]
        }));
    };

    const deleteTask = (status, taskIndex) => {
        setTasks(prevState => ({
            ...prevState,
            [status]: prevState[status].filter((_, index) => index !== taskIndex)
        }));
    };

    const startEditing = (column, index, task) => {
        setEditIndex({ column, index });
        setEditValue(task);
    };

    const saveEdit = (status, index) => {
        const updatedTasks = [...tasks[status]];
        updatedTasks[index] = editValue;
        setTasks(prevState => ({
            ...prevState,
            [status]: updatedTasks
        }));
        setEditIndex({ column: null, index: null });
        setEditValue('');
    };

    return (
        <div className="task-tracker">
            <div className="column">
                <h2>Todo</h2>
                {tasks.todo.map((task, index) => (
                    <div key={index} className="task">
                        {editIndex.column === 'todo' && editIndex.index === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={() => saveEdit('todo', index)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{task}</span>
                                <button onClick={() => moveTask('todo', 'inProgress', index)}>Start</button>
                                <button onClick={() => deleteTask('todo', index)}>Delete</button>
                                <button onClick={() => startEditing('todo', index, task)}>Edit</button>
                            </>
                        )}
                    </div>
                ))}
                <input
                    type="text"
                    placeholder="Add new task"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
                            addTask('todo', e.target.value.trim());
                            e.target.value = '';
                        }
                    }}
                />
            </div>
            <div className="column">
                <h2>In Progress</h2>
                {tasks.inProgress.map((task, index) => (
                    <div key={index} className="task">
                        {editIndex.column === 'inProgress' && editIndex.index === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={() => saveEdit('inProgress', index)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{task}</span>
                                <button onClick={() => moveTask('inProgress', 'done', index)}>Complete</button>
                                <button onClick={() => deleteTask('inProgress', index)}>Delete</button>
                                <button onClick={() => startEditing('inProgress', index, task)}>Edit</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="column">
                <h2>Done</h2>
                {tasks.done.map((task, index) => (
                    <div key={index} className="task">
                        {editIndex.column === 'done' && editIndex.index === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={() => saveEdit('done', index)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{task}</span>
                                <button onClick={() => deleteTask('done', index)}>Delete</button>
                                <button onClick={() => startEditing('done', index, task)}>Edit</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskTracker;