# cypress-bobril

Cypress commands for searching bobril components.

## Adding to project

Add following lines to your _commands.ts_:

```tsx
/// <reference types="cypress-bobril" />

import "cypress-bobril/commands";
```

## How to develope

Prerequisites: installed [bbcore](https://github.com/bobril/bbcore).

To develope and debug commands just run testing bobril page withine _sampleApp_ by command:

```bash
bb
```

Then in the root directory install dependencies and run Cypress:

```bash
yarn
npx cypress open
```
