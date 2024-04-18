import { test, expect } from '@playwright/test';
import {authenticate} from "../lib/authUtility";
import {SignUpLandingPage} from "../pages/SignUpLandingPage";

test.describe('Ineligible tests', () => {
  test.beforeEach(async ({page}) => {
    await authenticate(page);
    await page.goto(`${process.env.BASE_URL}/hair-treatment-rx/welcome/`);
  });

  test('Ineligible United Kingdom Male Age - 34', async ({ page }) => {
    const signUpLandingPage = new SignUpLandingPage(page);

    await signUpLandingPage.waitForPageLoad();
    await signUpLandingPage.signUpNextBtn.click();

    // Complete location and state of residence
    await signUpLandingPage.selectResidenceAndProceed('Other', 'United Kingdom');
    await signUpLandingPage.locationNextBtn.click();

    // Complete date of birth
    await signUpLandingPage.completeDateOfBirth('10', '23', '1989');

    // Select gender and proceed
    await signUpLandingPage.selectGenderAndProceed('Male');

    // Check if the ineligible text is visible
    const isIneligibleTextVisible = await signUpLandingPage.isUserIneligibleTextVisible();
    const isIneligibleReasonVisible = await signUpLandingPage.isUserIneligibleLocationMessageVisible();
    await expect(isIneligibleReasonVisible).toBe(true);
    await expect(isIneligibleTextVisible).toBe(true);
  });

  test('Ineligible India Female Age - 17', async ({ page }) => {
    const signUpLandingPage = new SignUpLandingPage(page);

    await signUpLandingPage.waitForPageLoad();
    await signUpLandingPage.signUpNextBtn.click();

    // Complete location and state of residence
    await signUpLandingPage.selectResidenceAndProceed('Other', 'India');
    await signUpLandingPage.locationNextBtn.click();

    // Complete date of birth
    await signUpLandingPage.completeDateOfBirth('10', '23', '2006');

    // Select gender and proceed
    await signUpLandingPage.selectGenderAndProceed('Female');
    await signUpLandingPage.selectPregnancyAndProceed('No');

    // Check if the ineligible text is visible
    const isIneligibleTextVisible = await signUpLandingPage.isUserIneligibleTextVisible();
    const isIneligibleLocationVisible = await signUpLandingPage.isUserIneligibleLocationMessageVisible();
    const isIneligibleAgeVisible = await signUpLandingPage.isUserIneligibleAgeMessageVisible();
    await expect(isIneligibleLocationVisible).toBe(true);
    await expect(isIneligibleTextVisible).toBe(true);
    await expect(isIneligibleAgeVisible).toBe(true);
  });
});
