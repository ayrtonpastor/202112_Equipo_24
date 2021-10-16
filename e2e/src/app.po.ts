import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
var EC = protractor.ExpectedConditions;

export class AppPage {
  navigateTo(): Promise<unknown> {
    browser.manage().window().maximize();
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('strong')).getText() as Promise<string>;
  }

  clickOnById(id: string): void {
    browser.driver.findElement(by.id(id)).click();
    this.wait(1500);
  }

  clickOnByTagName(tagName: string): void {
    element(by.css(tagName)).click();
  }

  clickByTagNameAndId(tagName: string, id: string): void {
    element(by.xpath(`//${tagName}[@id="${id}"]`)).click();
  }

  clickByTagAndText(tagName: string, text: string): void {
    element(by.cssContainingText(tagName, text)).click();
    this.wait(1500);
  }

  getTextByTagName(tagName: string): Promise<string> {
    return element(by.css(tagName)).getText() as Promise<string>;
  }

  getTextByTagNameAndText(tagName: string, text: string): Promise<string> {
    return element(by.xpath(`//${tagName}[text()='${text}']`)).getText() as Promise<string>;
  }

  typeText(text: string): void {
    browser.actions().sendKeys(text);
  }

  pressTab(): void {
    browser.actions().sendKeys(protractor.Key.TAB);
  }

  pressDown(): void {
    browser.actions().sendKeys(protractor.Key.DOWN);
  }

  pressEnter(): void {
    browser.actions().sendKeys(protractor.Key.ENTER);
  }

  wait(miliSeconds: number): void {
    browser.driver.sleep(miliSeconds);
  }

  waitSelector(linkName: string, miliSeconds: number) {
    let selector = element(by.id(linkName));
    return browser.wait(selector.isDisplayed(), miliSeconds);
  }

  waitForAngular() {
    browser.waitForAngularEnabled(true);
  }

  scrollDownToElementId(elementId: string): void {
    browser.actions().mouseDown(element(by.id(elementId))).perform();
    this.wait(2000);
  }

  scrollDownToElementByTagAndContent(tagName: string, content: string): void {
    browser.actions().mouseDown(element(by.xpath(`//${tagName}[text()='${content}']`))).perform();
    this.wait(2000);
  }

  setTextOnAnElementById(id: string, value: string) {
    element(by.id(id)).sendKeys(value);
  }

  getSizeOfElementsByTagNameAndContent(tagName: string, content: string): Promise<number> {
    return element.all(by.xpath(`//${tagName}[text()='${content}']`)).count() as Promise<number>;
  }

  scrollTo(scrollToElement) {
    var wd = browser.driver;
    return scrollToElement.getLocation().then(function (loc) {
      return wd.executeScript('window.scrollTo(0,arguments[0]);', loc.y);
    })
  };
}
