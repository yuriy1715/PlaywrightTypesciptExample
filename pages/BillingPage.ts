import {FrameLocator, Locator, Page} from '@playwright/test';

export class BillingPage {
    readonly page: Page;
    readonly shippingAddress_1: Locator;
    readonly shippingAddress_2: Locator;
    readonly shippingAddressCity: Locator;
    readonly shippingAddressPhone: Locator;
    readonly shippingAddressState: Locator;
    readonly shippingAddressZip: Locator;
    readonly continueShippingBtn: Locator;
    readonly bankCardFrame: FrameLocator;
    readonly checkoutSubscriptionAgreement: Locator;
    readonly creditCardData: {
        number: string;
        owner: string;
        expireDate: string;
        code: string;
    };

    constructor(page: Page) {
        this.page = page;
        this.shippingAddress_1 = page.locator('#checkout_shipping_address_address1');
        this.shippingAddress_2 = page.locator('#checkout_shipping_address_address2');
        this.shippingAddressCity = page.locator('#checkout_shipping_address_city');
        this.shippingAddressPhone = page.locator('#checkout_shipping_address_phone');
        this.shippingAddressState = page.locator('#checkout_shipping_address_province');
        this.shippingAddressZip = page.locator('#checkout_shipping_address_zip');
        this.continueShippingBtn = page.locator('#continue_button');
        this.bankCardFrame = page.frameLocator('.card-fields-iframe');
        this.checkoutSubscriptionAgreement = page.locator('#checkout_subscription_agreement');
        this.creditCardData = {
            number: "123445567898234",
            owner: "Jonathan Telephone",
            expireDate: "01/29",
            code: "000"
        };
    }

    /**
     * Fill address info
     * @param address1 - full address.
     * @param address2 - apt address.
     * @param city - city.
     * @param state - state.
     * @param phone - phone.
     * @param zip - zip
     */
    async fillAddressInfo(address1: string, address2: string, city: string, state: string, zip: string, phone: string) {
        await this.shippingAddress_1.fill(address1);
        await this.shippingAddress_2.fill(address2);
        await this.shippingAddressCity.fill(city);
        await this.shippingAddressState.selectOption(state);
        await this.shippingAddressZip.fill(zip);
        await this.shippingAddressPhone.fill(phone);
        await this.continueShippingBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /**
     * Fill credit card.
     */
    async fillCreditCardForm() {
        await this.bankCardFrame.nth(0).locator('#number').waitFor();
        await this.bankCardFrame.nth(0).locator('#number').fill(this.creditCardData.number);
        await this.bankCardFrame.nth(1).locator('#name').fill(this.creditCardData.owner);
        await this.bankCardFrame.nth(2).locator('#expiry').fill(this.creditCardData.expireDate);
        await this.bankCardFrame.nth(3).locator('#verification_value').fill(this.creditCardData.code);
        await this.checkoutSubscriptionAgreement.check({force: true});
        await this.continueShippingBtn.nth(0).click();
        await this.page.waitForTimeout(2000);
    }
}
