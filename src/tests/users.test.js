import '@testing-library/jest-dom/extend-expect'
import { retrieveUsers } from '../services/userService'

describe('Users Component test Cases', () => {
    describe('ReterieveUsers EndPoint -Testing', () => {
        it('have all same properties should match with the data returned from end point. ', async() => {
            const data = [{firstName : 'John', lastName: 'Doe', email: 'johndoe@gmail.com' }];
            expect(data).toEqual(await retrieveUsers())
        })
        it('if not all propeties are passed it should fail', async() => {
            const data = [{ lastName: 'Doe', email: 'johndoe@gmail.com' }];
            expect(data).not.toBe(await retrieveUsers())
        })
    })
})
