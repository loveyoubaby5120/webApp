import * as React from 'react';

var Highlighter : any = React.createClass({displayName: 'Highlighter',
  count: 0,

  // propTypes: {
  //   searchStrings: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  //   searchStringsLower: React.PropTypes.arrayOf(React.PropTypes.string),
  //   caseSensitive: React.PropTypes.bool,
  //   matchColors: React.PropTypes.arrayOf(React.PropTypes.string),
  // },

  getDefaultProps: function() {
    return {
      caseSensitive: false,
      matchColors: ['LightSalmon','LightGreen','LightBlue','Tan','LightPink','Gold','Silver'],
    };
  },

  render: function() {
    // this.props.searchStringsLower = [for (str of this.props.searchStrings) str.toLowerCase()];
    return React.DOM.span((React as any).__spread({}, this.props), this.renderElement(this.props.children));
  },

  /**
   * A wrapper to the highlight method to determine when the highlighting
   * process should occur.
   *
   * @param  {string} subject
   *   The body of text that will be searched for highlighted words.
   *
   * @return {Array}
   *   An array of ReactElements
   */
  renderElement: function(subject : any) {
    if (this.isScalar() && this.hasValidSearchStrings()) {
      var search = this.getSearch();
      return this.highlightChildren(subject, search);
    }

    return this.props.children;
  },

  /**
   * Determine if props are valid types for processing.
   *
   * @return {Boolean}
   */
  isScalar: function() {
    return (/string|number|boolean/).test(typeof this.props.children);
  },

  /**
   * Determine if required search prop is defined and valid.
   *
   * @return {Boolean}
   */
  hasValidSearchStrings: function() {
    return (typeof this.props.searchStrings !== 'undefined') && this.props.searchStrings.length > 0 && this.props.searchStrings.length <= this.props.matchColors.length;
  },

  /**
   * Get the search prop, but always in the form of a regular expression. Use
   * this as a proxy to this.props.search for consistency.
   *
   * @return {RegExp} eg. /apple|banana|orange/i
   */
  getSearch: function() {
    var flag = '';
    if (!this.props.caseSensitive) {
      flag = 'i';
    };

    return RegExp(this.props.searchStrings.join('|'), flag);
  },

  /**
   * Get the indexes of the first and last characters of the matched string.
   *
   * @param  {string} subject
   *   The string to search against.
   *
   * @param  {RegExp} search
   *   The regex search query.
   *
   * @return {Object}
   *   An object consisting of "first" and "last" properties representing the
   *   indexes of the first and last characters of a matching string.
   *   "color" property represents it display color name.
   */
  getMatchBoundary: function(subject : any, search : any) {
    var matches = search.exec(subject);
    if (matches) {
      return {
        first: matches.index,
        last: matches.index + matches[0].length,
        color: this.props.matchColors[this.props.searchStringsLower.indexOf(matches[0].toLowerCase())],
      };
    }
  },

  /**
   * Determines which strings of text should be highlighted or not.
   *
   * @param  {string} subject
   *   The body of text that will be searched for highlighted words.
   *
   * @return {Array}
   *   An array of ReactElements
   */
  highlightChildren: function(subject : any, search : any) {
    var children : any = [];

    if (!search.test(subject)) {
      children.push(this.renderPlain(subject));
      return children;
    }

    var boundary = this.getMatchBoundary(subject, search);

    // Capture the string that leads up to a match...
    var nonMatch = subject.slice(0, boundary.first);
    if (nonMatch) {
      children.push(this.renderPlain(nonMatch));
    }

    // Now, capture the matching string...
    var match = subject.slice(boundary.first, boundary.last);
    if (match) {
      children.push(this.renderHighlight(match, boundary.color));
    }

    // And if there's anything left over, recursively run this method again.
    var remaining = subject.slice(boundary.last);
    if (remaining) {
      children = Array.prototype.concat(children, this.highlightChildren(remaining, search));
    }

    return children;
  },

  /**
   * Responsible for rending a non-highlighted element.
   *
   * @param  {string} string
   *   A string value to wrap an element around.
   *
   * @return {ReactElement}
   */
  renderPlain: function(s : string) {
    this.count++;
    return React.DOM.span({key: this.count}, s);
  },

  /**
   * Responsible for rending a highlighted element.
   *
   * @param  {string} string
   *   A string value to wrap an element around.
   *
   * @return {ReactElement}
   */
  renderHighlight: function(s : string, color : any) {
    this.count++;
    return React.DOM.mark({key: this.count, style: {'background-color':color}}, s);
  },
});

export { Highlighter };
