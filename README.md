# List component view for generator-sp

Usefull only with [generator-sp](https://github.com/snphq/generator-sp).

## Installation

Install it from bower.
```bash
bower install snp-component-list
```


Add js requirements reference to `main.coffee`
```coffee
...
require.config
  paths:
  ...
  'ListComponent': "#{VENDOR_PATH}/snp-component-scroll/dist/ListComponent"

...
```


## Usage

Add component region in view, set to some collection into scope

**coffee:**
```coffee
  ListComponent = require "ListComponent"
  SampleModel = Backbone.Model.extend
    defaults:
      title: ''

  SampleCollection = Backbone.Collection.extend
    model: SampleModel

  ListPage = _Page.extend
    template: "#ListPage"
    className: "list_page"

    regions:
      list:
        el: '[data-view-list]'
        view: ListComponent
        scope: ->
          {collection: @sampleCollection}

    scope: ->
      @sampleCollection = new SampleCollection
      sampleData = ({title: "Sample #{i}"} for i in [1..5])
      @sampleCollection.add sampleData

```

Create region in markup. Write `itemView` template in region.

**jade:**
```jade
h1 List Component
ul(data-view-list-1)
  li(data-bind='text: title')

```


**Result:**
```html
<div class="list_page">
  <h1>List Component</h1>
  <ul data-view-list="">
    <li>Sample 1</li>
    <li>Sample 2</li>
    <li>Sample 3</li>
    <li>Sample 4</li>
    <li>Sample 5</li>
  </ul>
</div>
```

