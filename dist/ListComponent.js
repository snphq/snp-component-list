/*! snp-component-list 0.0.1 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(function(require, define, exports) {
  var Backbone, ListComponent, MixinBackbone, SuperView;
  Backbone = require("backbone");
  MixinBackbone = require("backbone-mixin");
  require("epoxy");
  SuperView = MixinBackbone(Backbone.Epoxy.View);
  return ListComponent = (function(superClass) {
    extend(ListComponent, superClass);

    function ListComponent() {
      return ListComponent.__super__.constructor.apply(this, arguments);
    }

    ListComponent.prototype.itemView = SuperView;

    ListComponent.prototype.bindings = {
      ":el": "collection: $collection"
    };

    ListComponent.prototype.reloadTemplate = function() {
      this.$wrappedEl = this.$el.children().detach();
      if (this.$wrappedEl != null) {
        this.itemView = this.__extendItemView();
      }
      return ListComponent.__super__.reloadTemplate.apply(this, arguments);
    };

    ListComponent.prototype.__extendItemView = function() {
      var bindings, ext, rootBinding, templateText;
      templateText = this.$wrappedEl.html();
      ext = {
        tagName: this.$wrappedEl[0].tagName,
        className: this.$wrappedEl[0].className,
        templateFunc: function() {
          return templateText;
        }
      };
      rootBinding = this.$wrappedEl.attr('data-bind');
      if (rootBinding) {
        bindings = {} || this.itemView.prototype.bindings;
        bindings[':el'] = rootBinding;
        ext.bindings = bindings;
      }
      return this.itemView.extend(ext);
    };

    return ListComponent;

  })(SuperView);
});
