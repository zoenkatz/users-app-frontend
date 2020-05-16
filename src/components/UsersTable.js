import React, {useContext, useEffect, useRef} from 'react';
import UsersContext from '../UsersContext';
import {startCase} from 'lodash';

const UsersTable = () => {
    const {state, dispatch} = useContext(UsersContext);
    const clickedUserRef = useRef();

    const openUserForm = (event) => {;
        const userClickedID = event.target.closest('tr') && event.target.closest('tr').childNodes[0].innerText;
        const userClickedByID = state.users.find(user => user.ID === userClickedID);

        if (userClickedByID) {
            dispatch({type: 'SET_EDIT_USER_AND_OPEN_FORM', payload: {editUser: userClickedByID}})
        }
    };

    useEffect(() => {
        fetch('http://localhost:3001/users-list', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                dispatch({type: 'GET_USERS', payload: {users: res}})


            }).catch((err) => {
            console.log(err);
        })
    }, []);

    const renderTableData = () => {
        return state.users && state.users.filter(user => user.firstName && user.firstName.toLowerCase().indexOf(state.query.toLowerCase()) > -1).map((user, index) => {
            const {ID, firstName, lastName, age, gender, marialStatus, kids, _id} = user;
            return (
                <tr key={index} onDoubleClick={openUserForm} ref={clickedUserRef}>
                    <td>{ID}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{age}</td>
                    <td>{gender}</td>
                    <td>{marialStatus}</td>
                    <td>{kids ? kids.join(', ') : ''}</td>
                </tr>
            )
        })
    };

    const renderTableHeader = () => {
        let headers = state.users && !!state.users.length ? Object.keys(state.users[0]) : [];
        return headers.map((header, index) => {
            if (index) {
                return <th key={index}>{startCase(header)}</th>
            }
        })
    };

    return (
        <div className="users-table">
            <table id='users'>
                <tbody>
                <tr>{renderTableHeader()}</tr>
                {renderTableData()}
                </tbody>
            </table>
        </div>
    )
};

export default UsersTable;
