import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should navigate to collectors list in the Nav-Bar's menu", () => {
    page.navigateTo();
    page.clickOnById('collectors');
    expect(page.getTextByTagName('h1')).toEqual('Collectors');
  });
});
