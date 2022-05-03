export class Utils {
  static mapDropdownValues(options) {
    let result = null;
    if (options.name === 'currency') {
      result= options.values.map(currency => {
        return {
          code: currency.code,
          text: currency.text
        }
      });
    } else if (options.name === 'customertype'){
      result= options.values.map(customertype => {
        return customertype.type
      });
    }
    return result;

  }
}
