/// <reference types="cypress" />
/// <reference types="./index" />

export {};

interface IBBSeeker {
  findElements(
    expression: string,
    root?: HTMLElement,
    ifVNodeFindNearestChildElm?: boolean
  ): HTMLElement[];
  getAttribute(
    expression: string,
    attributeName: string,
    root?: HTMLElement
  ): (string | undefined)[];
  getData<TValue = string>(
    expression: string,
    dataName: string,
    root?: HTMLElement,
    preserveType?: boolean
  ): (TValue | undefined)[];
  getProperty(
    expression: string,
    propertyPath: string,
    root?: HTMLElement
  ): (string | undefined)[];
}

declare global {
  interface Window {
    DEBUG: boolean;
    BBSeeker: IBBSeeker;
  }
}

interface IOptions extends Partial<Cypress.Timeoutable> {
  _log: Cypress.Log;
}

window.DEBUG = false;

Cypress.Commands.add(
  "tryWithAssertionVerify",
  <TValue>(
    findFn: (window: Window) => TValue,
    options: Partial<IOptions>
  ): PromiseLike<TValue> => {
    return cy.window({ log: false }).then(
      {
        timeout:
          (options?.timeout ?? Cypress.config("defaultCommandTimeout")) + 1000
      },
      window =>
        tryWithAssertionVerify(
          () => findFn(window),
          Object.assign({ retry: true, verify: true }, options)
        )
    );
  }
);

function tryWithAssertionVerify<TValue>(
  findFn: () => TValue | PromiseLike<TValue>,
  options?: Partial<IOptions>
): PromiseLike<TValue> {
  return Cypress.Promise.try(findFn).then(value => {
    return cy.verifyUpcomingAssertions(value, options, {
      onRetry: () => tryWithAssertionVerify(findFn, options)
    });
  });
}

Cypress.Commands.add(
  "findElements",
  {
    prevSubject: ["optional", "element"]
  },
  (
    subject: JQuery<HTMLElement> | undefined,
    selector: string,
    options?: Partial<IOptions>
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    const filledOptions: IOptions = Object.assign(options || {}, {
      _log: Cypress.log({ message: [selector], $el: subject })
    });

    return cy.tryWithAssertionVerify(
      window => bbFindElement(subject, window, selector, filledOptions),
      filledOptions
    );
  }
);

Cypress.Commands.add(
  "getData",
  {
    prevSubject: ["optional", "element"]
  },
  <TData>(
    subject: JQuery<HTMLElement> | undefined,
    selector: string,
    dataName: string,
    options?: Partial<IOptions>
  ): Cypress.Chainable<(TData | undefined)[]> => {
    const filledOptions: IOptions = Object.assign(options || {}, {
      _log: Cypress.log({ message: [`${selector}, data: ${dataName}`] })
    });

    return cy.tryWithAssertionVerify(
      window =>
        bbFindData<TData>(subject, window, selector, dataName, filledOptions),
      filledOptions
    );
  }
);

Cypress.Commands.add(
  "getProperty",
  {
    prevSubject: ["optional", "element"]
  },
  <TData>(
    subject: JQuery<HTMLElement> | undefined,
    selector: string,
    propertyPath: string,
    options?: Partial<IOptions>
  ): Cypress.Chainable<(TData | undefined)[]> => {
    const filledOptions: IOptions = Object.assign(options || {}, {
      _log: Cypress.log({ message: [`${selector}, property: ${propertyPath}`] })
    });

    return cy.tryWithAssertionVerify(
      window =>
        bbFindPropetry<TData>(
          subject,
          window,
          selector,
          propertyPath,
          filledOptions
        ),
      filledOptions
    );
  }
);

function bbFindElement(
  subject: JQuery<HTMLElement> | undefined,
  window: Window,
  selector: string,
  options: IOptions
): JQuery<HTMLElement> {
  const root = getRoot(subject);
  const result = Cypress.$(window.BBSeeker.findElements(selector, root));
  (result as Cypress.ObjectLike).selector = selector;
  log(options, result, selector);
  return result;
}

function log(
  options: IOptions,
  result: any,
  selector: string,
  params: Cypress.ObjectLike = {}
): void {
  const consoleProps = Object.assign(
    {
      Yielded: result,
      Elements: result.length,
      Selector: selector
    },
    params
  );

  options._log.set({
    $el: result,
    consoleProps: () => consoleProps
  });
}

function bbFindData<TData>(
  subject: JQuery<HTMLElement> | undefined,
  window: Window,
  selector: string,
  dataName: string,
  options: IOptions
): (TData | undefined)[] {
  const root = getRoot(subject);
  const result = window.BBSeeker.getData<TData>(selector, dataName, root, true);

  log(options, result, selector, { DataName: dataName });
  return result;
}

function bbFindPropetry<TData>(
  subject: JQuery<HTMLElement> | undefined,
  window: Window,
  selector: string,
  propertyPath: string,
  options: IOptions
): (TData | undefined)[] {
  const root = getRoot(subject);
  const result = window.BBSeeker.getProperty(selector, propertyPath, root);

  log(options, result, selector, { PropertyPath: propertyPath });
  return result as (TData | undefined)[];
}

Cypress.Commands.add("injectBBSeeker", () => {
  return cy.readFile("node_modules/bbseeker/lib.js").then(text => {
    cy.window({ log: false }).then(win => {
      (win as any).eval(text); //hack
    });
  });
});

function getRoot(
  subject: JQuery<HTMLElement> | undefined
): HTMLElement | undefined {
  if (subject) {
    return subject.get(0);
  }

  return undefined;
}
