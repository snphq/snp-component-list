define (require, define, exports)->
  Backbone = require "backbone"
  MixinBackbone = require "backbone-mixin"
  require "epoxy"

  SuperView = MixinBackbone(Backbone.Epoxy.View)
  class ListComponent extends SuperView
    itemView: SuperView
    bindings:
      ":el": "collection: $collection"

    reloadTemplate: ->
      @$wrappedEl = @$el.children().detach()
      if @$wrappedEl?
        @itemView = @__extendItemView()
      super

    __extendItemView: ->
      templateText = @$wrappedEl.html()
      ext = {
        tagName: @$wrappedEl[0].tagName
        className: @$wrappedEl[0].className
        templateFunc: -> templateText
      }
      rootBinding = @$wrappedEl.attr 'data-bind'
      if rootBinding
        bindings = {} || @itemView.prototype.bindings
        bindings[':el'] = rootBinding
        ext.bindings = bindings
      @itemView.extend ext