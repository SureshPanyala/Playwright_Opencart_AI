/**
 * Test Case: End-to-End Shopping Flow
 *
 * Tags: @master @sanity @regression @end-to-end @web
 *
 * Steps:
 * 1) Open the application
 * 2) Register a new customer with unique data
 * 3) Verify successful registration
 * 4) Log out
 * 5) Log in again with the new credentials
 * 6) Verify successful authentication
 * 7) Search for a known product
 * 8) Open the product details page
 * 9) Add the product to the cart
 * 10) Open the shopping cart
 * 11) Verify product, quantity, price and cart total
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-end shopping flow test @master @sanity @regression @end-to-end @web', async ({
    homePage,
    registerPage,
    loginPage,
    myAccountPage,
    logoutPage,
    searchResultsPage,
    productPage,
    cartPage,
}) => {
    const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

    // Unique customer data for every run
    const customer = RandomDataUtil.generateCustomerRegistrationPayload();
    customer.email = customer.email.replace('@', `${Date.now()}@`);

    await test.step('1) Open the application and navigate to Register page', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
    });

    await test.step('2) Register a new customer', async () => {
        await registerPage.completeRegistration(customer);
    });

    await test.step('3) Verify successful registration', async () => {
        expect(await registerPage.isAccountCreated()).toBeTruthy();
    });

    await test.step('4) Log out', async () => {
        await myAccountPage.clickLogout();
        expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
    });

    await test.step('5) Log in with the newly created credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.login(customer.email, customer.password);
    });

    await test.step('6) Verify successful authentication', async () => {
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('7) Search for the product', async () => {
        await homePage.searchProduct(productName);
        expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    });

    await test.step('8) Open the product details page', async () => {
        await searchResultsPage.selectProduct(productName);
        expect(await productPage.getProductName()).toBe(productName);
    });

    await test.step('9) Add the product to the cart', async () => {
        await productPage.clickAddToCart();
        expect(await productPage.isAddedToCartSuccessDisplayed()).toBeTruthy();
    });

    await test.step('10) Open the shopping cart', async () => {
        await homePage.clickShoppingCart();
        expect(await cartPage.isCartPageExists()).toBeTruthy();
    });

    await test.step('11) Verify product, quantity, price and cart total', async () => {
        expect(await cartPage.getProductName()).toContain(productName);
        expect(await cartPage.getQuantity()).toBe(productQuantity);
        expect(await cartPage.getUnitPrice()).toBe(totalPrice);
        expect(await cartPage.getCartTotal()).toBe(totalPrice);
    });

    console.log('✅ ✔️ End-to-end shopping flow completed successfully!');
});
