#!/usr/bin/env node

import { Command } from 'commander';
import readline from 'readline';
import figlet from 'figlet';
import chalk from 'chalk';

import { generateSpringBootController, generateSpringBootService, ControllerData } from './commands/generate';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptUser = (question: string): Promise<string> => new Promise((resolve) => {
    rl.question(chalk.yellowBright(question), (answer) => {
        resolve(answer);
    });
});

const run = async () => {
    console.log(chalk.greenBright(figlet.textSync('Spring Generator')));

    const program = new Command();
    program
        .version('1.0.1-alpha-3')
        .description(chalk.blueBright('🌼 A CLI tool to generate Spring Boot Files 🌼'))
        .option('-r, --route <routePath>', chalk.cyan('Specify route path'))
        .option('-c, --controller <controllerName>', chalk.cyan('Specify controller name'))
        .option('-s, --service <serviceName>', chalk.cyan('Specify service name'))
        .parse(process.argv);

    const generateChoice = await promptUser(chalk.magentaBright('🚀 What would you like to generate? (c: Controller, s: Service, a: All): '));

    if (generateChoice.toLowerCase() === 'c' || generateChoice.toLowerCase() === 'a') {
        const moduleName = await promptUser(chalk.yellowBright('📦 Enter module name (ex: user): '));
        const routePath = await promptUser(chalk.yellowBright('🌐 Enter route path (ex: user [endpoint path]): '));
        const entityName = await promptUser(chalk.yellowBright('🏛️ Enter entity name (ex: user [without Entity keyword]): '));
        const serviceSO = await promptUser(chalk.yellowBright('🔧 Enter service SO name (ex: user [without SO keyword]): '));

        const moduleNameLowerCase = moduleName.toLowerCase();
        const routePathLowerCase = routePath.toLowerCase();

        const params: ControllerData = {
            moduleNameLowerCase,
            routePathLowerCase,
            modelNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Model`,
            entityNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Entity`,
            serviceSOPascalCase: serviceSO.charAt(0).toUpperCase() + serviceSO.slice(1),
            serviceSOCamelCase: serviceSO.charAt(0).toLowerCase() + serviceSO.slice(1),
            controllerNamePascalCase: moduleName.charAt(0).toUpperCase() + moduleName.slice(1),
            repositoryNamePascalCase: moduleName.charAt(0).toUpperCase() + moduleName.slice(1),
            repositoryNameCamelCase: moduleName.charAt(0).toLowerCase() + moduleName.slice(1)
        };

        generateSpringBootController(params);

        if (generateChoice.toLowerCase() === 'a') {
            generateSpringBootService(params);
        }
    } else if (generateChoice.toLowerCase() === 's') {
        const moduleName = await promptUser(chalk.yellowBright('📦 Enter module name (ex: user): '));
        const entityName = await promptUser(chalk.yellowBright('🏛️ Enter entity name (ex: user [without Entity keyword]): '));
        const serviceSO = await promptUser(chalk.yellowBright('🔧 Enter service SO name (ex: user [without SO keyword]): '));

        const moduleNameLowerCase = moduleName.toLowerCase();

        const params: ControllerData = {
            moduleNameLowerCase,
            routePathLowerCase: '',
            modelNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Model`,
            entityNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Entity`,
            serviceSOPascalCase: serviceSO.charAt(0).toUpperCase() + serviceSO.slice(1),
            serviceSOCamelCase: serviceSO.charAt(0).toLowerCase() + serviceSO.slice(1),
            controllerNamePascalCase: moduleName.charAt(0).toUpperCase() + moduleName.slice(1),
            repositoryNamePascalCase: moduleName.charAt(0).toUpperCase() + moduleName.slice(1),
            repositoryNameCamelCase: moduleName.charAt(0).toLowerCase() + moduleName.slice(1)
        };

        generateSpringBootService(params);

    } else {
        console.log(chalk.redBright('❌ Invalid choice.'));
    }

    rl.close();
};

run();
