import { AppPage } from '../app.po';
import { browser, by, element, ElementFinder, logging, ElementArrayFinder } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should create a new track and assign to an existing album.", () => {
    page.navigateTo();
    page.clickOnById('albums');
    expect(page.getTextByTagName('h1')).toEqual('Albums');
    page.clickOnById('add_track');
    page.waitForAngular();
    page.scrollDownToElementId('track_cancel');

    //Crea el track
    let rndTrackName: string = faker.name.title();
    page.setTextOnAnElementById('name', rndTrackName);
    let fakeDuration: string = "05:15";
    page.setTextOnAnElementById('duration', fakeDuration);
    page.clickByTagAndText('option', 'A Day at the Races');
    page.waitForAngular()
    page.clickOnById('track_create_assign');
    page.waitForAngular();

    //verifica su existencia
    browser.executeScript('window.scrollTo(0,0);');
    page.scrollDownToElementId('albumName3');
    page.clickOnById('albumName3');
    page.scrollDownToElementId('new-comment');
    expect(page.getTextByTagNameAndText('td', rndTrackName)).toEqual(rndTrackName);
  });
});
