import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { WebApp } from 'meteor/webapp';

// Users Methods
import '../imports/api/users';
import '../imports/api/notes';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

});
