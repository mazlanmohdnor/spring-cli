#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generate_1 = require("./commands/generate");
const readline_1 = __importDefault(require("readline"));
const figlet = require("figlet");
console.log(figlet.textSync("Spring Generator"));
const program = new commander_1.Command();
program
    .version('1.0.0')
    .description('A CLI tool to generate Spring Boot Files')
    .option('-r, --route <routePath>', 'Specify route path')
    .option('-c, --controller <controllerName>', 'Specify controller name')
    .parse(process.argv);
const options = program.opts();
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Enter controller name: ', (controllerName) => {
    rl.question('Enter module name: ', (moduleName) => {
        rl.question('Enter entity name: ', (entityName) => {
            rl.question('Enter service SO name: ', (serviceSO) => {
                rl.question('Enter route path: ', (routePath) => {
                    rl.close();
                    const moduleNameLowerCase = moduleName.toLowerCase();
                    const routePathLowerCase = routePath.toLowerCase();
                    const options = {
                        moduleNameLowerCase,
                        modelNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Model`,
                        entityNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Entity`,
                        serviceSOPascalCase: serviceSO.charAt(0).toUpperCase() + serviceSO.slice(1) + 'SO',
                        serviceSOCamelCase: serviceSO.charAt(0).toLowerCase() + serviceSO.slice(1) + 'SO',
                        routePathLowerCase,
                        controllerNamePascalCase: controllerName.charAt(0).toUpperCase() + controllerName.slice(1) + 'Controller'
                    };
                    (0, generate_1.generateSpringBootController)(options);
                });
            });
        });
    });
});
//# sourceMappingURL=index.js.map