// plugins file

import webpackPreprocessor = require("@cypress/webpack-preprocessor");
import cfg = require("../../webpack.config");

function register(on: Cypress.PluginEvents): void {
    const options = {
        webpackOptions: cfg as any,
        watchOptions: {},
    };
    on("file:preprocessor", webpackPreprocessor(options) as (file: any) => string | Promise<string>);
}

export = register;
