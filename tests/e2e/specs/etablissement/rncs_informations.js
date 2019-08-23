import { bouygues } from "../fixtures";

const companyNameElement =
  "#app > section > div > div:nth-child(1) > div.company > div.company-container > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(1) > div.company__item-value";

const presidentNameElement =
  "#app > section > div > div:nth-child(1) > div.company > div.company__panel.panel > div > div:nth-child(19) > div > div:nth-child(2) > div.company__item-value";

const observationDateElement =
  "#app > section > div > div:nth-child(1) > div.company > div:nth-child(3) > div:nth-child(3) > div.company__item.company__comment-date > div";

const buttonDownloadPDF =
  "#app > section > div > div:nth-child(1) > div.company__buttons > a";

module.exports = {
  "Clicking on link text goes to RNCS page": function(browser) {
    browser
      .url(browser.launch_url + "etablissement/" + bouygues.siret)
      .click("link text", "Fiche d'immatriculation au RNCS");

    browser.assert.urlEquals(browser.launch_url + "rncs/" + bouygues.siren);
  },

  "Page RNCS display correct info: Identification": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(companyNameElement);

    browser.assert.containsText(companyNameElement, bouygues.title);
  },

  "Page RNCS display correct info: Gestion": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(presidentNameElement);

    browser.assert.containsText(presidentNameElement, bouygues.namePresident);
  },

  "Page RNCS display correct info: Observations": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(observationDateElement);

    browser.assert.containsText(
      observationDateElement,
      bouygues.dateFirstObservation
    );
  },

  "'Download PDF' button goes to correct link": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(buttonDownloadPDF);

    browser.getAttribute(buttonDownloadPDF, "href", function(attribute) {
      browser.assert.equal(
        attribute.value,
        browser.launch_url +
          "api/rncs/v1/fiches_identite/" +
          bouygues.siren +
          "/pdf"
      );
    });
    browser.end();
  }
};
