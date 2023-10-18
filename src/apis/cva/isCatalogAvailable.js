function isCatalogAvailable() {
  const options = {
      timeZone: 'America/Mexico_City',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const timeComponents = formatter.format(new Date()).split(':');
  
  const hour = parseInt(timeComponents[0], 10);
  const minute = parseInt(timeComponents[1], 10);

  if (hour > 9 && hour < 19) {
      return false;
  } else if (hour === 9 && minute >= 0) {
      return false;
  } else if (hour === 19 && minute === 0) {
      return false;
  }
  return true;
}

module.exports = isCatalogAvailable;