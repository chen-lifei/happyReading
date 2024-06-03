export function validatePhone(value: string): boolean {
    const reg = /^[1][3-9][0-9]{9}$/;
    return reg.test(value);
}

export function validateEmail(value: string): boolean {
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    return reg.test(value);
}

export function validURL(url: string): boolean {
    const reg = /^(http|https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

export function isString(value: string | object): boolean {
    if (typeof value === 'string' || value instanceof String) return true;
    return false;
}

export function isArray(value: string): boolean {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(value) === '[object Array]';
    }
    return Array.isArray(value);
}
