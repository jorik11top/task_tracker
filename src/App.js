import React from 'react';
import TaskTracker from './components/TaskTracker';
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Task Tracker App</h1>
            </header>
            <TaskTracker /> {/* Вставляем компонент TaskTracker */}
        </div>
    );
}

export default App;
