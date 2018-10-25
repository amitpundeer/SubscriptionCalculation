let moment = require('moment');
let CONSTANT = require('./constant.js');

// Description: Function calculates the per day cost for users with monthly subscription.
// Returns: Surplus Amount for the extra days for the Month upto 2 decimal places.
function getPerDayCostForMonthUsers(month_cost, no_of_days)
{
    let amount = 0.0;
    amount = (month_cost/CONSTANT.DAYS_IN_MONTH) * no_of_days;
    return amount.toFixed(CONSTANT.UPTO_DECIMAL_PLACE) * 1; // 2 Decimal Place
}

// Description: Function calculates the per day cost for users with Annualy subscription.
// Returns: Surplus Amount for the extra days for the Annum upto 2 Decimal places.
function getPerDayCostForAnnualUsers(annual_cost, no_of_days)
{
    let amount = 0.0;
    amount = (annual_cost/CONSTANT.DAYS_IN_YEAR) * no_of_days;
    return amount.toFixed(CONSTANT.UPTO_DECIMAL_PLACE) * 1; // 2 Decimal Place
}

// Description: Function calculates the MonthlyCost and NewExpirationDate for the Monthly user. 
// Returns: The MonthlyCost and NewExpirationDate for the Monthly user.
function getMonthlySubscriptionAmount(expiry_date, monthly_cost, no_of_months)
{
    let monthly_subscription_amount = 0.0;
    let new_expiry_date = moment(expiry_date, CONSTANT.DATE_FORMAT);
    
    monthly_subscription_amount += monthly_cost * no_of_months;
    
    if(new_expiry_date.date() > CONSTANT.MONTH_BEG && new_expiry_date.date() < CONSTANT.MONTH_MID) {
        let extra_days = CONSTANT.MONTH_MID - new_expiry_date.date();
        monthly_subscription_amount -= getPerDayCostForMonthUsers(monthly_cost,
             extra_days);
        new_expiry_date.date(1);
    }
 
    if(new_expiry_date.date() > CONSTANT.MONTH_MID) {
       
        let extra_days =  new_expiry_date.date() - CONSTANT.MONTH_MID;
        
        monthly_subscription_amount -= getPerDayCostForMonthUsers(monthly_cost,
             extra_days);
        new_expiry_date.date(CONSTANT.MONTH_MID);
    }
    
    new_expiry_date.add(no_of_months, 'M');
    
    return {
        'isError': 0,
        'subscription_amount': monthly_subscription_amount, 
        'new_expiry_date': new_expiry_date.format(CONSTANT.DATE_FORMAT)
    }
}

// Description: Function calculates the AnnualyCost and NewExpirationDate for the Annualy user. 
// Returns: The AnnualyCost and NewExpirationDate for the Annualy user.
function getAnnuallySubscriptionAmount(expiry_date, annual_cost)
{
    let annual_subscription_amount = 0.0;
    let new_expiry_date = moment(expiry_date, CONSTANT.DATE_FORMAT);
    annual_subscription_amount += annual_cost;
    
    if(new_expiry_date.date() > CONSTANT.MONTH_BEG && new_expiry_date.date() < CONSTANT.MONTH_MID) {
        let extra_days = CONSTANT.MONTH_MID - new_expiry_date.date();
        annual_subscription_amount += getPerDayCostForAnnualUsers(annual_cost,
             extra_days);
        new_expiry_date.date(CONSTANT.MONTH_MID);
    }
    else if(new_expiry_date.date() > CONSTANT.MONTH_MID) {
        let extra_days = new_expiry_date.daysInMonth() - new_expiry_date.date() + 1;
        annual_subscription_amount += getPerDayCostForAnnualUsers(annual_cost,
             extra_days);
        new_expiry_date.date(1);
        new_expiry_date.add(1, 'M');
    }
    new_expiry_date.add(1, 'y');

    return {
        'isError': 0,
        'subscription_amount': annual_subscription_amount, 
        'new_expiry_date': new_expiry_date.format(CONSTANT.DATE_FORMAT)
    }   
}

// Function: Calculate the Subscription for Users with Monthly and Yearly Subscription Holders
// Return: Object with new SubscriptionAmount, NewExpiryDate.
function calculate_subscription(expiry_date, months_to_buy, monthly_cost, annualy_cost)
{
    let date = moment(expiry_date,CONSTANT.DATE_FORMAT);
    if(!date.isValid() || months_to_buy > 12)
    {
        return {
            'isError': 1,//Signifes whether the object contains an Error or not.
            'ErrorMessage':'date is invalid and months_to_buy should be less than equal to 12' 
        }
    }

    let res;
    if(months_to_buy === 12)
    {
        return getAnnuallySubscriptionAmount(expiry_date, annualy_cost);
    } else {
        return getMonthlySubscriptionAmount(expiry_date, monthly_cost, months_to_buy);
    }
}

module.exports = {
    calculate_subscription
}