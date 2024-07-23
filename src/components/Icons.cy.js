import { __assign } from 'tslib';
import React from 'react';
import { getIcon } from './Icons';
var props = {
  theme: 'light',
  type: 'default',
  isLoading: false
};
describe('Icons', function () {
  it('handle function', function () {
    var C = getIcon(
      __assign(__assign({}, props), {
        icon: function () {
          return React.createElement('div', null, 'icon');
        }
      })
    );
    cy.mount(C);
    cy.findByText('icon').should('exist');
  });
  it('handle react element', function () {
    var C = getIcon(
      __assign(__assign({}, props), {
        icon: React.createElement('div', null, 'icon')
      })
    );
    cy.mount(C);
    cy.findByText('icon').should('exist');
  });
  it('handle loader', function () {
    var C = getIcon(__assign(__assign({}, props), { isLoading: true }));
    cy.mount(C);
    cy.get('[data-cy-root]').should('have.length', 1);
  });
  it('handle built-in icons', function () {
    for (
      var _i = 0, _a = ['info', 'warning', 'success', 'error', 'spinner'];
      _i < _a.length;
      _i++
    ) {
      var t = _a[_i];
      var C = getIcon(__assign(__assign({}, props), { type: t }));
      cy.mount(C);
      cy.get('[data-cy-root]').should('have.length', 1);
    }
  });
});
//# sourceMappingURL=Icons.cy.js.map
