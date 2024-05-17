function parseHTML(html) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || '';
}

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return `${str.substring(0, maxLength)}...`;
  }
  return str;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const difference = now - date;
  const secondsDifference = Math.floor(difference / 1000);
  if (secondsDifference < 60) {
    return 'Baru saja';
  } if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} menit lalu`;
  } if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours} jam lalu`;
  }
  const days = Math.floor(secondsDifference / 86400);
  if (days === 0) {
    return 'Hari ini';
  } if (days === 1) {
    return 'Kemarin';
  }
  return `${days} hari lalu`;
}

export {
  parseHTML,
  truncateString,
  formatDate,
};
