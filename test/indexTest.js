// require dotenv for environment variables
require('dotenv').config()
// Import requirement packages
require('chromedriver');
// Importing chai - assertion library
const { assert } = require('chai');
// Selecting from selenium webdriver
const {Builder, Key, By, until} = require('selenium-webdriver');


describe('Login to Fronter', function () {
    // make timeout here for driver to load
    // or add timeout to "scripts" : { "test": "mocha --timeout 10000" }
    this.timeout(30000)
    
    // assigning chromedriver
    let driver;
    beforeEach(async function() {
        driver = await new Builder().forBrowser('chrome').build()
    })

    // quitting chromedriver
    afterEach(async function() {
        driver.quit();
    })
    
    it('Login to Fronter', async function() {
        // open KEA Fronter page
        await driver.get('https://kea-fronter.itslearning.com/');
        // set window size
        await driver.manage().window().setRect(1440, 829)
        // click on "Log på med UNI-Login" button
        await driver.findElement(By.linkText("Log på med UNI-Login")).click();
        // writing username
        await driver.findElement(By.id("username")).sendKeys(process.env.FRONTER_NAME);
        // moving to password site by pressing button
        await driver.findElement(By.className("button-primary")).click();
        // writing password
        await driver.findElement(By.name("password")).sendKeys(process.env.FRONTER_PASSWORD);
        // moving to account site by pressing button
        await driver.findElement(By.className("button-primary")).click();

        // defining element by specifying id
        let personalMenu = By.id("personal-menu-link");
        // Creates a condition that will loop until an element is found with the given locator.
        await driver.wait(until.elementLocated(personalMenu));
        // selecting element
        personalMenu = await driver.findElement(personalMenu);
        // waiting until the element appears (is visible) and then doing click event
        await driver.wait(until.elementIsVisible(personalMenu), 5000).click();

        // defining element by specifying id
        let personalMenuButton = By.className("l-personal-menu-dd-header--button");
        // Creates a condition that will loop until an element is found with the given locator.
        await driver.wait(until.elementLocated(personalMenuButton));
        // selecting element
        personalMenuButton = await driver.findElement(personalMenuButton);
        // waiting until the element appears (is visible) and then doing click event
        await driver.wait(until.elementIsVisible(personalMenuButton), 5000).click();
        
        // finding iframe by specifying id
        const frame = await driver.findElement(By.id('ctl00_ContentAreaIframe'));
        // wait until it is able to switch to the iframe
        await driver.wait(until.ableToSwitchToFrame(frame));

        // inside iframe, get value attribute (email address)
        await driver.findElement(By.id("ctl00_ContentPlaceHolder_EmailAddress")).getAttribute("value").then(function(emailAddress) {
            // compare found email address with username as the prove that user is logged in
            assert.equal(emailAddress, process.env.FRONTER_NAME + '@stud.kea.dk');
        });
    });
})