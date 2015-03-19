HolderListComponent = (Backbone, MixinBackbone)->
  SuperView = MixinBackbone(Backbone.Epoxy.View)
  class ListComponent extends SuperView
    itemView: SuperView
    bindings:
      ":el": "collection: $collection"

    reloadTemplate: ->
      @$wrappedEl = @$el.children().detach()
      if @$wrappedEl? and @$wrappedEl.length
        @itemView = @__extendItemView()
      else
        throw Error "ListComponent: empty template"
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
if (typeof define is 'function') and (typeof define.amd is 'object') and define.amd
  define ["backbone", "backbone-mixin", "epoxy"], (Backbone, MixinBackbone)->
    HolderListComponent(Backbone, MixinBackbone)
else
  window.ListComponent = HolderListComponent(Backbone, MixinBackbone)
