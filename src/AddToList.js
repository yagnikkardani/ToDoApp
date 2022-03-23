import { Button, Container, Stack } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import axios from "axios";
import styles from "./components.module.css";

const baseURL = "http://localhost:8000/apitodos/";

function AddToList() {
  const [name, setName] = useState();
  const [toDoItems, setToDoItems] = useState([
    { id: "", todoitem: "", completed: false },
  ]);
  const [todolength, setToDoLength] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const getAnswer = async () => {
    const { data } = await axios(baseURL);
    setToDoItems(data.map((i) => i));
  };

  useEffect(() => {
    getAnswer();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseURL, { todoitem: name, completed: false })
      .then((response) => {
        setToDoItems([...toDoItems, response.data]);
      });
  };

  const deleteTask = (i) => {
    axios
      .put(`${baseURL}${i.id}/`, { todoitem: i.todoitem, completed: true })
      .then(() => {
        setIsDeleted(true);
      });
  };

  useEffect(() => {
    if (isDeleted) {
        getAnswer()
        setIsDeleted(false)
    }
  }, [isDeleted]);
  useEffect(() => {
    toDoItems.length > 0 && setToDoLength(true);
  }, [toDoItems]);

  return (
    <Container>
      <Form onSubmit={handleSubmit} style={{ marginTop: 50 }}>
        <Form.Group className="mb-3">
          <Form.Label>Add Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="Submit">
          Submit
        </Button>
      </Form>

      <ListGroup style={{ marginTop: 10 }}>
        {todolength && (
          <ListGroup.displayName>Tasks List</ListGroup.displayName>
        )}

        {toDoItems
          .filter((e) => e.completed === false)
          .map((i) => (
            <Stack direction="horizontal" gap={3}>
              <ListGroup.Item className="mb"> {i.todoitem} </ListGroup.Item>
              <div className="vr" />
              <Button variant="outline-danger" onClick={() => deleteTask(i)}>
                X
              </Button>
            </Stack>
          ))}
      </ListGroup>
    </Container>
  );
}

export default AddToList;
