import { Page, Locator } from '@playwright/test';
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { SearchResultsPage } from './SearchResultsPage';
import { CartPage } from './CartPage';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;
    private readonly txtSearch: Locator;
    private readonly btnSearch: Locator;
    private readonly lnkShoppingCart: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.lnkMyAccount = page.getByTitle('My Account');
        this.lnkRegister = page.locator('#top-links').getByRole('link', { name: 'Register' });
        this.lnkLogin = page.locator('#top-links').getByRole('link', { name: 'Login' });
        this.txtSearch = page.getByRole('textbox', { name: 'Search' });
        this.btnSearch = page.locator('#search button');
        this.lnkShoppingCart = page.getByRole('link', { name: 'Shopping Cart' }).first();
    }

    /**
     * Opens the My Account dropdown in the header
     */
    async clickMyAccount(): Promise<void> {
        await this.lnkMyAccount.click();
    }

    /**
     * Opens the Register page from the My Account dropdown
     * @returns Promise<RegisterPage> - Instance of the registration page
     */
    async clickRegister(): Promise<RegisterPage> {
        await this.lnkRegister.click();
        return new RegisterPage(this.page);
    }

    /**
     * Opens the Login page from the My Account dropdown
     * @returns Promise<LoginPage> - Instance of the login page
     */
    async clickLogin(): Promise<LoginPage> {
        await this.lnkLogin.click();
        return new LoginPage(this.page);
    }

    /**
     * Searches for a product using the header search box
     * @param productName - Product name to search for
     * @returns Promise<SearchResultsPage> - Instance of the search results page
     */
    async searchProduct(productName: string): Promise<SearchResultsPage> {
        await this.txtSearch.fill(productName);
        await this.btnSearch.click();
        return new SearchResultsPage(this.page);
    }

    /**
     * Opens the shopping cart from the header link
     * @returns Promise<CartPage> - Instance of the cart page
     */
    async clickShoppingCart(): Promise<CartPage> {
        await this.lnkShoppingCart.click();
        return new CartPage(this.page);
    }
}
