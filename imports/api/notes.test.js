import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';


if (Meteor.isServer) {

    describe('notes', function() {

        const noteOne = {
            _id: 'testid1',
            title: 'My title',
            body: 'My body for note',
            userId: 'testUserId1',
            updatedAt: 0
        };

        const noteTwo = {
            _id: 'testid2',
            title: 'Things to buy',
            body: 'Couch,Bed,Etc.',
            userId: 'testUserId2',
            updatedAt: 0
        };

        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });

        it('should insert new note', function() {
            const userId = 'testid';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: 'testid' });

            expect(Notes.findOne({ _id, userId })).toBeTruthy();
        });

        it('should not insert note if not authenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('should remove note', function() {
            Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

            expect(Notes.findOne({ _id: noteOne._id })).toBeFalsy();
        });

        it('should not remove note if unauthenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);   
            }).toThrow();
        });

        it('should not remove notes if invalid_id', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });   
            }).toThrow();
        });

        it('should update note', function() {
            const title  = 'This is an updated title';
            Meteor.server.method_handlers['notes.update'].apply({
                userId: noteOne.userId
            }, [
                noteOne._id,
                { title }
            ]);   

            const note = Notes.findOne(noteOne._id);

            expect(note.updatedAt).toBeGreaterThan(0);
            expect(note).toInclude({
                title,
                body: noteOne.body
            });
        });
        
        it('should throw error if extra updates provided', function() {
            const title  = 'This is an updated title';
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: noteOne.userId,
                }, [
                    noteOne._id,
                    { title, updatedAt: '' }
                ]);   
            }).toThrow();
        });

        it('should not update note if user was not creator', function() {
            const title  = 'This is an updated title';
            Meteor.server.method_handlers['notes.update'].apply({
                userId: 'testid'
            }, [
                noteOne._id,
                { title }
            ]);   

            const note = Notes.findOne(noteOne._id);

            expect(note).toInclude(noteOne);
        });

        it('should not update note if unauthenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);   
            }).toThrow();
        });

        it('should not update notes if invalid_id', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });   
            }).toThrow();
        });

        it('should return a users notes', function() {
            const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it('should return zero notes for user that has none', function() {
            const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testid' });
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        });

    });

}