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
    console.log(chalk_1.default.greenBright(figlet_1.default.textSync('NGOS File Generator')));
    console.log(chalk_1.default.cyanBright('Welcome to the NGOS Spring File Generator CLI!'));
    console.log(chalk_1.default.cyanBright('This tool helps you generate Spring Boot files easily.'));
    console.log(chalk_1.default.cyanBright('Usage: spring'));
    const program = new commander_1.Command()
        .version('1.0.1-alpha-7')
        .description(chalk_1.default.blueBright('🌼 A CLI tool to generate Spring Boot Files 🌼'))
        .parse(process.argv);
    const generateChoice = yield promptUser(chalk_1.default.magentaBright('🚀 What would you like to generate? (c: Controller, s: Service, r: Repository, m: Mapper, a: All): '));
    const moduleName = yield promptUser(chalk_1.default.yellowBright('📦 Enter module name (ex: user): '));
    const entityName = yield promptUser(chalk_1.default.yellowBright('👜 Enter entity name (ex: user [without Entity keyword]): '));
    const moduleNameLowerCase = moduleName.toLowerCase();
    const entityNamePascalCase = `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Entity`;
    const controllerNamePascalCase = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    const repositoryNamePascalCase = controllerNamePascalCase;
    const repositoryNameCamelCase = moduleNameLowerCase;
    const params = {
        moduleNameLowerCase,
        routePathLowerCase: '',
        modelNamePascalCase: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)}Model`,
        entityNamePascalCase,
        controllerNamePascalCase,
        repositoryNamePascalCase,
        repositoryNameCamelCase
    };
    if (generateChoice.toLowerCase() === 'c' || generateChoice.toLowerCase() === 'a') {
        const serviceSO = yield promptUser(chalk_1.default.yellowBright('🔧 Enter service SO name (ex: user [without SO keyword]): '));
        const serviceSOPascalCase = serviceSO.charAt(0).toUpperCase() + serviceSO.slice(1);
        const serviceSOCamelCase = serviceSO.charAt(0).toLowerCase() + serviceSO.slice(1);
        params.serviceSOPascalCase = serviceSOPascalCase;
        params.serviceSOCamelCase = serviceSOCamelCase;
        const routePath = yield promptUser(chalk_1.default.yellowBright('🌐 Enter route path (ex: user [endpoint path]): '));
        params.routePathLowerCase = routePath.toLowerCase();
        (0, generate_1.generateSpringBootController)(params);
        if (generateChoice.toLowerCase() === 'a') {
            (0, generate_1.generateSpringBootService)(params);
            (0, generate_1.generateSpringBootRepository)(params);
            (0, generate_1.generateSpringBootMapper)(params);
        }
    }
    else if (generateChoice.toLowerCase() === 's' || generateChoice.toLowerCase() === 'r' || generateChoice.toLowerCase() === 'm') {
        const type = generateChoice.toLowerCase() === 's' ? 'Service' : (generateChoice.toLowerCase() === 'r' ? 'Repository' : 'Mapper');
        const serviceSO = yield promptUser(chalk_1.default.yellowBright(`🔧 Enter ${type} name (ex: user [without ${type} keyword]): `));
        const serviceSOPascalCase = serviceSO.charAt(0).toUpperCase() + serviceSO.slice(1);
        const serviceSOCamelCase = serviceSO.charAt(0).toLowerCase() + serviceSO.slice(1);
        params.serviceSOPascalCase = serviceSOPascalCase;
        params.serviceSOCamelCase = serviceSOCamelCase;
        (0, generate_1.generateSpringBootController)(params);
    }
    else {
        console.log(chalk_1.default.redBright('❌ Invalid choice.'));
    }
    rl.close();
});
run();
//# sourceMappingURL=index.js.map