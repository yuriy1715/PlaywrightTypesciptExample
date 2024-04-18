import { Locator, Page } from '@playwright/test';

export class SignUpLandingPage {
    readonly page: Page;
    readonly signUpNextBtn: Locator;
    readonly locationUS: Locator;
    readonly locationCanada: Locator;
    readonly stateOfResidence: Locator;
    readonly locationNextBtn: Locator;
    readonly birthMonth: Locator;
    readonly birthDay: Locator;
    readonly birthYear: Locator;
    readonly birthDayNextBtn: Locator;
    readonly maleLabel: Locator;
    readonly sexNextBtn: Locator;
    readonly userEligibleText: Locator;
    readonly userIneligibleText: Locator;
    readonly reasonIneligibleLocationText: Locator;
    readonly reasonIneligibleAgeText: Locator;
    readonly reasonIneligiblePregnancyText: Locator;
    readonly pregnancyNextBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpNextBtn = page.locator('#sign-up-landing-page-next');
        this.locationUS = page.locator('[aria-label="US"]');
        this.locationCanada = page.locator('[aria-label="Canada"]');
        this.stateOfResidence = page.locator('#eligibility-location-state-or-province');
        this.locationNextBtn = page.locator('#sign-up-location-next');
        this.birthMonth = page.locator('#eligibility-dob-birthMonth');
        this.birthDay = page.locator('#eligibility-dob-birthDay');
        this.birthYear = page.locator('#eligibility-dob-birthYear');
        this.birthDayNextBtn = page.locator('#sign-up-date-of-birth-next');
        this.maleLabel = page.locator('[aria-label="Male"]');
        this.sexNextBtn = page.locator('#sign-up-biological-sex-next');
        this.userEligibleText = page.locator('//*[.="Congratulations! You\'re eligible for a consultation with our specialist physicians."]');
        this.userIneligibleText = page.locator('//h1[.="Sorry, you\'re not currently eligible. Here\'s why."]')
        this.reasonIneligibleLocationText = page.locator('//li[.="At this time we only deliver in the continental US and select Canadian provinces."]');
        this.reasonIneligibleAgeText = page.locator('//li[.="can only offer this service to those aged 18 and older"]')
        this.reasonIneligiblePregnancyText = page.locator('//li[.="cannot offer this service to females who are pregnant or trying to conceive"]')
        this.pregnancyNextBtn = page.locator('#sign-up-personal-pregnancy-next');
    }

    /**
     * Wait for SignUp page to load
     */
    async waitForPageLoad() {
        await this.signUpNextBtn.waitFor();
    }

    /**
     * Complete the date of birth section
     * @param month Birth month
     * @param day Birth day
     * @param year Birth year
     */
    async completeDateOfBirth(month: string, day: string, year: string) {
        await this.birthMonth.fill(month);
        await this.birthDay.fill(day);
        await this.birthYear.fill(year);
        await this.birthDayNextBtn.click();
    }

    /**
     * Select gender and proceed
     * @param gender Gender to select
     */
    async selectGenderAndProceed(gender: 'Male' | 'Female') {
        const genderLabel = this.page.locator(`[aria-label="${gender}"]`);
        await genderLabel.click();
        await this.sexNextBtn.click();
    }

    /**
     * Check if the eligible text is visible
     */
    async isUserEligibleTextVisible() {
        return await this.userEligibleText.isVisible();
    }

    /**
     * Check if the ineligible text is visible
     */
    async isUserIneligibleTextVisible() {
        return await this.userIneligibleText.isVisible();
    }

    /**
     * Check if the location text is visible
     */
    async isUserIneligibleLocationMessageVisible() {
        return await this.reasonIneligibleLocationText.isVisible();
    }

    /**
     * Check if the age text is visible
     */
    async isUserIneligibleAgeMessageVisible() {
        return await this.reasonIneligibleAgeText.isVisible();
    }

    /**
     * Check if the pregnancy text is visible
     */
    async isUserIneligiblePregnancyMessageVisible() {
        return await this.reasonIneligiblePregnancyText.isVisible();
    }

    /**
     * Select pregnancy and proceed
     * @param pregnancy Pregnancy to select
     */
    async selectPregnancyAndProceed(pregnancy: 'Yes' | 'No') {
        const pregnancyLabel = this.page.locator(`[aria-label="${pregnancy}"]`);
        await pregnancyLabel.click();
        await this.pregnancyNextBtn.click();
    }

    /**
     * Select residence and proceed
     * @param residence Residence to select
     * @param state State to set
     */
    async selectResidenceAndProceed(residence: 'US' | 'Canada' | 'Other', state: string) {
        const residenceLabel = this.page.locator(`[aria-label="${residence}"]`);
        await residenceLabel.click();
        await this.stateOfResidence.waitFor();
        await this.stateOfResidence.fill(state);
        await this.page.locator(`//li[.="${state}"]`).click();
    }
}
