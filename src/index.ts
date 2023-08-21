#!/usr/bin/env node

import { Command } from 'commander';
import readline from 'readline';
import figlet from 'figlet';
import chalk from 'chalk';

import {
    generateSpringBootController,
    generateSpringBootService,
    ControllerData,
    generateSpringBootRepository,
    generateSpringBootMapper
} from './commands/generate';

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
    console.log(chalk.greenBright(figlet.textSync('NGOS File Generator')));

    console.log(chalk.cyanBright('Welcome to the NGOS Spring File Generator CLI!'));
    console.log(chalk.cyanBright('This tool helps you generate Spring Boot files easily.'));
    console.log(chalk.cyanBright('Usage: spring'));

    const program = new Command()
        .version('1.0.1-alpha-7')
        .description(chalk.blueBright('🌼 A CLI tool to generate Spring Boot Files 🌼'))
        .parse(process.argv);

    const generateChoice = await promptUser(chalk.magentaBright('🚀 What would you like to generate? (c: Controller, s: Service, r: Repository, m: Mapper, a: All): '));
    const moduleName = await promptUser(chalk.yellowBright('📦 Enter module name (ex: user): '));
    const entityName = await promptUser(chalk.yellowBright('👜 Enter entity name (ex: user [without Entity keyword]): '));

    const moduleNameLowerCase = moduleName.toLowerCase();
    const entityNamePascalCase = `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Entity`;
    const controllerNamePascalCase = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    const repositoryNamePascalCase = controllerNamePascalCase;
    const repositoryNameCamelCase = moduleNameLowerCase;

    const params: ControllerData = {
        moduleNameLowerCase,
        routePathLowerCase: '',
        modelNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Model`,
        entityNamePascalCase,
        controllerNamePascalCase,
        repositoryNamePascalCase,
        repositoryNameCamelCase
    };

    if (generateChoice.toLowerCase() === 'c' || generateChoice.toLowerCase() === 'a') {
        const serviceSO = await promptUser(chalk.yellowBright('🔧 Enter service SO name (ex: user [without SO keyword]): '));
        const serviceSOPascalCase = serviceSO.charAt(0).toUpperCase() + serviceSO.slice(1);
        const serviceSOCamelCase = serviceSO.charAt(0).toLowerCase() + serviceSO.slice(1);

        params.serviceSOPascalCase = serviceSOPascalCase;
        params.serviceSOCamelCase = serviceSOCamelCase;

        const routePath = await promptUser(chalk.yellowBright('🌐 Enter route path (ex: user [endpoint path]): '));
        params.routePathLowerCase = routePath.toLowerCase();
        generateSpringBootController(params);

        if (generateChoice.toLowerCase() === 'a') {
            generateSpringBootService(params);
            generateSpringBootRepository(params);
            generateSpringBootMapper(params);
        }
    } else if (generateChoice.toLowerCase() === 's' || generateChoice.toLowerCase() === 'r' || generateChoice.toLowerCase() === 'm') {
        const type = generateChoice.toLowerCase() === 's' ? 'Service' : (generateChoice.toLowerCase() === 'r' ? 'Repository' : 'Mapper');
        const serviceSO = await promptUser(chalk.yellowBright(`🔧 Enter ${type} name (ex: user [without ${type} keyword]): `));
        const serviceSOPascalCase = serviceSO.charAt(0).toUpperCase() + serviceSO.slice(1);
        const serviceSOCamelCase = serviceSO.charAt(0).toLowerCase() + serviceSO.slice(1);
        params.serviceSOPascalCase = serviceSOPascalCase;
        params.serviceSOCamelCase = serviceSOCamelCase;
        generateSpringBootController(params);
    } else {
        console.log(chalk.redBright('❌ Invalid choice.'));
    }

    rl.close();
};



run();
