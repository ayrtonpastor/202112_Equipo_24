import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should navigate to the detail of an album by selecting an album in the album list.", () => {
    page.navigateTo();
    page.clickOnById('albums');
    expect(page.getTextByTagName('h1')).toEqual('Albums');
    let albumName:Promise<string> = page.getTextByTagName('h3');
    page.clickOnByTagName('h3');
    page.waitForAngular();
    expect(page.getTextByTagName('h3')).toEqual(albumName);
  });
});
