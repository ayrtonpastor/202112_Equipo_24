import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should navigate to a musician's detail througt musician's list", () => {
    page.navigateTo();
    page.clickOnById('musicians');
    expect(page.getTextByTagName('h1')).toEqual('Musicians');
    let musicianName:Promise<string> = page.getTextByTagName('h2');
    page.clickOnByTagName('h2');
    expect(page.getTextByTagName('h1')).toEqual(musicianName);
  });
});
