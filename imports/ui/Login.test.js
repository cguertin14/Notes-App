import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from './Login';
import ReactContextOptions from 'react-router-enzyme-context';

if (Meteor.isClient) {
    describe('Login', function () {

        beforeEach(function () {
            configure({ adapter: new Adapter() });
        });

        it('should show error messages', function () {
            const error = 'This is not working';
            const wrapper = mount(<Login loginWithPassword={() => { }} />);

            wrapper.setState({ error });            
            expect(wrapper.find('p').text()).toBe(error);

            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call loginWithPassword with the form data', function() {
            const email    = 'a@a.a',
                  password = 'password123',
                  spy      = expect.createSpy(),
                  wrapper  = mount(<Login loginWithPassword={spy}/>);

            wrapper.find('input').first().getDOMNode().value = email;
            wrapper.find('input').last().getDOMNode().value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({ email });
            expect(spy.calls[0].arguments[1]).toBe(password);
        });

        it('should set loginWithPassword callback errors', function() {
            const options  = new ReactContextOptions(),
                  email    = 'a@a.a',
                  password = 'password123',
                  spy      = expect.createSpy(),
                  wrapper  = mount(<Login loginWithPassword={spy}/>);

            wrapper.find('form').simulate('submit');
            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error').length).toNotBe(0);

            spy.calls[0].arguments[2]();
            expect(wrapper.state('error').length).toBe(0);
        });

    });
}