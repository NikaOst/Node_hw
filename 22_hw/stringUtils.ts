// `capitalize`, которая делает первую букву строки заглавной.
// `reverseString`, которая переворачивает строку задом наперед.

export function capitalize(str: string): string {
  let f_letter: string = str.charAt(0);
  let rest: string = str.slice(1);
  f_letter = f_letter.toUpperCase();
  return f_letter + rest;
}

export function reverseString(str: string): string {
  let r_str: string = '';
  for (let i = str.length - 1; i >= 0; i--) {
    r_str = r_str + str[i];
  }
  return r_str;
}
