import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should add random musician to Queen's band", () => {
    page.navigateTo();
    page.clickOnById('musicians');
    expect(page.getTextByTagName('h1')).toEqual('Musicians');
    let musicianName:Promise<string> = page.getTextByTagName('h2');
    page.clickOnByTagName('h2');
    expect(page.getTextByTagName('h1')).toEqual(musicianName);

    page.clickByTagAndText(".btn",  "Assign to a band" );
    page.clickByTagAndText('option', 'Queen');
    page.wait(1500);
    page.waitForAngular();
    page.clickByTagAndText('.btn', 'Asign');
    page.wait(2000);

    page.clickOnById('bands');
    page.clickOnByTagName('h2');
    expect(page.getSizeOfElementsByTagNameAndContent('h3', 'Rubén Blades Bellido de Luna')).toBeGreaterThanOrEqual(1);

  });
});
