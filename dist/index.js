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
const generate_1 = require("./commands/generate");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const promptUser = (question) => new Promise((resolve) => {
    rl.question(question, (answer) => {
        resolve(answer);
    });
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(figlet_1.default.textSync('Spring Generator'));
    const program = new commander_1.Command();
    program
        .version('1.0.0')
        .description('A CLI tool to generate Spring Boot Files')
        .option('-r, --route <routePath>', 'Specify route path')
        .option('-c, --controller <controllerName>', 'Specify controller name')
        .parse(process.argv);
    const options = program.opts();
    const moduleName = yield promptUser('Enter module name (ex: user): ');
    const routePath = options.route || (yield promptUser('Enter route path (ex: user [endpoint path]): '));
    const controllerName = yield promptUser('Enter controller name: ');
    const entityName = yield promptUser('Enter entity name (ex: user [without Entity keyword]): ');
    const serviceSO = yield promptUser('Enter service SO name (ex: user [without SO keyword]): ');
    const moduleNameLowerCase = moduleName.toLowerCase();
    const routePathLowerCase = routePath.toLowerCase();
    const params = {
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
    (0, generate_1.generateSpringBootController)(params);
    (0, generate_1.generateSpringBootService)(params);
    rl.close();
});
run();
//# sourceMappingURL=index.js.map