import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should add a random comment for Buscando América as Manolo Bellon", () => {
    page.navigateTo();
    page.clickOnById('albums');
    page.clickOnByTagName('h3');
    page.waitForAngular();
    page.scrollDownToElementId('new-comment');
    page.clickOnById('new-comment');
    page.scrollDownToElementId('create-comment');
    let randomComment:string = faker.lorem.sentence();
    page.setTextOnAnElementById('description', randomComment);
    page.clickOnById((faker.datatype.number({min: 1, max: 5})).toString());
    page.clickByTagAndText('option', 'Manolo Bellon');
    page.clickOnById('create-comment');
    page.waitForAngular();
    page.scrollDownToElementByTagAndContent('p', randomComment);
    page.wait(1500);
    expect(page.getTextByTagNameAndText('p', randomComment)).toEqual(randomComment);
  });
});
