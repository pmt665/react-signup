import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import Users from '../components/Users';
import { addUser }  from  '../services/userService'
import Errors  from './../components/Errors'
import { Spinner } from 'react-bootstrap';

const SignUpFormContainer = () => {
    const [isTimeOutCompeleted, setTimeOutCompleted] = useState(false);
    const [showLoading, setShowLoading]= useState(false);
    const [isError, setError] = useState(false)
    let timer = null;
    const sleep = (milliseconds) => {
        return new Promise((resolve) => {
            timer = setTimeout(resolve, milliseconds);
        })
    };
    const handleRegister = async(props) => {
        const { user } = props;
        setTimeOutCompleted(false)
        setShowLoading(true);
        try {
            await addUser(user) //Post form data 
            await sleep(4000) //wait 4 sec
            setTimeOutCompleted(true); //sets the value and in render calls <users> component which reterive users.
            setShowLoading(false);
            timer && clearTimeout(timer); //Clears the timer to avoid memory leak
        }
        catch(e){
            setError(true)
            setShowLoading(false);
        }
    }
    return(
        <div>
            { isError 
            ? <Errors errors ={[ 'some Error occured....Please retry after sometime' ]}/>
            : <div>
                    <SignUpForm handleSubmit = {handleRegister} />
                    {isTimeOutCompeleted &&  <Users/>}
                    {showLoading && <Spinner animation="border" role="status"/>}
                </div>
            }
        </div>
    )
}

export default SignUpFormContainer;