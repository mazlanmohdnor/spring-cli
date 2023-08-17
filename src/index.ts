#!/usr/bin/env node

import { Command } from 'commander';
import readline from 'readline';
import figlet from 'figlet';
import { generateSpringBootController, ControllerData, generateSpringBootService } from './commands/generate';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptUser = (question: string): Promise<string> => new Promise((resolve) => {
    rl.question(question, (answer) => {
        resolve(answer);
    });
});

const run = async () => {
    console.log(figlet.textSync('Spring Generator'));

    const program = new Command();
    program
        .version('1.0.0')
        .description('A CLI tool to generate Spring Boot Files')
        .option('-r, --route <routePath>', 'Specify route path')
        .option('-c, --controller <controllerName>', 'Specify controller name')
        .parse(process.argv);

    const options = program.opts();

    const moduleName = await promptUser('Enter module name (ex: user): ');
    const routePath = options.route || await promptUser('Enter route path (ex: user [endpoint path]): ');
    const controllerName = await promptUser('Enter controller name: ');
    const entityName = await promptUser('Enter entity name (ex: user [without Entity keyword]): ');
    const serviceSO = await promptUser('Enter service SO name (ex: user [without SO keyword]): ');

    const moduleNameLowerCase = moduleName.toLowerCase();
    const routePathLowerCase = routePath.toLowerCase();

    const params: ControllerData = {
        moduleNameLowerCase,
        routePathLowerCase,
        modelNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Model`,
        entityNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Entity`,
        serviceSOPascalCase: serviceSO.charAt(0).toUpperCase() + serviceSO.slice(1),
        serviceSOCamelCase: serviceSO.charAt(0).toLowerCase() + serviceSO.slice(1),
        controllerNamePascalCase: controllerName.charAt(0).toUpperCase() + controllerName.slice(1),
        repositoryNamePascalCase: controllerName.charAt(0).toUpperCase() + controllerName.slice(1),
        repositoryNameCamelCase: controllerName.charAt(0).toLowerCase() + controllerName.slice(1)
    };

    generateSpringBootController(params);
    generateSpringBootService(params);

    rl.close();
};

run();
