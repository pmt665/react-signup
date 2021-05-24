import React, { useState, useEffect } from 'react';
import { retrieveUsers } from '../services/userService';
import { Table } from 'react-bootstrap'

 const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
       async function fetchUsers(){
           setUsers(await retrieveUsers());
       }
       fetchUsers();
    }, []);
    return(
        <div className='user'>
            <h5><b>List Users</b></h5>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                {users.map((item, idx) => (
                    <tbody key={idx}>
                        <tr>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>
    );
}

export default Users;