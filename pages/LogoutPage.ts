import { Page, Locator } from '@playwright/test';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly hdgLogout: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.hdgLogout = page.getByRole('heading', { name: 'Account Logout' });
    }

    /**
     * Verifies the logout confirmation page is displayed
     * @returns Promise<boolean> - true if the user is logged out
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            await this.hdgLogout.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking logout page: ${error}`);
            return false;
        }
    }
}
