import { Page, Locator } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly hdgShoppingCart: Locator;
    private readonly lnkProductName: Locator;
    private readonly txtQuantity: Locator;
    private readonly cellUnitPrice: Locator;
    private readonly cellTotalPrice: Locator;
    private readonly cellCartTotal: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.hdgShoppingCart = page.getByRole('heading', { name: /^Shopping Cart/ });
        this.lnkProductName = page.locator('#content .table-responsive tbody td.text-left a');
        this.txtQuantity = page.locator('#content .table-responsive tbody input[name^="quantity"]');
        this.cellUnitPrice = page.locator('#content .table-responsive tbody td.text-right').nth(0);
        this.cellTotalPrice = page.locator('#content .table-responsive tbody td.text-right').nth(1);
        this.cellCartTotal = page.locator('#content table').last().getByRole('row', { name: /^Total:/ }).getByRole('cell').last();
    }

    /**
     * Verifies the shopping cart page is displayed
     * @returns Promise<boolean> - true if the Shopping Cart heading is visible
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            await this.hdgShoppingCart.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking cart page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the product name shown in the cart
     * @returns Promise<string> - Product name text
     */
    async getProductName(): Promise<string> {
        return (await this.lnkProductName.first().innerText()).trim();
    }

    /**
     * Gets the product quantity shown in the cart
     * @returns Promise<string> - Quantity value
     */
    async getQuantity(): Promise<string> {
        return await this.txtQuantity.first().inputValue();
    }

    /**
     * Gets the unit price shown in the cart
     * @returns Promise<string> - Unit price text, e.g. "$602.00"
     */
    async getUnitPrice(): Promise<string> {
        return (await this.cellUnitPrice.innerText()).trim();
    }

    /**
     * Gets the line total of the product shown in the cart
     * @returns Promise<string> - Line total text
     */
    async getLineTotal(): Promise<string> {
        return (await this.cellTotalPrice.innerText()).trim();
    }

    /**
     * Gets the overall cart total (including taxes)
     * @returns Promise<string> - Cart total text
     */
    async getCartTotal(): Promise<string> {
        return (await this.cellCartTotal.innerText()).trim();
    }
}
