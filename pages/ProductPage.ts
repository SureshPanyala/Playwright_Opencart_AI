import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly hdgProductName: Locator;
    private readonly btnAddToCart: Locator;
    private readonly msgSuccess: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.hdgProductName = page.locator('#content h1');
        this.btnAddToCart = page.getByRole('button', { name: 'Add to Cart' });
        this.msgSuccess = page.locator('.alert-success');
    }

    /**
     * Gets the product name displayed on the details page
     * @returns Promise<string> - Product name
     */
    async getProductName(): Promise<string> {
        return (await this.hdgProductName.innerText()).trim();
    }

    /**
     * Adds the product to the cart
     */
    async clickAddToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    /**
     * Verifies the "added to cart" success alert is displayed
     * @returns Promise<boolean> - true if the success alert is visible
     */
    async isAddedToCartSuccessDisplayed(): Promise<boolean> {
        try {
            await this.msgSuccess.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking add-to-cart message: ${error}`);
            return false;
        }
    }
}
