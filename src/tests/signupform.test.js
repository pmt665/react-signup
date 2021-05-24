import '@testing-library/jest-dom/extend-expect'
import { addUser } from '../services/userService'
import { signupSchema } from '../components/SignUpForm'

describe('Signup Component test Cases', () => {
    describe('Signup User EndPoint - Testing', () => {
        it('post data to endPoint should return status 200. ', async() => {
            const user = {firstName : 'puneet', lastName: 'gupta', email: 'pmt665@gmail.com' };
            let res = await addUser(user);
            expect(res.statusText).toEqual('OK');
        })
    })
    describe('validates schema', ()=> {
        it('if all the required fields are not entered should throw a ValidationError ', async () => {
            let res = await validateSchema({user: {firstName:'puneet'}});
            expect(res.error.toString()).toMatch('ValidationError')
        })
        it('if password contains lastName should throw an validation Error ', async () => {
            let res =  await validateSchema({user: {firstName:'puneet',lastName: 'gupta', email:'pmt665@gmail.com', password:'guptaAh12356!' }});
            expect(res.errors[0]).toBe('Password should not contain first name or last name')
        })
        it('if password contains firstName should throw an validation Error ', async () => {
            let res = await validateSchema({user: {firstName:'puneet',lastName: 'gupta', email:'pmt665@gmail.com', password:'puneetAh12356!' }});
            expect(res.errors[0]).toBe('Password should not contain first name or last name')
        })
        it('if email is not valid should throw an validation error ', async () => {
            let res =  await validateSchema({user: {firstName:'puneet',lastName: 'gupta', email:'pmt665', password:'Ah1235d6!' }});
            expect(res.errors[0]).toBe('Wrong email format')
        })
        it('if firstName is used in password with different case it should fail with validation error ', async () => {
            let res = await validateSchema({user: {firstName:'PUNEET',lastName: 'gupta', email:'pmt665@gmail.com', password:'puneetAh1234555!' }})
            expect(res.errors[0]).toBe('Password should not contain first name or last name')
        })
        it('if lastName is used in password with different case it should fail with validation error ', async () => {
            let res = await validateSchema({user: {firstName:'puneet',lastName: 'GUPTA', email:'pmt665@gmail.com', password:'guptaAh1234555!' }})
            expect(res.errors[0]).toBe('Password should not contain first name or last name')
        })
        it('if password contains less than 8 charcters it should throw validation error ', async () => {
            let res = await validateSchema({user: {firstName:'puneet',lastName: 'gupta', email:'pmt665@gmail.com', password:'Ah12356' }});
            expect(res.errors[0]).toBe('Password should contain minimum 8 characters')
        })
        it('if password does not contain one upper case it should throw validation error', async () => {
            let res = await validateSchema({user: {firstName:'puneet',lastName: 'gupta', email:'pmt665@gmail.com', password:'ah123ff56' }});
            expect(res.errors[0]).toBe('Password must contain one upper case letter');
        })
        it('if password does not contain one lower case it should throw validation error', async () => {
            let res = await validateSchema({user: {firstName:'puneet',lastName: 'gupta', email:'pmt665@gmail.com', password:'AH123FF56' }})
            expect(res.errors[0]).toBe('Password must contain one lower case letter');
        })
        it('if all fields passed  are valid schema should pass', async () => {
            let object = {user: {firstName:'puneet',lastName: 'gupta', email:'pmt665@gmail.com', password:'Ah1245678!' }}
            let res = await validateSchema(object);
            expect(res).toBe(object);
        })
        it('if First Name contains numbers it should throw validation error', async () => {
            let object = {user: {firstName:'Puneer134',lastName: 'gupta', email:'pmt665@gmail.com', password:'Ah1245678!' }}
            let res = await validateSchema(object);
            expect(res.errors[0]).toBe('First Name should contain only letters');
        })
        it('if Last Name contains numbers it should throw validation error', async () => {
            let object = {user: {firstName:'Puneet',lastName: 'gupta123', email:'pmt665@gmail.com', password:'Ah1245678!' }}
            let res = await validateSchema(object);
            expect(res.errors[0]).toBe('Last Name should contain only letters');
        })
    })
})

const validateSchema = async(input) => {
    try{
        let res = await signupSchema.validate(input);
        return res;
    }
    catch(err) {
        return { 
            error: err,
            errors: err.errors
        }
    }
}