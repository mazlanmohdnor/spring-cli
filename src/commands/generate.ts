import * as fs from 'fs';
import * as path from 'path';

const templatePath = path.join(__dirname, 'templates', 'ControllerTemplate.txt');
const ServiceSOPath = path.join(__dirname, 'templates', 'ServiceSO.txt');
const ServiceSOImplePath = path.join(__dirname, 'templates', 'ServiceSOImple.txt');

export interface ControllerData {
    moduleNameLowerCase: string;
    modelNamePascalCase: string;
    entityNamePascalCase: string;
    serviceSOPascalCase: string;
    serviceSOCamelCase: string;
    routePathLowerCase: string;
    controllerNamePascalCase: string;
    repositoryNamePascalCase: string;
    repositoryNameCamelCase: string;
    [key: string]: string; // Allow dynamic property access
}

export function generateController(data: ControllerData): string {
    const template = fs.readFileSync(templatePath, 'utf-8');
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}

export function generateService(data: ControllerData): string {
    const template = fs.readFileSync(ServiceSOPath, 'utf-8');
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}

export function generateServiceImpl(data: ControllerData): string {
    const template = fs.readFileSync(ServiceSOImplePath, 'utf-8');
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}

export function generateSpringBootController(params: ControllerData): void {
    const generatedCode = generateController(params);
    const fileName = `${params.controllerNamePascalCase}Controller.java`;
    fs.writeFileSync(fileName, generatedCode, 'utf-8');
}

export function generateSpringBootService(params: ControllerData): void {
    const generatedService = generateService(params);
    const generatedServiceImpl = generateServiceImpl(params);
    const serviceSO = `${params.controllerNamePascalCase}SO.java`;
    const serviceSOImpl = `${params.controllerNamePascalCase}SOImpl.java`;

    fs.writeFileSync(serviceSO, generatedService, 'utf-8');
    fs.writeFileSync(serviceSOImpl, generatedServiceImpl, 'utf-8');
}