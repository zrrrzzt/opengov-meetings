module.exports = date => date.toString().length === 1 ? `0${date.toString()}` : date.toString()
