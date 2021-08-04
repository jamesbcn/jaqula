'use strict';

var Scope = require('../src/scope');

describe('Scope', function () {
    it('can be constructed and used as an object', function () {
        var scope = new Scope();
        scope.aProperty = 1;
        expect(scope.aProperty).toBe(1);
    });

    describe('digest', function () {
        var scope;
        beforeEach(function () {
            scope = new Scope();
            scope.noise = "SEX";

        });
        it('calls the listener function of a watch on first $digest', function () {

            spyOn(console, 'log').and.callThrough();

            //scope.someValue = 'a';
            scope.counter = 0;
            // create a new watcher which is added to watchers
            scope.$watch(
                function (scope) { return scope.someValue; },
                function (newValue, oldValue, scope) { scope.counter++; }
            );
            expect(scope.counter).toBe(0);

            scope.$digest(); // iternate over watchers calling their watch functions (passing itself as an argument) and listen functions if there is a change
            expect(scope.counter).toBe(1);
            
            scope.$digest();
            expect(scope.counter).toBe(1);

            scope.someValue = 'b';
            expect(scope.counter).toBe(1);
            
            scope.$digest();
            expect(scope.counter).toBe(2);
        });
    });
});