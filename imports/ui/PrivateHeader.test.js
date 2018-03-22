import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PrivateHeader } from './PrivateHeader';


if (Meteor.isClient) {
    describe('PrivateHeader', function() {

        beforeEach(function() {
            configure({ adapter: new Adapter() });
        });

        it('should set button text to logout', function() {
            const wrapper = mount( <PrivateHeader title="test title" handleLogout={() => {}} /> );
            const buttonText = wrapper.find('button').text();

            expect(buttonText).toBe('Logout');
        });

        it('should use title prop as h1 text', function() {
            const title = 'test title here';
            const wrapper = mount( <PrivateHeader title={title}  /> );
            const h1 = wrapper.find('h1').text();

            expect(h1).toEqual(title);
        });

        it('should call the function', function() {
            const spy = expect.createSpy();
            spy(3,4,124);
            spy('Martin');
            expect(spy).toHaveBeenCalledWith('Martin');
        });

        it('should call handleLogout on Click', function() {
            const spy = expect.createSpy();
            const wrapper = mount( <PrivateHeader title="test title" handleLogout={spy} /> );

            wrapper.find('button').simulate('click');

            expect(spy).toHaveBeenCalled();
        });

    });
}