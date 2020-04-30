// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
// eslint-disable-next-line spaced-comment
/// <reference types="bbseeker" />

declare global {
    interface Window extends IBobrilWindow {
        DEBUG: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        BBSeeker?: any;
    }
}

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Visit the given url and injects BB Seeker
         *
         * @param {string} url The URL to visit. If relative uses `baseUrl`
         * @param {VisitOptions} [options] Pass in an options object to change the default behavior of `cy.visit()`
         * @see https://on.cypress.io/visit
         * @example
         *    cy.visit('http://localhost:3000')
         *    cy.visit('/somewhere') // opens ${baseUrl}/somewhere
         *    cy.visit({
         *      url: 'http://google.com',
         *      method: 'POST'
         *    })
         *
         */
        visitWithBBSeeker(url: string, options?: Partial<VisitOptions>): Chainable<Window>;
        visitWithBBSeeker(options: Partial<VisitOptions> & { url: string }): Chainable<Window>;
        injectBBSeeker(options?: Partial<Cypress.Loggable>): Cypress.Chainable<Window>;
        /**
         * Performs recursive search of a page virtual DOM starting from bobril root objects. All matching objects are returned as instances of HTMLElement.
         * @param bbSeekerSelector search expression, see examples in node_modules/bbseeker/lib.ts
         * @param options (optional) Cypress.Timeoutable options definition
         * @returns found instances of HTMLElement
         */
        findElements(bbSeekerSelector: string, options?: Partial<Cypress.Timeoutable>): Chainable<JQuery<HTMLElement>>;
        /**
         * Returns selected bobril data node value.
         * @param selector BBSeeker search expression, see examples in node_modules/bbseeker/lib.ts
         * @param dataName data node name
         * @param options (optional) Cypress.Timeoutable options definition
         * @returns selected bobril data node value
         */
        getData<TData>(selector: string, dataName: string, options?: Partial<Cypress.Timeoutable>): Chainable<TData[]>;
        /**
         * Returns selected bobril property value.
         * @param selector BBSeeker search expression, see examples in node_modules/bbseeker/lib.ts
         * @param dataPath property path relative to the virtual component/object
         * @param options (optional) Cypress.Timeoutable options definition
         * @returns selected bobril property value
         */
        getProperty<TData>(selector: string, dataPath: string, options?: Partial<Cypress.Timeoutable>): Chainable<TData[]>;
        verifyUpcomingAssertions<TValue>(value: TValue, options?: Object, retryOptions?: Object): TValue;
        tryWithAssertionVerify<TValue>(
            findFn: (window: Window) => TValue,
            options?: Partial<Cypress.Timeoutable>
        ): Cypress.Chainable<TValue>;
    }
}
