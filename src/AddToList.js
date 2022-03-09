import { Button, Container, Stack} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Form, ListGroup} from 'react-bootstrap';
import styles from './components.module.css'

function AddToList() {
    const [name, setName] = useState();
    const [toDoItems, setToDoItems] = useState([]);
    const [todolength, setToDoLength] = useState(false);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setToDoItems([...toDoItems, name]);
    } 
    
    const deleteTask = (i) => {
        console.log(toDoItems[i])
        setToDoItems(toDoItems.filter((element, index) => index !== i))
    }

    useEffect(() => {
        toDoItems.length > 0 && setToDoLength(true);
    }, [toDoItems]);

    return(
        <Container>
        <Form onSubmit={handleSubmit} style={{marginTop: 50}}>
            <Form.Group className="mb-3">
                <Form.Label>Add Task</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter Task' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Button variant='primary' type='Submit'>Submit</Button>
        </Form>
        <ListGroup style={{marginTop: 10}}>
            {todolength && <ListGroup.displayName>Tasks List</ListGroup.displayName>}
            
                {toDoItems.map((i, index) => 
                    <Stack direction="horizontal" gap={3}> 
                        <ListGroup.Item className="mb">{i}</ListGroup.Item> 
                        <div className="vr" />
                        <Button variant="outline-danger" onClick={() => deleteTask(index)}>X</Button>
                    </Stack>)}
                
        </ListGroup>
        </Container>
    )
}

export default AddToList;