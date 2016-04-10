//发布集合
Meteor.publish('posts', function() {
  return Posts.find();
});