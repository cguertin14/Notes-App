import expect from 'expect';
import { validateNewUser } from './users';
import { Meteor } from 'meteor/meteor';


if (Meteor.isServer) {
    describe('users', function() {

        it('should allow valid email address', function() {
            const testUser = {
                emails: [
                    {
                        address: 'Test@example.com'
                    }
                ]
            };

            const res = validateNewUser(testUser);

            expect(res).toBe(true);
        });

        it('should reject invalid email', function() {
            const testUser = {
                emails: [
                    {
                        address: 'Testexample.com'
                    }
                ]
            };

            expect(() => {
                validateNewUser(testUser)
            }).toThrow();
        });

    });
}




/*const add = (a, b) => {
    if (typeof(b) !== 'number') {
        return a + a;
    }
    return a + b;
};

const square = (a) => Math.pow(a, 2);

describe('Numbers', function() {
    it('should add two numbers', function() {
        const res = add(11,9);

        expect(res).toBe(20);
    });
    
    it('should double a single number', function () {
        const res = add(44);

        expect(res).toBe(88);
    });
});

describe('Square', function() {
    it('should square a number', function() {
        const res = square(9);

        expect(res).toBe(res);
    });
})*/