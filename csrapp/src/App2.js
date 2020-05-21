import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Navbar, Form, InputGroup, FormControl, Button, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(){
    const [data, setData] = useState([])
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(()=>{
        const abortController = new AbortController()

        fetchData()
        
        return (function cleanup(){
            abortController.abort()
        })
    }
        ,[])

    function fetchData(){
        console.log("fetching")
        axios.get('http://localhost:8080/api')
        .then((res) => {
            const data = res.data
            setData(data)
            console.log("data recieved", data)
        })
        .catch((err) => console.log(err))
    }

    function postData(data){
        console.log("posting")
        
        axios.post('http://localhost:8080/api', data)
        .then((res) => {
            console.log("data posted", data)
        })
        .catch((err) => console.log(err))
        
        setData(prev => prev.concat(data))
    }

    function deleteData(id){
        axios.post(`http://localhost:8080/api/${id}`)
        .then((res) => console.log("Data deleted"))
        .catch((err) => console.log(err))

        setData(data.filter(element => element.newID !== id))

    }
        
    function handleSubmit(e) {
        e.preventDefault()
        if (title && body){
            const data = {
                title: title,
                body: body,
                newID: new Date().getTime()
            }
            
            postData(data)
            setBody("")
            setTitle("")
        }
    }

    const titleStyle = {
        marginLeft: '15%',
        width: '25%'
    }
    const bodyStyle = {
        width: '60%'
    }
    const buttonStyle = {
        marginRight: '15%'
    }

    const listContainer = {
        marginTop: '30px'
    }

    const itemContainer = {
        marginTop: '10px'
    }

    return (
        <div className="App">
            <Navbar className="bg-light justify-content-between">
            <Form inline>
                <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Add new To Do</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon1"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    maxLength = {25}
                />
                <FormControl
                    placeholder="Body"
                    aria-label="Body"
                    aria-describedby="basic-addon1"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    maxLength = {80}
                />
                </InputGroup>
            </Form>
            <Form inline onSubmit={handleSubmit}>
                <Button type="submit">Add</Button>
            </Form>
            </Navbar>
            <ListGroup style={listContainer}>
            {
            data.map(element => 
                <ListGroup horizontal key={element.newID} style = {itemContainer}>
                    <ListGroup.Item style={titleStyle}>{element.title}</ListGroup.Item>
                    <ListGroup.Item style={bodyStyle}>{element.body}</ListGroup.Item>
                    <ListGroup.Item style={buttonStyle}><button onClick={() => deleteData(element.newID)}>Done</button></ListGroup.Item>
                </ListGroup>
          )}
            </ListGroup>

        </div>
      )
}

export default App;
