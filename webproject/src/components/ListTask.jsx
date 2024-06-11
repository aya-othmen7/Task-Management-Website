import axios from "axios";
import { useEffect, useState } from "react";

export default function ListTask() {

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getTasks();
    }, []);

    function getTasks() {
        axios.get('http://localhost/webproject/api/tasks/').then(function(response) {
            console.log(response.data);
            setTasks(response.data);
        });
    }

    return (
        <div>
            <h2>Task List</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, key) =>
                        <tr key={key}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.time}</td>
                            <td>{task.date}</td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}
