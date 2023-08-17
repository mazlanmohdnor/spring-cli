#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const readline_1 = __importDefault(require("readline"));
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const generate_1 = require("./commands/generate");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const promptUser = (question) => new Promise((resolve) => {
    rl.question(chalk_1.default.yellowBright(question), (answer) => {
        resolve(answer);
    });
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.greenBright(figlet_1.default.textSync('Spring Generator')));
    const program = new commander_1.Command();
    program
        .version('1.0.0')
        .description(chalk_1.default.blueBright('🌼 A CLI tool to generate Spring Boot Files 🌼'))
        .option('-r, --route <routePath>', chalk_1.default.cyan('Specify route path'))
        .option('-c, --controller <controllerName>', chalk_1.default.cyan('Specify controller name'))
        .option('-s, --service <serviceName>', chalk_1.default.cyan('Specify service name'))
        .parse(process.argv);
    const generateChoice = yield promptUser(chalk_1.default.magentaBright('🚀 What would you like to generate? (c: Controller, s: Service, a: All): '));
    if (generateChoice.toLowerCase() === 'c' || generateChoice.toLowerCase() === 'a') {
        const moduleName = yield promptUser(chalk_1.default.yellowBright('📦 Enter module name (ex: user): '));
        const routePath = yield promptUser(chalk_1.default.yellowBright('🌐 Enter route path (ex: user [endpoint path]): '));
        const entityName = yield promptUser(chalk_1.default.yellowBright('🏛️ Enter entity name (ex: user [without Entity keyword]): '));
        const serviceSO = yield promptUser(chalk_1.default.yellowBright('🔧 Enter service SO name (ex: user [without SO keyword]): '));
        const moduleNameLowerCase = moduleName.toLowerCase();
        const routePathLowerCase = routePath.toLowerCase();
        const params = {
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
        (0, generate_1.generateSpringBootController)(params);
        if (generateChoice.toLowerCase() === 'a') {
            (0, generate_1.generateSpringBootService)(params);
        }
    }
    else if (generateChoice.toLowerCase() === 's') {
        const moduleName = yield promptUser(chalk_1.default.yellowBright('📦 Enter module name (ex: user): '));
        const entityName = yield promptUser(chalk_1.default.yellowBright('🏛️ Enter entity name (ex: user [without Entity keyword]): '));
        const serviceSO = yield promptUser(chalk_1.default.yellowBright('🔧 Enter service SO name (ex: user [without SO keyword]): '));
        const moduleNameLowerCase = moduleName.toLowerCase();
        const params = {
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
        (0, generate_1.generateSpringBootService)(params);
    }
    else {
        console.log(chalk_1.default.redBright('❌ Invalid choice.'));
    }
    rl.close();
});
run();
//# sourceMappingURL=index.js.map