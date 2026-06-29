// `capitalize`, которая делает первую букву строки заглавной.
// `reverseString`, которая переворачивает строку задом наперед.
export function capitalize(str) {
    let f_letter = str.charAt(0);
    let rest = str.slice(1);
    f_letter = f_letter.toUpperCase();
    return f_letter + rest;
}
export function reverseString(str) {
    let r_str = '';
    for (let i = str.length - 1; i >= 0; i--) {
        r_str = r_str + str[i];
    }
    return r_str;
}
