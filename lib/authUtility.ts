import { Page } from '@playwright/test';

export async function authenticate(page: Page) {
    const urlWithCredentials = `https://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.BASE_URL_SHORT}`;
    await page.goto(urlWithCredentials);
}
