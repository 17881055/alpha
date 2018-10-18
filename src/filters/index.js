function _formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function formatDate(time, format = 'yyyy/MM/dd hh:mm') {
  if (!time) {
    return '';
  }

  if (time === '长期') {
    return time;
  }

  const date = new Date(time);
  return _formatDate(date, format);
}

export function formatDateFull(time, format = 'yyyy/MM/dd hh:mm:ss') {
  if (!time) {
    return '';
  }

  if (time === '长期') {
    return time;
  }

  const date = new Date(time);
  return _formatDate(date, format);
}

// 不要时分秒
export function formatDateWithoutTime(time, format = 'yyyy/MM/dd') {
  if (!time) {
    return '';
  }

  if (time === '长期') {
    return time;
  }

  const date = new Date(time);
  return _formatDate(date, format);
}

export function formatDateTimestamp(time) {
  if (!time) {
    return '';
  }
  const date = new Date(time);
  return date.getTime();
}

export function currency(value, prefix) {
  if (value == null) {
    return '--';
  }
  let val = (value / 1).toFixed(2).replace(',', '.');
  val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return prefix ? `${prefix} ${val}` : val;
}

export function percentage(value, decimals) {
  if (value == null) {
    return '--';
  }
  if (!decimals) decimals = 2;

  value = value * 100;
  return (
    Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + '%'
  );
}

export function truncate(str, length, unfold) {
  const postfix = '...';
  let ret = '';
  if (unfold) {
    return str;
  }
  if (str) {
    const len = str.length;
    for (let i = 0; i < len; i++) {
      let charCode = str.charCodeAt(i);
      ret += str.charAt(i);

      length -= 1;
      if (charCode > 255) {
        length -= 1;
      }
      if (length <= 3) {
        ret += postfix;
        break;
      }
    }

    return ret;
  } else {
    return '';
  }
}

export function displayNull(value) {
  if (value == null) {
    return '--';
  }
  return value;
}
