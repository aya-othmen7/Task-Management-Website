import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
    const navigate = useNavigate();

    const [task, setTask] = useState({
        name: "",
        time: "",
        date: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTask(prevTask => ({...prevTask, [name]: value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost/webproject/api/task/create', task)
            .then(function(response){
                console.log(response.data);
                navigate('/');
            })
            .catch(function(error) {
                console.error("Error creating task: ", error);
            });
    };

    return (
        <div>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Time: </label>
                            </th>
                            <td> 
                                <input type="time" name="time" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Date: </label>
                            </th>
                            <td>
                                <input type="date" name="date" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="right">
                                <button className="B">Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
