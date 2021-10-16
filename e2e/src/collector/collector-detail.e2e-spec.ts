import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should navigate to a collector's detail througt collectors list", () => {
    page.navigateTo();
    page.clickOnById('collectors');
    expect(page.getTextByTagName('h1')).toEqual('Collectors');

    let collectorName:Promise<string> = page.getTextByTagName('h2');

    page.clickOnById('collector-100');
    page.wait(1500);

    expect(page.getTextByTagName('h1')).toEqual(collectorName);
  });
});
