import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
    describe('NoteListItem', function() {

        it('should render title and timestamp', function() {
            const title = 'My title here';
            const updatedAt = 1521943548941;
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('2018-03-24')
        });

        it('should set default title if no title set', function() {
            const updatedAt = 1521943548941;
            const wrapper = mount(<NoteListItem note={{ title: '', updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe('Untitled note');
            expect(wrapper.find('p').text()).toBe('2018-03-24')
        });
        

    });
}