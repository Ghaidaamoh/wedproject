import React, { useState, useContext, useEffect } from 'react'
import { SettingsContext } from '../../context/settings';
import { Card, Button } from 'react-bootstrap'
import './list.scss'
import Auth from '../auth/auth';

export default function List(props) {

    const settingsContext = useContext(SettingsContext);
    const [currentItems, setCurrentItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(Math.ceil(props.list.length / settingsContext.perPage));
    console.log('hi hi hello 😀😀😀😀😀😀😀😀😀😀😀', props.list);
    useEffect(() => {
        let start = (currentPage - 1) * settingsContext.perPage;
        let end = start + settingsContext.perPage;
        setNumOfPages(Math.ceil(props.list.length / settingsContext.perPage));
        setCurrentItems(props.list.slice(start, end));
    }, [props.list.length]);

    useEffect(() => {
        if (settingsContext.showCompleted) {
            let start = (currentPage - 1) * settingsContext.perPage;
            let end = start + settingsContext.perPage;
            setCurrentItems(props.list.slice(start, end));
            setNumOfPages(Math.ceil(props.list.length / settingsContext.perPage));
        } else {
            let a = props.list.filter((item) => {
                return item.complete === false
            })
            let start = (currentPage - 1) * settingsContext.perPage;
            let end = start + settingsContext.perPage;
            setCurrentItems(a.slice(start, end));
            setNumOfPages(Math.ceil(a.length / settingsContext.perPage))
        }
    }, [currentPage, settingsContext.showCompleted]);

    function changeCurrentPage(num) {
        setCurrentPage(num);
    }

    function completed() {
        settingsContext.setshowCompleted(!settingsContext.showCompleted);
    }

    const navigate = () => {
        let page = [];
        for (let i = 1; i <= numOfPages; i++) {
            page.push(<button onClick={() => { changeCurrentPage(i) }} key={i}>{i}</button>)
        }
        return page;
    }

    return (
        <div id="cardform">

            {
                settingsContext.showCompleted &&
                <Button variant="info" onClick={completed} > Hide Completed </Button>
            }
            {
                !settingsContext.showCompleted &&
                <Button variant="info" onClick={completed} > View Completed </Button>
            }

            {currentItems.map(item => (

                <Card key={item.id}>
                    <Card.Body>
                        <Card.Title> {item.toDoItem} </Card.Title>
                        <Button id="close" variant="warning" onClick={() => props.deletefun(item.id)}> X </Button>
                        <Card.Text>
                            Assigned to: {item.assignedTo}
                        </Card.Text>
                        <Card.Text>
                            Difficulty: {item.difficulty}
                        </Card.Text>
                        <Auth capability="update">
                            <Button type="button" variant={item.complete ? 'success' : 'danger'} onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
                        </Auth>variant
                    </Card.Body>
                </Card>
            ))}

            {currentPage > 1 && <Button className="pre" onClick={() => { setCurrentPage(currentPage - 1) }}>Previous</Button>}
            {navigate()}
            {currentPage < numOfPages && <Button className="next" onClick={() => { setCurrentPage(currentPage + 1) }} >Next</Button>}
        </div>
    )
}