import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin,{
  validations: {
    name: {
      presence: true
    },
  },

  inventoryTypes: ['book'],

  selectedType: 'book',

  userGroupsList: function(){
    return this.get('user_groups');
  }.property('user_groups.@each'),

  selectedGroupsList: [],

  actions: {
    submit: function(){
      var _this = this;
      var resource = this.store.createRecord('resource', 
        {
          name: this.get('name'),
          isbn_number: this.get('isbn_number'), 
          resource_type: this.get('selectedType'),
          group_ids: Ember.$.map(this.get('selectedGroupsList'), function(group){return group.id;})
        }
      );
      resource.save().then(function(){
        _this.transitionToRoute('inventory');
      });
    }
  }
});
