const _ = require('lodash');

function joinWords(wordList) {
  if (!_.isArray(wordList) || wordList.length === 0) return '';
  return _.join(wordList, ', ');
}

function joinTypedWords(wordList) {
  if (!_.isArray(wordList) || wordList.length === 0) return '';
  const typedWords = _.map(wordList, word => {
    if (_.isString(word)) {
      return `'${word}'`;
    }
    return word;
  });
  return joinWords(typedWords);
}

module.exports = {
  joinWords,
  joinTypedWords,
};
