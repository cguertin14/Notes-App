import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignUp } from './SignUp';
import ReactContextOptions from 'react-router-enzyme-context';

if (Meteor.isClient) {
    describe('SignUp', function () {

        beforeEach(function () {
            configure({ adapter: new Adapter() });
        });

        it('should show error messages', function () {
            const error = 'This is not working';
            const wrapper = shallow(<SignUp createUser={() => { }} />);

            wrapper.setState({ error });            
            expect(wrapper.find('p').text()).toBe(error);

            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call createUser with the form data', function() {
            const email    = 'a@a.a',
                  password = 'password123456',
                  spy      = expect.createSpy(),
                  wrapper  = mount(<SignUp createUser={spy}/>);

            wrapper.find('input').first().getDOMNode().value = email;
            wrapper.find('input').last().getDOMNode().value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });

        it('should set error if short password', function() {
            const email    = 'a@a.a',
                  password = '456              ',
                  spy      = expect.createSpy(),
                  wrapper  = mount(<SignUp createUser={spy}/>);

            wrapper.find('input').first().getDOMNode().value = email;
            wrapper.find('input').last().getDOMNode().value = password;
            wrapper.find('form').simulate('submit');

            expect(wrapper.state('error').length).toBeGreaterThan(0);
        });

        it('should set createUser callback errors', function() {
            const email    = 'a@a.a',
                  password = 'password123',
                  spy      = expect.createSpy(),
                  wrapper  = mount(<SignUp createUser={spy}/>),
                  reason   = 'This is why ist failed';

            wrapper.find('input').last().getDOMNode().value = password;
            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[1]({ reason });
            expect(wrapper.state('error')).toEqual(reason);

            spy.calls[0].arguments[1]();
            expect(wrapper.state('error').length).toBe(0);
        });

    });
}