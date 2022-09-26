export function validatePhone(value) {
    const reg = /^[1][3-9][0-9]{9}$/;
    return reg.test(value);
}

export function validateEmail(value) {
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    return reg.test(value);
}
