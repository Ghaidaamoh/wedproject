import React, { useEffect, useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import './todo.scss'
import { LoginContext } from "../../context/auth";
import Headers from '../header/header';
import List from '../list/list';
import Form from '../form/form';
import Auth from '../auth/auth';
import superagent from "superagent";


const additem = 'https://wedproject-backend.herokuapp.com';

const ToDo = () => {

    const [list, setList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const context = useContext(LoginContext);
    const [counter, setCounter] = useState(0)

    async function addItem(item) {
        let data = {
            toDoItem: item.text,
            assignedTo: item.assignee,
            difficulty: item.difficulty,
            toDoid: uuid(),
            complete: false
        }
        try {
            const res = await superagent.post(`${additem}/api/v2/toDo`)
                .send(data)
                .set('Authorization', 'Bearer ' + context.token)
            setCounter(counter + 1)
        } catch (error) {
            alert('Invalid data');
        }

    }

    useEffect(async () => {
        try {
            const res = await superagent.get(`${additem}/api/v2/toDo`)
                .set('Authorization', 'Bearer ' + context.token)
            setList(res.body)
            console.log(res);
        } catch (error) {
            alert('Invalid Render');
        }

    }, [counter]);

    async function deleteItem(id) {
        try {
            const res = await superagent.delete(`${additem}/api/v2/toDo/${id}`)
                .set('Authorization', 'Bearer ' + context.token)
            const items = list.filter(item => item.id !== id);
            setList(items);
            console.log("items>>>>", items);
            console.log("delete", res);
            setCounter(counter + 1)

        } catch (error) {
            alert('Invalid delete');
        }

    }

    async function toggleComplete(id) {

        const items = list.map(item => {
            if (item.id == id) {
                item.complete = !item.complete;
            }
            return item;
        });
        let obj = {
            complete: items[0].complete
        }
        const res = await superagent.put(`${additem}/api/v2/toDo/${id}`)
            .send(obj)
            .set('Authorization', 'Bearer ' + context.token)
        setCounter(counter + 1)

        console.log(res.body);
    }

    useEffect(() => {
        let incompleteCount = list.filter(item => !item.complete).length;
        setIncomplete(incompleteCount);
        document.title = `To Do List: ${incomplete}`;
    }, [list]);

    return (
        <>
            <Headers />
            <Auth capability="read">
                <div className="todo">
                    <h1 className="title">To Do List Manager ({incomplete} )</h1>
                    <Form addItem={addItem} />
                    <List list={list} toggleComplete={toggleComplete} deletefun={deleteItem} />
                </div>
            </Auth>
        </>
    );
};

export default ToDo;