import { Locator, Page } from '@playwright/test';

export class AccountCreationPage {
    readonly page: Page;
    readonly signUpStartBtn: Locator;
    readonly createAccountFirstName: Locator;
    readonly createAccountMiddleName: Locator;
    readonly createAccountLastName: Locator;
    readonly signUpNameNext: Locator;
    readonly createAccountEmail: Locator;
    readonly termsAndPrivacyCheckbox: Locator;
    readonly healthPolicyCheckbox: Locator;
    readonly marketingPolicyCheckbox: Locator;
    readonly signUpEmailNextBtn: Locator;
    readonly createAccountPassword: Locator;
    readonly createAccountConfirmPassword: Locator;
    readonly signUpSetPasswordNextBtn: Locator;
    readonly verificationInputCode: Locator;
    readonly verificationNextBtn: Locator;
    readonly beginConsultationBtn: Locator;
    readonly phone: Locator;
    readonly signUpPhoneNextBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpStartBtn = page.locator('#sign-up-eligible-next');
        this.createAccountFirstName = page.locator('#create-account-firstName');
        this.createAccountLastName = page.locator('#create-account-lastName');
        this.createAccountMiddleName = page.locator('#create-account-middleName')
        this.signUpNameNext = page.locator('#sign-up-name-next');
        this.createAccountEmail = page.locator('#create-account-email');
        this.termsAndPrivacyCheckbox = page.locator('[name="termsAndPrivacyConsent"]');
        this.healthPolicyCheckbox = page.locator('[name="telehealthConsent"]')
        this.marketingPolicyCheckbox = page.locator('[name="marketingConsent"]');
        this.signUpEmailNextBtn = page.locator('#sign-up-email-next');
        this.createAccountPassword = page.locator('#create-account-password');
        this.createAccountConfirmPassword = page.locator('#create-account-confirmPassword')
        this.signUpSetPasswordNextBtn = page.locator('#sign-up-set-password-next');
        this.verificationInputCode = page.locator('[aria-label="verification input"]');
        this.verificationNextBtn = page.locator('#sign-up-verification-next');
        this.beginConsultationBtn = page.locator('#sign-up-success-next');
        this.phone = page.locator('[name="phone"]');
        this.signUpPhoneNextBtn = page.locator('#sign-up-phone-next');
    }

    /**
     * Create account by providing necessary information.
     * @param firstName - First name of the user.
     * @param lastName - Last name of the user.
     * @param middleName - Middle name of the user.
     * @param email - Email address for the account.
     * @param password - Password for the account.
     */
    async createAccount(firstName: string, lastName: string, middleName: string, email: string, password: string, phone?: string) {
        // Click on the start button
        await this.signUpStartBtn.click();

        // Fill in the account information
        await this.createAccountFirstName.fill(firstName);
        await this.createAccountLastName.fill(lastName);
        await this.createAccountMiddleName.fill(middleName);
        await this.signUpNameNext.click();

        // fill phone number is needed
        if(phone) {
            await this.phone.fill(phone);
        }
        await this.signUpPhoneNextBtn.click();

        // Fill in the email and consent checkboxes
        await this.createAccountEmail.fill(email);
        await this.termsAndPrivacyCheckbox.check({force: true});
        await this.healthPolicyCheckbox.check({force: true});
        await this.marketingPolicyCheckbox.check({force: true});
        await this.signUpEmailNextBtn.click();

        // Set password and complete account creation
        await this.createAccountPassword.fill(password);
        await this.createAccountConfirmPassword.fill(password);
        await this.signUpSetPasswordNextBtn.click();
        await this.verificationInputCode.waitFor({timeout: 15000});
        // waiting for last email
        await this.page.waitForTimeout(5000);
    }
}
