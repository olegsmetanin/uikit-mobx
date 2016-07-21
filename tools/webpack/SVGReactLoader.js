'use strict';

var loaderUtils = require('loader-utils');

module.exports = function (source) {
  var query = loaderUtils.parseQuery(this.query),
    className = (query.class || 'svgicon'),
    svgParamsAndContent = (source.match(/<svg([^>]*)>([\s\S]*)<\/svg>/) || []),
    svgParamsString = svgParamsAndContent[1],
    svgContent = svgParamsAndContent[2],
    svgSanitizedContent = svgContent.replace(/>\s+</g, '><').replace(/(\r?\n|\r)[\s]*/g, ''),
    svgParams = {
      viewBox: (svgParamsString.match(/viewBox=['"]([^'"]*)['"]/) || [])[1],
      className: className
    };

  var es6code = 'import React from \'react\';' +
    'export default class Icon extends React.Component {' +
    '  render() {' +
    '    let params = ' + JSON.stringify(svgParams) + ';' +
    '    return (' +
    '<svg {...params} {...this.props}>' +
    svgSanitizedContent +
    '</svg>' +
    '    );' +
    '  }' +
    '}';

  return es6code;
};
