/*
 Webpack loader for object assembling thru shallow copy of original object at specifiled path.
 Useful for copy state in Redux reducers.
 Loader must be started before typescript loader.
 let newState = copyState<S>(state, [state.ui]); -> this loader ->
 let newState = copyState<S>(state, [state.ui], ['state.ui']);
 */

'use strict';

module.exports = function (content) {
  /* jshint ignore:start */

  var found, copyStateRegExp = /copyState<\w+[\w\d]*>\(\w+[\w\d]*\s*, \[([^\]]*)\]\);?/g;

  while (found = copyStateRegExp.exec(content)) {
    var args = found[1].split(',').map(function (arg) {
        return "'" + arg.trim() + "'";
      }).join(', '),
      subs = found[0].replace(found[1], found[1] + '], [' + args);
    content = content.replace(found[0], subs);
  }
  /* jshint ignore:end */

  return content;
};
