/// <reference types="cypress" />
/// <reference types="bbseeker" />

declare global {
  interface Window extends IBobrilWindow {
    DEBUG: boolean;
    BBSeeker?: any;
  }
}

declare namespace Cypress {
  interface Chainable<Subject> {
    injectBBSeeker(): Cypress.Chainable<void>;
    /**
     * Performs recursive search of a page virtual DOM starting from bobril root objects. All matching objects are returned as instances of HTMLElement.
     * @param bbSeekerSelector search expression, see examples in node_modules/bbseeker/lib.ts
     * @param options (optional) Cypress.Timeoutable options definition
     * @returns found instances of HTMLElement
     */
    findElements(
      bbSeekerSelector: string,
      options?: Partial<Cypress.Timeoutable>
    ): Chainable<JQuery<HTMLElement>>;
    /**
     * Returns selected bobril data node value.
     * @param selector BBSeeker search expression, see examples in node_modules/bbseeker/lib.ts
     * @param dataName data node name
     * @param options (optional) Cypress.Timeoutable options definition
     * @returns selected bobril data node value
     */
    getData<TData>(
      selector: string,
      dataName: string,
      options?: Partial<Cypress.Timeoutable>
    ): Chainable<TData[]>;
    /**
     * Returns selected bobril property value.
     * @param selector BBSeeker search expression, see examples in node_modules/bbseeker/lib.ts
     * @param dataPath property path relative to the virtual component/object
     * @param options (optional) Cypress.Timeoutable options definition
     * @returns selected bobril property value
     */
    getProperty<TData>(
      selector: string,
      dataPath: string,
      options?: Partial<Cypress.Timeoutable>
    ): Chainable<TData[]>;
    verifyUpcomingAssertions<TValue>(
      value: TValue,
      options?: Object,
      retryOptions?: Object
    ): TValue;
    tryWithAssertionVerify<TValue>(
      findFn: (window: Window) => TValue,
      options?: Partial<Cypress.Timeoutable>
    ): Cypress.Chainable<TValue>;
  }
}
