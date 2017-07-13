$('nav').sticky();

$(document).ready(function () {
  $("#searchButton").click(function () {
    $("#searchBox").toggleClass("search-show");
  });
});

function openNav() {
  document.getElementById("cssmenu").style.width = "100%";
  document.getElementById("cssmenu").style.opacity = "1";
}

function closeNav() {
  document.getElementById("cssmenu").style.width = "0";
  document.getElementById("cssmenu").style.opacity = "0";
}

var close = document.getElementsByClassName("close-alert");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
    }
}


(function ($) {
  $(document).ready(function () {
    $('#cssmenu > ul > li > a').click(function () {
      $('#cssmenu li').removeClass('opened');
      $(this).closest('li').addClass('opened');
      var checkElement = $(this).next();
      if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
        $(this).closest('li').removeClass('opened');
        checkElement.slideUp('normal');
      }
      if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
        $('#cssmenu ul ul:visible').slideUp('normal');
        checkElement.slideDown('normal');
      }
      if ($(this).closest('li').find('ul').children().length == 0) {
        return true;
      } else {
        return false;
      }
    });
  });
})(jQuery);
$(document).ready(function () {
  $('.collapse.in').prev('.panel-heading-2').addClass('active');
  $('#accordion, #bs-collapse')
    .on('show.bs.collapse', function (a) {
      $(a.target).prev('.panel-heading-2').addClass('active');
    })
    .on('hide.bs.collapse', function (a) {
      $(a.target).prev('.panel-heading-2').removeClass('active');
    });
});

(function($){

    $.scrolltop = function(params){

        var defaults = {
            template: '^',
            duration: 1000,
            class: ''
        };

        params = $.extend({}, defaults, params);

        var $element = $('body');
        var $window = $(window);
        var $link = $('<a></a>')
        .attr('href', '#')
        .addClass('scrolltop ' + params.class)
        .html(params.template)
        .click(function(e){
            e.preventDefault();
            $('body, html').animate({
                scrollTop: 0
            }, params.duration);
        })
        .appendTo($element);

        $window.scroll(function(e){
            var scrollTop = $(this).scrollTop();
            if (scrollTop > $(this).height() / 2) {
                $link.addClass('active');
            }
            else {
                $link.removeClass('active');
            }
        });

    };

})(jQuery);

        (function($){

            $.scrolltop({
                template: '<i class="fa fa-chevron-up"></i>',
                class: 'custom-scrolltop'
            });

        })(jQuery);


(function ($) {

  function EasyDropDown() {
    this.isField = true,
      this.down = false,
      this.inFocus = false,
      this.disabled = false,
      this.cutOff = false,
      this.hasLabel = false,
      this.keyboardMode = false,
      this.nativeTouch = true,
      this.wrapperClass = 'dropdowner',
      this.onChange = null;
  };

  EasyDropDown.prototype = {
    constructor: EasyDropDown,
    instances: {},
    init: function (domNode, settings) {
      var self = this;

      $.extend(self, settings);
      self.$select = $(domNode);
      self.id = domNode.id;
      self.options = [];
      self.$options = self.$select.find('option');
      self.isTouch = 'ontouchend' in document;
      self.$select.removeClass(self.wrapperClass + ' dropdowner');
      if (self.$select.is(':disabled')) {
        self.disabled = true;
      };
      if (self.$options.length) {
        self.$options.each(function (i) {
          var $option = $(this);
          if ($option.is(':selected')) {
            self.selected = {
              index: i,
              title: $option.text()
            }
            self.focusIndex = i;
          };
          if ($option.hasClass('label') && i == 0) {
            self.hasLabel = true;
            self.label = $option.text();
            $option.attr('value', '');
          } else {
            self.options.push({
              domNode: $option[0],
              title: $option.text(),
              value: $option.val(),
              selected: $option.is(':selected')
            });
          };
        });
        if (!self.selected) {
          self.selected = {
            index: 0,
            title: self.$options.eq(0).text()
          }
          self.focusIndex = 0;
        };
        self.render();
      };
    },

    render: function () {
      var self = this,
        touchClass = self.isTouch && self.nativeTouch ? ' touch' : '',
        disabledClass = self.disabled ? ' disabled' : '';

      self.$container = self.$select.wrap('<div class="' + self.wrapperClass + touchClass + disabledClass + '"><span class="old"/></div>').parent().parent();
      self.$active = $('<span class="selected">' + self.selected.title + '</span>').appendTo(self.$container);
      self.$carat = $('<span class="carat"/>').appendTo(self.$container);
      self.$scrollWrapper = $('<div><ul/></div>').appendTo(self.$container);
      self.$dropDown = self.$scrollWrapper.find('ul');
      self.$form = self.$container.closest('form');
      $.each(self.options, function () {
        var option = this,
          active = option.selected ? ' class="active"' : '';
        self.$dropDown.append('<li' + active + '>' + option.title + '</li>');
      });
      self.$items = self.$dropDown.find('li');

      if (self.cutOff && self.$items.length > self.cutOff) self.$container.addClass('scrollable');

      self.getMaxHeight();

      if (self.isTouch && self.nativeTouch) {
        self.bindTouchHandlers();
      } else {
        self.bindHandlers();
      };
    },

    getMaxHeight: function () {
      var self = this;

      self.maxHeight = 0;

      for (i = 0; i < self.$items.length; i++) {
        var $item = self.$items.eq(i);
        self.maxHeight += $item.outerHeight();
        if (self.cutOff == i + 1) {
          break;
        };
      };
    },

    bindTouchHandlers: function () {
      var self = this;
      self.$container.on('click.easyDropDown', function () {
        self.$select.focus();
      });
      self.$select.on({
        change: function () {
          var $selected = $(this).find('option:selected'),
            title = $selected.text(),
            value = $selected.val();

          self.$active.text(title);
          if (typeof self.onChange === 'function') {
            self.onChange.call(self.$select[0], {
              title: title,
              value: value
            });
          };
        },
        focus: function () {
          self.$container.addClass('focus');
        },
        blur: function () {
          self.$container.removeClass('focus');
        }
      });
    },

    bindHandlers: function () {
      var self = this;
      self.query = '';
      self.$container.on({
        'click.easyDropDown': function () {
          if (!self.down && !self.disabled) {
            self.open();
          } else {
            self.close();
          };
        },
        'mousemove.easyDropDown': function () {
          if (self.keyboardMode) {
            self.keyboardMode = false;
          };
        }
      });

      $('body').on('click.easyDropDown.' + self.id, function (e) {
        var $target = $(e.target),
          classNames = self.wrapperClass.split(' ').join('.');

        if (!$target.closest('.' + classNames).length && self.down) {
          self.close();
        };
      });

      self.$items.on({
        'click.easyDropDown': function () {
          var index = $(this).index();
          self.select(index);
          self.$select.focus();
        },
        'mouseover.easyDropDown': function () {
          if (!self.keyboardMode) {
            var $t = $(this);
            $t.addClass('focus').siblings().removeClass('focus');
            self.focusIndex = $t.index();
          };
        },
        'mouseout.easyDropDown': function () {
          if (!self.keyboardMode) {
            $(this).removeClass('focus');
          };
        }
      });

      self.$select.on({
        'focus.easyDropDown': function () {
          self.$container.addClass('focus');
          self.inFocus = true;
        },
        'blur.easyDropDown': function () {
          self.$container.removeClass('focus');
          self.inFocus = false;
        },
        'keydown.easyDropDown': function (e) {
          if (self.inFocus) {
            self.keyboardMode = true;
            var key = e.keyCode;

            if (key == 38 || key == 40 || key == 32) {
              e.preventDefault();
              if (key == 38) {
                self.focusIndex--
                  self.focusIndex = self.focusIndex < 0 ? self.$items.length - 1 : self.focusIndex;
              } else if (key == 40) {
                self.focusIndex++
                  self.focusIndex = self.focusIndex > self.$items.length - 1 ? 0 : self.focusIndex;
              };
              if (!self.down) {
                self.open();
              };
              self.$items.removeClass('focus').eq(self.focusIndex).addClass('focus');
              if (self.cutOff) {
                self.scrollToView();
              };
              self.query = '';
            };
            if (self.down) {
              if (key == 9 || key == 27) {
                self.close();
              } else if (key == 13) {
                e.preventDefault();
                self.select(self.focusIndex);
                self.close();
                return false;
              } else if (key == 8) {
                e.preventDefault();
                self.query = self.query.slice(0, -1);
                self.search();
                clearTimeout(self.resetQuery);
                return false;
              } else if (key != 38 && key != 40) {
                var letter = String.fromCharCode(key);
                self.query += letter;
                self.search();
                clearTimeout(self.resetQuery);
              };
            };
          };
        },
        'keyup.easyDropDown': function () {
          self.resetQuery = setTimeout(function () {
            self.query = '';
          }, 1200);
        }
      });

      self.$dropDown.on('scroll.easyDropDown', function (e) {
        if (self.$dropDown[0].scrollTop >= self.$dropDown[0].scrollHeight - self.maxHeight) {
          self.$container.addClass('bottom');
        } else {
          self.$container.removeClass('bottom');
        };
      });

      if (self.$form.length) {
        self.$form.on('reset.easyDropDown', function () {
          var active = self.hasLabel ? self.label : self.options[0].title;
          self.$active.text(active);
        });
      };
    },

    unbindHandlers: function () {
      var self = this;

      self.$container
        .add(self.$select)
        .add(self.$items)
        .add(self.$form)
        .add(self.$dropDown)
        .off('.easyDropDown');
      $('body').off('.' + self.id);
    },

    open: function () {
      var self = this,
        scrollTop = window.scrollY || document.documentElement.scrollTop,
        scrollLeft = window.scrollX || document.documentElement.scrollLeft,
        scrollOffset = self.notInViewport(scrollTop);

      self.closeAll();
      self.getMaxHeight();
      self.$select.focus();
      window.scrollTo(scrollLeft, scrollTop + scrollOffset);
      self.$container.addClass('open');
      self.$scrollWrapper.css('height', self.maxHeight + 'px');
      self.down = true;
    },

    close: function () {
      var self = this;
      self.$container.removeClass('open');
      self.$scrollWrapper.css('height', '0px');
      self.focusIndex = self.selected.index;
      self.query = '';
      self.down = false;
    },

    closeAll: function () {
      var self = this,
        instances = Object.getPrototypeOf(self).instances;
      for (var key in instances) {
        var instance = instances[key];
        instance.close();
      };
    },

    select: function (index) {
      var self = this;

      if (typeof index === 'string') {
        index = self.$select.find('option[value=' + index + ']').index() - 1;
      };

      var option = self.options[index],
        selectIndex = self.hasLabel ? index + 1 : index;
      self.$items.removeClass('active').eq(index).addClass('active');
      self.$active.text(option.title);
      self.$select
        .find('option')
        .removeAttr('selected')
        .eq(selectIndex)
        .prop('selected', true)
        .parent()
        .trigger('change');

      self.selected = {
        index: index,
        title: option.title
      };
      self.focusIndex = i;
      if (typeof self.onChange === 'function') {
        self.onChange.call(self.$select[0], {
          title: option.title,
          value: option.value
        });
      };
    },

    search: function () {
      var self = this,
        lock = function (i) {
          self.focusIndex = i;
          self.$items.removeClass('focus').eq(self.focusIndex).addClass('focus');
          self.scrollToView();
        },
        getTitle = function (i) {
          return self.options[i].title.toUpperCase();
        };

      for (i = 0; i < self.options.length; i++) {
        var title = getTitle(i);
        if (title.indexOf(self.query) == 0) {
          lock(i);
          return;
        };
      };

      for (i = 0; i < self.options.length; i++) {
        var title = getTitle(i);
        if (title.indexOf(self.query) > -1) {
          lock(i);
          break;
        };
      };
    },

    scrollToView: function () {
      var self = this;
      if (self.focusIndex >= self.cutOff) {
        var $focusItem = self.$items.eq(self.focusIndex),
          scroll = ($focusItem.outerHeight() * (self.focusIndex + 1)) - self.maxHeight;

        self.$dropDown.scrollTop(scroll);
      };
    },

    notInViewport: function (scrollTop) {
      var self = this,
        range = {
          min: scrollTop,
          max: scrollTop + (window.innerHeight || document.documentElement.clientHeight)
        },
        menuBottom = self.$dropDown.offset().top + self.maxHeight;

      if (menuBottom >= range.min && menuBottom <= range.max) {
        return 0;
      } else {
        return (menuBottom - range.max) + 5;
      };
    },

    destroy: function () {
      var self = this;
      self.unbindHandlers();
      self.$select.unwrap().siblings().remove();
      self.$select.unwrap();
      delete Object.getPrototypeOf(self).instances[self.$select[0].id];
    },

    disable: function () {
      var self = this;
      self.disabled = true;
      self.$container.addClass('disabled');
      self.$select.attr('disabled', true);
      if (!self.down) self.close();
    },

    enable: function () {
      var self = this;
      self.disabled = false;
      self.$container.removeClass('disabled');
      self.$select.attr('disabled', false);
    }
  };

  var instantiate = function (domNode, settings) {
      domNode.id = !domNode.id ? 'EasyDropDown' + rand() : domNode.id;
      var instance = new EasyDropDown();
      if (!instance.instances[domNode.id]) {
        instance.instances[domNode.id] = instance;
        instance.init(domNode, settings);
      };
    },
    rand = function () {
      return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
    };

  $.fn.easyDropDown = function () {
    var args = arguments,
      dataReturn = [],
      eachReturn;

    eachReturn = this.each(function () {
      if (args && typeof args[0] === 'string') {
        var data = EasyDropDown.prototype.instances[this.id][args[0]](args[1], args[2]);
        if (data) dataReturn.push(data);
      } else {
        instantiate(this, args[0]);
      };
    });

    if (dataReturn.length) {
      return dataReturn.length > 1 ? dataReturn : dataReturn[0];
    } else {
      return eachReturn;
    };
  };

  $(function () {
    if (typeof Object.getPrototypeOf !== 'function') {
      if (typeof 'test'.__proto__ === 'object') {
        Object.getPrototypeOf = function (object) {
          return object.__proto__;
        };
      } else {
        Object.getPrototypeOf = function (object) {
          return object.constructor.prototype;
        };
      };
    };

    $('select.dropdowner').each(function () {
      var json = $(this).attr('data-settings');
      settings = json ? $.parseJSON(json) : {};
      instantiate(this, settings);
    });
  });
})(jQuery);

// Searcher Code = "2000"
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

/*
Please consider that the JS part isn't production ready at all, I just code it to show the concept of merging filters and titles together !
*/
$(document).ready(function () {
  $('.filterable .btn-filter').click(function () {
    var $panel = $(this).parents('.filterable'),
      $filters = $panel.find('.filters input'),
      $tbody = $panel.find('.table tbody');
    if ($filters.prop('disabled') == true) {
      $filters.prop('disabled', false);
      $filters.first().focus();
    } else {
      $filters.val('').prop('disabled', true);
      $tbody.find('.no-result').remove();
      $tbody.find('tr').show();
    }
  });

  $('.filterable .filters input').keyup(function (e) {
    /* Ignore tab key */
    var code = e.keyCode || e.which;
    if (code == '9') return;
    /* Useful DOM data and selectors */
    var $input = $(this),
      inputContent = $input.val().toLowerCase(),
      $panel = $input.parents('.filterable'),
      column = $panel.find('.filters th').index($input.parents('th')),
      $table = $panel.find('.table'),
      $rows = $table.find('tbody tr');
    /* Dirtiest filter function ever ;) */
    var $filteredRows = $rows.filter(function () {
      var value = $(this).find('td').eq(column).text().toLowerCase();
      return value.indexOf(inputContent) === -1;
    });
    /* Clean previous no-result if exist */
    $table.find('tbody .no-result').remove();
    /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
    $rows.show();
    $filteredRows.hide();
    /* Prepend no-result row if all rows are filtered */
    if ($filteredRows.length === $rows.length) {
      $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
    }
  });
});
var dropdownSelectors = $('.dropdown, .dropup');

// Custom function to read dropdown data
// =========================
function dropdownEffectData(target) {
  // @todo - page level global?
  var effectInDefault = null,
    effectOutDefault = null;
  var dropdown = $(target),
    dropdownMenu = $('.dropdown-menu', target);
  var parentUl = dropdown.parents('ul.nav');

  // If parent is ul.nav allow global effect settings
  if (parentUl.size() > 0) {
    effectInDefault = parentUl.data('dropdown-in') || null;
    effectOutDefault = parentUl.data('dropdown-out') || null;
  }

  return {
    target: target,
    dropdown: dropdown,
    dropdownMenu: dropdownMenu,
    effectIn: dropdownMenu.data('dropdown-in') || effectInDefault,
    effectOut: dropdownMenu.data('dropdown-out') || effectOutDefault,
  };
}

// Custom function to start effect (in or out)
// =========================
function dropdownEffectStart(data, effectToStart) {
  if (effectToStart) {
    data.dropdown.addClass('dropdown-animating');
    data.dropdownMenu.addClass('animated');
    data.dropdownMenu.addClass(effectToStart);
  }
}

// Custom function to read when animation is over
// =========================
function dropdownEffectEnd(data, callbackFunc) {
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  data.dropdown.one(animationEnd, function () {
    data.dropdown.removeClass('dropdown-animating');
    data.dropdownMenu.removeClass('animated');
    data.dropdownMenu.removeClass(data.effectIn);
    data.dropdownMenu.removeClass(data.effectOut);

    // Custom callback option, used to remove open class in out effect
    if (typeof callbackFunc == 'function') {
      callbackFunc();
    }
  });
}

// Bootstrap API hooks
// =========================
dropdownSelectors.on({
  "show.bs.dropdown": function () {
    // On show, start in effect
    var dropdown = dropdownEffectData(this);
    dropdownEffectStart(dropdown, dropdown.effectIn);
  },
  "shown.bs.dropdown": function () {
    // On shown, remove in effect once complete
    var dropdown = dropdownEffectData(this);
    if (dropdown.effectIn && dropdown.effectOut) {
      dropdownEffectEnd(dropdown, function () {});
    }
  },
  "hide.bs.dropdown": function (e) {
    // On hide, start out effect
    var dropdown = dropdownEffectData(this);
    if (dropdown.effectOut) {
      e.preventDefault();
      dropdownEffectStart(dropdown, dropdown.effectOut);
      dropdownEffectEnd(dropdown, function () {
        dropdown.dropdown.removeClass('open');
      });
    }
  },
});