const wdio = require("webdriverio");
const assert = require("assert");
const { fstat } = require("fs");
const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        platformName: "Android",
        platformVersion: "10",
        deviceName: "492924f0",
        app: "/Users/gitsindonesia/Documents/Personal/topcoder/ApiDemos-debug.apk",
        appPackage: "io.appium.android.apis",
        automationName: "UiAutomator1",
        fullRest: false
    }
};
async function main() {
    const client = await wdio.remote(opts);
    await client.setOrientation("LANDSCAPE");
    
    var el1 = client.$("~Accessibility");
    (await el1).click();
    const field = await client.$('//android.widget.TextView[@content-desc="Accessibility Node Querying"]');
    const value = await field.getText();
    assert.equal(value, "Accessibility Node Querying");

    let screenshot = await client.takeScreenshot();
    try {
        let fs = require("fs")
        var buf = new Buffer(screenshot, 'base64');
        fs.writeFileSync('1.png', buf); // need to be in an async function
    } catch (error) {
        console.log(error)
    }
    
    await client.deleteSession();
}
main();