# cypress-bobril

Cypress commands for searching bobril components.

## Adding to project

Add following lines to your _commands.ts_:

```tsx
/// <reference types="cypress-bobril" />

import "cypress-bobril/commands";
```

and change _tsconfig.json_:

```json
{
  "compilerOptions": {
     ...
    "types": ["cypress-bobril"],
    ...
  },
  ...
}
```

## How to use

cypress-bobril is command plugin, so it adds following commands interacting with [BBSeeker](https://github.com/bobril/bb-seeker) (tool for exploring virtual-dom and its data):

-   `cy.injectBBSeeker` - Injects **BBSeeker** to testing window - **injection is mandatory** to run all the other commands.
-   `cy.visitWithBBSeeker` - Visits address using `cy.visit` and injects BBSeeker to window using `cy.injectBBSeeker`.
-   `cy.findElements` - Performs recursive search of a page virtual DOM starting from bobril root objects. All matching objects are returned as instances of HTMLElement
-   `cy.getData` - Returns selected bobril data node value.
-   `cy.getProperty` - Returns selected bobril property value.

## How to develope

Prerequisites: installed [bbcore](https://github.com/bobril/bbcore).

To develope and debug commands just run testing bobril page within _sampleApp_ by command:

```bash
bb
```

Then in the root directory install dependencies and run Cypress:

```bash
yarn
npx cypress open
```
