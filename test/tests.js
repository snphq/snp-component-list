describe("ListComponent", function(){
  chai.should();
  var SuperClass = MixinBackbone(Backbone.View);

  var View = SuperClass.extend({
    el: '#mainView',
    regions: {
      list1: {
        el: '[data-js-list1]',
        view: ListComponent,
        scope: function(){
          return {collection: this.collection };
        }
      },
      list2: {
        el: '[data-js-list2]',
        view: ListComponent,
        scope: function(){
          return {collection: this.collection };
        }
      },
    },

    scope: function () {
      this.collection = new Backbone.Collection()
      this.collection.add([
        {
          name: 'First element'
        },{
          name: 'Second element'
        }
      ]);
    },


  });
  window.view = new View;
  it("Binds root element", function(){
    $('[data-js-list1] li:first').text().should.equal('First element');
    $('[data-js-list1] li:nth-child(2)').text().should.equal('Second element');
  });
  it("Binds not root elements")

});
