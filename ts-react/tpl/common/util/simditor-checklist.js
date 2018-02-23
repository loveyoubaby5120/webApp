var Simditor = require('simditor');
var $ = require('jquery');

var ChecklistButton,
    extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

ChecklistButton = (function (superClass) {
    extend(ChecklistButton, superClass);

    ChecklistButton.prototype.type = 'ul.simditor-checklist';

    ChecklistButton.prototype.name = 'checklist';

    ChecklistButton.i18n = {
        'zh-CN': {
            checklist: '待办任务',
        },
        'en-US': {
            checklist: 'Todo item',
        },
    };

    ChecklistButton.prototype.icon = 'checklist';

    ChecklistButton.prototype.htmlTag = 'li';

    ChecklistButton.prototype.disableTag = 'pre, table';

    function ChecklistButton() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        ChecklistButton.__super__.constructor.apply(this, args);

        $.extend(this.editor.formatter._allowedAttributes, {
            li: ['data-checkitem', 'checked'],
        });
    }

    ChecklistButton.prototype._init = function () {
        ChecklistButton.__super__._init.call(this);
        this.editor.on('undecorate', (function (_this) {
            return function (e, $el) {
                return $el.find('li.simditor-checkitem').each(function (i, li) {
                    return _this._undecorate($(li));
                });
            };
        })(this));
        this.editor.on('decorate', (function (_this) {
            return function (e, $el) {
                return $el.find('li[data-checkitem]').each(function (i, node) {
                    return _this._decorate($(node));
                });
            };
        })(this));
        this.editor.body.on('click', 'li.simditor-checkitem', (function (_this) {
            return function (e) {
                var $node, range;
                e.preventDefault();
                e.stopPropagation();
                $node = $(e.currentTarget);
                range = document.createRange();
                _this.editor.selection.save();
                range.setStart($node[0], 0);
                range.setEnd($node[0], _this.editor.util.getNodeLength($node[0]));
                _this.editor.selection.range(range);
                if ($node.hasClass('simditor-checkitem-checked')) {
                    $node.removeClass('simditor-checkitem-checked');
                } else {
                    $node.addClass('simditor-checkitem-checked', 1);
                }
                _this.editor.selection.restore();
                return _this.editor.trigger('valuechanged');
            };
        })(this));
    };

    ChecklistButton.prototype._status = function () {
        var $node;
        ChecklistButton.__super__._status.call(this);
        $node = this.editor.selection.range().collapsed ?
            this.editor.selection.startNodes().filter('li').first() :
            this.editor.selection.blockNodes();
        if ($node.is('.simditor-checkitem')) {
            this.editor.toolbar.findButton('checklist').setActive(true);
            return;
        }
        this.editor.toolbar.findButton('checklist').setActive(false);
    };

    ChecklistButton.prototype.command = function () {
        var $list, $nodes;
        if (!this.editor.selection.range()) {
            return;
        }
        $nodes = this.editor.selection.range().collapsed ?
            this.editor.selection.startNodes().filter('li').first() :
            this.editor.selection.blockNodes();
        if ($nodes.length === 0) {
            $nodes = this.editor.selection.blockNodes();
        }

        this.editor.selection.save();
        $list = null;
        if (!$nodes.length) {
            return;
        }
        $nodes.each((function (_this) {
            return function (i, node) {
                var $node;
                $node = $(node);
                if ($node.is('blockquote') || $node.is(_this.disableTag) || !$.contains(document, node)) {
                    return;
                }
                if ($node.is('li')) {
                    if ($node.hasClass('simditor-checkitem')) {
                        $node.removeClass('simditor-checkitem');
                    } else {
                        $node.addClass('simditor-checkitem');
                    }
                }
                if ($node.is('p')) {
                    $list = $('<ul><li class="simditor-checkitem"></li></ul>');
                    $list.find('li').append($node.html() || _this.editor.util.phBr);
                    $list.replaceAll($node);
                }
            };
        })(this));
        this.editor.selection.restore();
        this.editor.trigger('valuechanged');
        return;
    };

    ChecklistButton.prototype._undecorate = function ($li) {
        let checked = $li.hasClass('simditor-checkitem-checked');
        $li.attr('data-checkitem', checked ? 'checked' : 'unchecked');
        $li.removeClass('simditor-checkitem-checked');
        $li.removeClass('simditor-checkitem');
    };

    ChecklistButton.prototype._decorate = function ($li) {
        let checked = $li.attr('data-checkitem') === 'checked';
        $li.addClass('simditor-checkitem');
        if (checked) {
            $li.addClass('simditor-checkitem-checked');
        }
    };

    return ChecklistButton;

})(Simditor.Button);

Simditor.Toolbar.addButton(ChecklistButton);
