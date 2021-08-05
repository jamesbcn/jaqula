'use strict';

var _ = require('lodash');

function Scope() {
    this.$$watchers = [];
}

function initWatchVal() { }

Scope.prototype.$watch = function (watchFn, listenerFn) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function() { },
        last: initWatchVal
    };
    this.$$watchers.push(watcher);
};

Scope.prototype.$digest = function() {
    var dirty;
    do {
    dirty = this.$$digestOnce();
    } while (dirty);
    };

Scope.prototype.$$digestOnce = function () {

    var self = this;
    var newValue, oldValue, dirty;
    _.forEach(this.$$watchers, function (watcher) {
        newValue = watcher.watchFn(self);
        oldValue = watcher.last; // undefined
        console.log(newValue, oldValue);
        if (newValue !== oldValue) {
            console.log("values not the same!");
            watcher.last = newValue;
            watcher.listenerFn(newValue, (oldValue === initWatchVal ? newValue : oldValue), self);
            dirty = true;
        }
        else {
            console.log("newValue === oldValue!");
        }
    });
    return dirty;
};

module.exports = Scope;