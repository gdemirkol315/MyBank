export class Utils {
  static mapDropdownValues(options) {
    let result = null;
    if (Object.keys(options.values[0])[0]==='code' || Object.keys(options.values[0])[1]==='code') {
      result = options.values.map(val => {
        return {
          code: val.code,
          text: val.text
        }
      });
    } else {
      result = options.values.map(val => {
        return {
          code: val.text,
          text: val.text
        }
      });
    }
    return result;

  }
}
