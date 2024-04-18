import { test, expect } from '@playwright/test';
import {authenticate} from "../lib/authUtility";
import {SignUpLandingPage} from "../pages/SignUpLandingPage";

test.describe('Eligible tests', () => {
  test.beforeEach(async ({page}) => {
    await authenticate(page);
    await page.goto(`${process.env.BASE_URL}/hair-treatment-rx/welcome/`);
  });

  test('Eligible US Male (Oregon) @smoke', async ({page}) => {
    const signUpLandingPage = new SignUpLandingPage(page);

    await signUpLandingPage.waitForPageLoad();
    await signUpLandingPage.signUpNextBtn.click();

    // Complete location and state of residence
    await signUpLandingPage.selectResidenceAndProceed('US','Oregon');
    await signUpLandingPage.locationNextBtn.click();

    // Complete date of birth
    await signUpLandingPage.completeDateOfBirth('11', '14', '1989');

    // Select gender and proceed
    await signUpLandingPage.selectGenderAndProceed('Male');

    // Check if the eligible text is visible
    const isEligibleTextVisible = await signUpLandingPage.isUserEligibleTextVisible();
    await expect(isEligibleTextVisible).toBe(true);
  });

  test('Eligible US Male Age - 18 (NY)', async ({ page }) => {
    const signUpLandingPage = new SignUpLandingPage(page);

    await signUpLandingPage.waitForPageLoad();
    await signUpLandingPage.signUpNextBtn.click();

    // Complete location and state of residence
    await signUpLandingPage.selectResidenceAndProceed('US','New York');
    await signUpLandingPage.locationNextBtn.click();

    // Complete date of birth
    await signUpLandingPage.completeDateOfBirth('10', '23', '2005');

    // Select gender and proceed
    await signUpLandingPage.selectGenderAndProceed('Male');

    // Check if the eligible text is visible
    const isEligibleTextVisible = await signUpLandingPage.isUserEligibleTextVisible();
    await expect(isEligibleTextVisible).toBe(true);
  });

  test('Eligible US Male Age - 22 (TX) @smoke', async ({ page }) => {
    const signUpLandingPage = new SignUpLandingPage(page);

    await signUpLandingPage.waitForPageLoad();
    await signUpLandingPage.signUpNextBtn.click();

    // Complete location and state of residence
    await signUpLandingPage.selectResidenceAndProceed('US','Texas');
    await signUpLandingPage.locationNextBtn.click();

    // Complete date of birth
    await signUpLandingPage.completeDateOfBirth('02', '02', '2001');

    // Select gender and proceed
    await signUpLandingPage.selectGenderAndProceed('Male');

    // Check if the eligible text is visible
    const isEligibleTextVisible = await signUpLandingPage.isUserEligibleTextVisible();
    await expect(isEligibleTextVisible).toBe(true);
  });

  test('Eligible US Male Age - 38 (WA)', async ({ page }) => {
    const signUpLandingPage = new SignUpLandingPage(page);

    await signUpLandingPage.waitForPageLoad();
    await signUpLandingPage.signUpNextBtn.click();

    // Complete location and state of residence
    await signUpLandingPage.selectResidenceAndProceed('US', 'Washington');
    await signUpLandingPage.locationNextBtn.click();

    // Complete date of birth
    await signUpLandingPage.completeDateOfBirth('03', '03', '1985');

    // Select gender and proceed
    await signUpLandingPage.selectGenderAndProceed('Male');

    // Check if the eligible text is not visible
    const isEligibleTextVisible = await signUpLandingPage.isUserEligibleTextVisible();
    await expect(isEligibleTextVisible).toBe(true);
  });

  test('Eligible Canadian Female Age - 43 (NL)', async ({ page }) => {
    const signUpLandingPage = new SignUpLandingPage(page);

    await signUpLandingPage.waitForPageLoad();
    await signUpLandingPage.signUpNextBtn.click();

    // Complete location and state of residence
    await signUpLandingPage.selectResidenceAndProceed('Canada','Newfoundland and Labrador');
    await signUpLandingPage.locationNextBtn.click();

    // Complete date of birth
    await signUpLandingPage.completeDateOfBirth('12', '12', '1980');

    // Select gender and proceed
    await signUpLandingPage.selectGenderAndProceed('Female');
    // Select pregnancy and proceed
    await signUpLandingPage.selectPregnancyAndProceed('No');

    // Check if the eligible text is not visible
    const isEligibleTextVisible = await signUpLandingPage.isUserEligibleTextVisible();
    await expect(isEligibleTextVisible).toBe(true);
  });

});
