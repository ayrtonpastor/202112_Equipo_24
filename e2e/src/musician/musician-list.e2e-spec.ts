import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should navigate to musician's list in the Nav-Bar's menu", () => {
    page.navigateTo();
    page.clickOnById('musicians');
    expect(page.getTextByTagName('h1')).toEqual('Musicians');
  });
});
