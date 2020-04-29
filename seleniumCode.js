// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('fronter test', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('fronter test', async function() {
    await driver.get("https://kea-fronter.itslearning.com/")
    await driver.manage().window().setRect(1440, 829)
    await driver.findElement(By.linkText("Sign in with UNI-Login")).click()
    await driver.findElement(By.id("username")).sendKeys("mich49z4")
    await driver.findElement(By.css(".button")).click()
    await driver.findElement(By.css(".button-primary")).click()
  })
})