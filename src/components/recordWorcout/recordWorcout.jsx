import React from 'react';
import './record-training.css';
import { useState } from 'react'; 
import { nanoid } from 'nanoid';




const DEAFULT_FORM = {
    id: '',
    date: '',
    count: 0,
}

export const RecordWorcout = () => {

    const [state, setState] = useState(DEAFULT_FORM); 
    let [arrState, setArrState] = useState([]);

    function addWorkout(evt) {
        evt.preventDefault();
        const findDouble = arrState.findIndex((item) => state.date === item.date);
        if (findDouble === -1) {
            arrState.push(state);
        } else {
            arrState[findDouble] = {id: arrState[findDouble].id, date: arrState[findDouble].date, count: arrState[findDouble].count + state.count};
        }
        arrState = arrState.sort((a, b) => {
            return b.date-a.date;
        });
        for (let i = 0; i < arrState.length; i++) {
            arrState[i].strDate = new Date(arrState[i].date).toLocaleDateString();
            console.log(arrState[i]);
        }
        console.log(arrState);
        setArrState(prev => ([...prev]));
    }

    const deleteWorkout = (evt) => {
        arrState.forEach((item, index) => {
            if (item.id === evt.target.id) {
                arrState.splice(index, 1);
                setArrState(prev => ([...prev]));
            }
        })
    }

    

    const changeSubmit = (evt) => {
        const name = evt.target.name;
        setState(prev => ({ ...prev, [name]: parseInt(evt.target.value), id: nanoid() }));
    }

    const changeDateSubmit = (evt) => {
        const date = evt.target.value;
        setState(prev => ({ ...prev, date: new Date(date).getTime(), id: nanoid() }));
    }

    

    return (
    <React.Fragment>
        <form className='training-form' onSubmit={addWorkout}>
            <div className='training-form-date'>
                <label htmlFor="training-form-date" ></label>
                <input type="date" name='date' className='training-form-date-input' id='training-form-date' onChange={changeDateSubmit}/>
            </div>

            <div className='training-form-count'>
                <label htmlFor="training-form-count"  ></label>
                <input type="text" name='count' className='training-form-count-input' id='training-form-count' onChange={changeSubmit}/>
            </div>

            <button className='training-form-button'>Ок</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>Дата(ДД.ММ.ГГ)</th>
                    <th>Пройдено км</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {arrState.map(item => (
                    <tr key={item.id}>
                        <td>{item.strDate}</td>
                        <td>{item.count}</td>
                        <td><button>Редактировать</button><button onClick={deleteWorkout} id={item.id}>Удалить</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </React.Fragment>
    )
}