const puppeteer = require('puppeteer')
const getOptions = require('./get-options')
// import puppeteer from 'puppeteer-extra'
// import puppeteerExtra from 'puppeteer-extra-plugin-stealth'
// const stealthPlugin = StealthPlugin();
// puppeteer.use(stealthPlugin);

async function run() {
  const browser = await puppeteer.launch(getOptions(''));
  const page = await browser.newPage();
  await page.waitForNavigation()
  const url = 'https://www.vfsvisaonline.com/Netherlands-Global-Online-Appointment_Zone2/AppScheduling/AppWelcome.aspx?P=itfjUBdSE44q%2BnOPqZhld%2FqUJKKtoDf2%2BrAuCfMkyc4%3D'
  await page.goto(url, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
  })
  await page.waitForSelector('#plhMain_lnkReSchApp')
  await page.click('#plhMain_lnkReSchApp')

  await page.waitForSelector('#plhMain_tbxWebRefNo')// Reference Number:
  await page.$eval('#plhMain_tbxWebRefNo', el => el.value = '');
  await page.$eval('#plhMain_tbxLastName', el => el.value = 'PAKNAHAD');
  await page.$eval('#plhMain_tbxEmailID', el => el.value = 'hp.paknahad@gmail.com');
  await page.click('#plhMain_btnSubmit') // submit Click

  await page.waitForSelector('#plhMain_btnReSch') // rescadule button
  await page.click('#plhMain_btnReSch')

  await page.waitForSelector('#plhMain_cldAppointment') // table
  const monthYear = await page.evaluate(function() {
    return document.querySelector('#tdCalender tr table td[align=center]').innerText
  })
  if (monthYear.startsWith('April')) {
    // hoooray
    await page.click('.OpenDateAllocated a') // the first possible option
    await page.waitForSelector('#plhMain_lblSchAppDt')// Schedule Appointment Date/Time
    await page.click('#plhMain_gvSlot a') // the first possible time
  } else {
    try{
      await page.click('a[title="Go to the previous month"')
    } catch(e) {
      console.log('ishalam badan')
    }
  }
  await browser.close()
}

run()