import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should create a new album on collector's detail", () => {
    page.navigateTo();
    page.clickOnById('collectors');
    expect(page.getTextByTagName('h1')).toEqual('Collectors');

    let collectorName:Promise<string> = page.getTextByTagName('h2');

    page.clickOnById('collector-100');
    page.wait(1500);

    expect(page.getTextByTagName('h1')).toEqual(collectorName);

    page.clickByTagAndText(".btn",  "Add album" );

    page.setTextOnAnElementById("precio","3222")
    page.clickByTagAndText('option', 'Buscando América');
    page.clickByTagAndText('option', 'Activo');

    page.clickByTagAndText(".btn",  "Create" );
    page.wait(1000);
    expect(page.getSizeOfElementsByTagNameAndContent('h3', 'Buscando América')).toBeGreaterThanOrEqual(1);

  });
});
