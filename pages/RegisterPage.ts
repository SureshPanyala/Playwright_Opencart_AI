import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkPrivacyPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgAccountCreated: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.txtFirstName = page.getByRole('textbox', { name: '* First Name' });
        this.txtLastName = page.getByRole('textbox', { name: '* Last Name' });
        this.txtEmail = page.getByRole('textbox', { name: '* E-Mail' });
        this.txtTelephone = page.getByRole('textbox', { name: '* Telephone' });
        this.txtPassword = page.getByRole('textbox', { name: '* Password', exact: true });
        this.txtConfirmPassword = page.getByRole('textbox', { name: '* Password Confirm' });
        this.chkPrivacyPolicy = page.getByRole('checkbox');
        this.btnContinue = page.getByRole('button', { name: 'Continue' });
        this.msgAccountCreated = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    }

    /**
     * Fills the registration form, accepts the privacy policy and submits it
     * @param userData - Customer details used for registration
     */
    async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
    }): Promise<void> {
        try {
            await this.txtFirstName.fill(userData.firstName);
            await this.txtLastName.fill(userData.lastName);
            await this.txtEmail.fill(userData.email);
            await this.txtTelephone.fill(userData.telephone);
            await this.txtPassword.fill(userData.password);
            await this.txtConfirmPassword.fill(userData.password);
            await this.chkPrivacyPolicy.check();
            await this.btnContinue.click();
        } catch (error) {
            console.log(`Error completing registration: ${error}`);
            throw error;
        }
    }

    /**
     * Checks whether the registration success message is displayed
     * @returns Promise<boolean> - true if the account was created
     */
    async isAccountCreated(): Promise<boolean> {
        try {
            await this.msgAccountCreated.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking registration success: ${error}`);
            return false;
        }
    }
}
