const arrayTerms = process.env.TERMS.split(',');

function checkTextTerms(text) {
    const isBlacklisted = arrayTerms.some(item => text.text.includes(item))
    return isBlacklisted;
}

module.exports = checkTextTerms