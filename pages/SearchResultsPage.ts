import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly hdgSearch: Locator;
    private readonly productThumbs: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.hdgSearch = page.getByRole('heading', { name: /^Search/ });
        this.productThumbs = page.locator('.product-thumb');
    }

    /**
     * Verifies the search results page is displayed
     * @returns Promise<boolean> - true if the search heading is visible
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            await this.hdgSearch.first().waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }

    /**
     * Opens the details page of a product from the results
     * @param productName - Exact product name to open
     * @returns Promise<ProductPage> - Instance of the product page
     */
    async selectProduct(productName: string): Promise<ProductPage> {
        await this.productThumbs.getByRole('link', { name: productName, exact: true }).last().click();
        return new ProductPage(this.page);
    }
}
