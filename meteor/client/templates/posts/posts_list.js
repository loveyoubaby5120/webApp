//读取数据
Template.postsList.helpers({
  posts: function(){
    return Posts.find();
  }
});