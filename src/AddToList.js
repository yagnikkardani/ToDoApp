import React, { useEffect, useState } from 'react';
import styles from './components.module.css'

function AddToList() {
    const [name, setName] = useState("");
    const [toDoItems, setToDoItems] = useState([]);
    const [todolength, setToDoLength] = useState(false);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setToDoItems([...toDoItems, name]);
    } 
    
    useEffect(() => {
        toDoItems.length > 0 && setToDoLength(true);
    }, [toDoItems]);

    return(
        <>
        <div className={styles.inputStyle}>
            <form onSubmit={handleSubmit}>
                <label>Add Task:
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <input type="submit"/>
            </form>
            
            {todolength && <p>ToDo List: </p>}
            
            {toDoItems.map((i) => <p>{i}</p>)}
        </div>
        
        </>
    )
}

export default AddToList;