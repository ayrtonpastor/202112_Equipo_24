import { AppPage } from '../app.po';
import { browser, logging } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should try to make a favorite musician that already is a favorite for Manolo Bellon", () => {
    page.navigateTo();
    page.clickOnById('collectors');
    page.clickOnById('collector-100');
    page.wait(1500);
    page.scrollDownToElementId('add-favorite-musician');
    page.clickOnById('add-favorite-musician');
    page.clickByTagAndText('option', 'Rubén Blades Bellido de Luna');
    page.wait(1500);
    page.waitForAngular()
    page.scrollDownToElementId('create-fav-musician');
    page.clickOnById('create-fav-musician');
    page.wait(2000);
    expect(page.getSizeOfElementsByTagNameAndContent('h3', 'Rubén Blades Bellido de Luna')).toBe(1);
  });
});
