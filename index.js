const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--proxy-server=103.6.128.6:3128'],
    });
    const page = await browser.newPage();

    let selector;
    do {
        console.log('Start!')
        await page.goto('http://www.urbtix.hk/');
        selector = await page.$('#hotRemainTime1');
    } while (selector);
    
    await page.goto('https://ticket.urbtix.hk/internet/zh_TW/eventDetail/37827');
    await page.$$eval('.event-buy-status-col img', divs => divs[0].click());

    await page.waitForNavigation();
    await page.$$eval('#ticket-price-tbl .ticket-pricezone-select-col input.pricezone-radio-input', divs => divs[2].click());
    await page.select('#ticket-type-tbl select', '4');
    await page.click('#express-purchase-btn');

    await page.waitForNavigation();
    // await page.click('.ticket-review-confirm-btn');

    await page.waitForNavigation();
    await page.click('#checkout-btn');

    await page.waitForNavigation();
    await page.type('input[name="lastname"]', '');
    await page.type('input[name="firstname"]', '');
    await page.type('input[name="deliveryInformation.email"]', '');
    await page.select('select#delivery-method-select', 'TDM');
    await page.select('select#payment-type-select', '220');  // 220: VISA, 221: Mastercard
    await page.type('input[name="creditCard.cardNumber"]', '');
    await page.type('input[name="creditCard.securityCode"]', '');
    await page.select('select#payment-expiry-month-select', '9'); // 09 -> 9
    await page.select('select#payment-expiry-year-select', '');
    await page.waitFor(1000);
    await page.click('#button-confirm');

    await page.waitForNavigation();
    await page.click('input#checkbox-tnc');

    console.log('Done');
})();