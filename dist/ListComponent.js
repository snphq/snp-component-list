/*! snp-component-list 0.0.6 */
(function() {
  var HolderListComponent,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  HolderListComponent = function(Backbone, MixinBackbone) {
    var ListComponent, SuperView;
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
        if ((this.$wrappedEl != null) && this.$wrappedEl.length) {
          this.itemView = this.__extendItemView();
        } else {
          throw Error("ListComponent: empty template");
        }
        return ListComponent.__super__.reloadTemplate.apply(this, arguments);
      };

      ListComponent.prototype.__extendItemView = function() {
        var ext, reloadTemplate, rootBinding, templateText;
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
          reloadTemplate = this.itemView.prototype.reloadTemplate;
          ext.reloadTemplate = function() {
            reloadTemplate.apply(this);
            return this.$el.attr("data-bind", rootBinding);
          };
        }
        return this.itemView.extend(ext);
      };

      return ListComponent;

    })(SuperView);
  };

  if ((typeof define === 'function') && (typeof define.amd === 'object') && define.amd) {
    define(["backbone", "backbone-mixin", "epoxy"], function(Backbone, MixinBackbone) {
      return HolderListComponent(Backbone, MixinBackbone);
    });
  } else {
    window.ListComponent = HolderListComponent(Backbone, MixinBackbone);
  }

}).call(this);
