const {calculate_subscription} = require('./index.js');

console.log('Annual Subscription with date less than 15 10/06/2018')
console.log(calculate_subscription("10/06/2018", 12, 400, 3650))

console.log('Annual Subscription with date greater than 15 20/06/2018')
console.log(calculate_subscription("20/06/2018", 12, 400, 3650))

console.log('Annual Subscription with date equal to 15 15/06/2018')
console.log(calculate_subscription("15/06/2018", 12, 400, 3650))

console.log('Monthly Subscription with date less than 15 10/06/2018')
console.log(calculate_subscription("10/06/2018", 4, 400, 3650))

console.log('Monthly Subscription with date greater than 15 20/06/2018')
console.log(calculate_subscription("20/26/2018", 8, 400, 3650));

console.log('Monthly Subscription with date equal to 15 15/06/2018')
console.log(calculate_subscription("15/06/2018", 11, 400, 3650))

// calculate_subscription("19/06/2018", 3, 1000, 8000)
// Returns: ("15/09/2018", 2866.58)