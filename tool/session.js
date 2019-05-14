var crypto = require('crypto');

const sessionIds = [];
const clearTimeoutList = {};

function generateId(id = '') {
  var hash = crypto.createHash('md5').update(id + Date.now());
  return hash.digest('hex');
}

function addSessionId(id) {
  sessionIds.push(id);
  clearTimeoutList[id] = setTimeout(() => {
    const index = sessionIds.indexOf(id);
    if (index >= 0) {
      sessionIds.splice(index, 1);
    }
  }, 30 * 60 * 1000);
}

function deleteSessionId(id) {
  if (clearTimeoutList[id]) {
    clearInterval(clearTimeoutList[id]);
    const index = sessionIds.indexOf(id);
    if (index >= 0) {
      sessionIds.splice(index, 1);
    }
  }
}

function flushSessionId(id) {
  if (clearTimeoutList[id]) {
    clearInterval(clearTimeoutList[id]);
    const index = sessionIds.indexOf(id);
    if (index >= 0) {
      sessionIds.splice(index, 1);
    }
  }
  var newId = generateId();
  addSessionId(newId);
  return newId;
}

function validateSessionId(id) {
  const index = sessionIds.indexOf(id);
  return index >= 0;
}

module.exports = {
  generateId,
  addSessionId,
  deleteSessionId,
  flushSessionId,
  validateSessionId
}