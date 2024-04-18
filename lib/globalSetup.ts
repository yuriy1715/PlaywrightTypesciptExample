// globalSetup.ts
import { chromium, FullConfig } from '@playwright/test';
import { authenticate } from './authUtility';

async function globalSetup(conf: FullConfig) {
    const { storageState } = conf.projects[0].use;
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await authenticate(page);

    await page.context().storageState({ path: storageState as string });
    await browser.close();
}

export default globalSetup;
