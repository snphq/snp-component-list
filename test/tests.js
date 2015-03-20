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
      list3: {
        el: '[data-js-list3]',
        view: ListComponent,
        scope: function(){
          return {collection: this.collection };
        }
      }
    },

    scope: function () {
      this.collection = new Backbone.Collection()
      this.collection.add([
        {
          name: 'First element',
          active: false
        },{
          name: 'Second element',
          active: true
        }
      ]);
    },


  });
  window.view = new View;
  it("Binds root element", function(){
    $('[data-js-list1] li:first').text().should.equal('First element');
    $('[data-js-list1] li:nth-child(2)').text().should.equal('Second element');
  });
  it("Binds not root elements", function(){
    $('[data-js-list2]').find('tr').eq(0).find('td').text().should.contain('First element');
    $('[data-js-list2]').find('tr').eq(1).find('td').text().should.contain('Second element');
  })
  it("Binds both root elements and not root els", function(){
    $('[data-js-list3]').find('li').eq(0).text().should.contain('First element');
    $('[data-js-list3]').find('li').eq(1).hasClass('active').should.be.true;
  })

});