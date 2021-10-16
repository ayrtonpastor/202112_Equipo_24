import { AppPage } from '../app.po';
import { browser, by, element, ElementFinder, logging, ElementArrayFinder } from 'protractor';
import * as faker from 'faker';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("Should create a new album with valid input values.", () => {
    page.navigateTo();
    page.clickOnById('albums');
    expect(page.getTextByTagName('h1')).toEqual('Albums');
    page.clickOnById('add_album');
    page.waitForAngular();
    page.scrollDownToElementId('cancel-create-album');

    //Crea el album
    let rndAlbumName: string = faker.name.title();
    page.setTextOnAnElementById('name', rndAlbumName);
    let rndUrlCover: string = faker.image.business();
    page.setTextOnAnElementById('cover', rndUrlCover);
    let fakeReleaseDate: string = "20/12/2020";
    page.setTextOnAnElementById('releaseDate', fakeReleaseDate);
    let rndDescription: string = faker.commerce.productDescription();
    page.setTextOnAnElementById('description', rndDescription);
    page.clickByTagAndText('option', 'FOLK');
    page.waitForAngular()
    page.clickByTagAndText('option', 'SONY');
    page.waitForAngular()
    page.clickOnById('create-album');
    page.wait(2000);
    browser.executeScript('window.scrollTo(0,0);').then(function () {
      console.log('++++++SCROLLED UP+++++//////');
    });

    //Prueba la existencia del album recien creado
    //page.navigateTo();
    page.wait(2000);
    page.clickOnById('albums');
    page.wait(2000);
    page.scrollDownToElementByTagAndContent('h3', ` ${rndAlbumName} `);
    expect(page.getTextByTagNameAndText('h3', ` ${rndAlbumName} `)).toEqual(rndAlbumName);
    page.wait(2000);
  });
});
