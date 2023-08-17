#! /usr/bin/env node

import { Command  } from 'commander';
import { ControllerData, generateSpringBootController } from './commands/generate';
import readline from 'readline';
const figlet = require("figlet");

console.log(figlet.textSync("Spring Generator"));
const program = new Command();
program
    .version('1.0.0')
    .description('A CLI tool to generate Spring Boot Files')
    .option('-r, --route <routePath>', 'Specify route path')
    .option('-c, --controller <controllerName>', 'Specify controller name')
    .parse(process.argv);

const options = program.opts();

const rl = readline.createInterface({
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

                    const options: ControllerData = {
                        moduleNameLowerCase,
                        modelNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Model`,
                        entityNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Entity`,
                        serviceSOPascalCase: serviceSO.charAt(0).toUpperCase() + serviceSO.slice(1) + 'SO',
                        serviceSOCamelCase: serviceSO.charAt(0).toLowerCase() + serviceSO.slice(1) + 'SO',
                        routePathLowerCase,
                        controllerNamePascalCase: controllerName.charAt(0).toUpperCase() + controllerName.slice(1) + 'Controller'
                    };

                    generateSpringBootController(options);
                });
            });
        });
    });
});


