describe "Epoxy inline bindings", ->
  beforeEach ->
    $('body').html """
    <div id="view">
      <ul data-js-list1>
        <li data-bind='text: name'></li>
      </ul>
      <table data-js-list2>
        <tr>
          <td data-bind='text: name'></td>
        </tr>
      </table>
      <ul data-js-list3>
        <li data-bind='classes: {active: active}'>
          <a href="" data-bind="text: name"></a>
        </li>
      </ul>
    </div>
    """
    SuperClass = MixinBackbone Backbone.View
    collection = new Backbone.Collection
    collection.add [
      name: 'First element',
      active: false
    ,
      name: 'Second element',
      active: true
    ]
    View = SuperClass.extend
      el: '#view'
      regions:
        list1:
          el: '[data-js-list1]'
          view: ListComponent
          scope: {collection}
        list2:
          el: '[data-js-list2]'
          view: ListComponent
          scope: {collection}
        list3:
          el: '[data-js-list3]'
          view: ListComponent
          scope: {collection}
    view = new View

  afterEach ->
    $('body').html ""

  it "works on root viewItem element", ->
    expect('First element').toMatch $('[data-js-list1] li:first').text()
    expect('Second element').toMatch $('[data-js-list1] li:nth-child(2)').text()
  it "works on not root viewItem element", ->
    expect($('[data-js-list2]').find('tr').eq(0).find('td').text()).toMatch 'First element'
    expect($('[data-js-list2]').find('tr').eq(1).find('td').text()).toMatch 'Second element'
  it "works both on root and not root viewItem element", ->
    $el = $('[data-js-list3]').find('li').eq(1)
    expect($el.text()).toMatch "Second element"
    expect($el.hasClass('active')).toBe true
