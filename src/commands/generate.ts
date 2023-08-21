import * as fs from 'fs';
import * as path from 'path';

const templatePath = path.join(__dirname, 'templates', 'ControllerTemplate.txt');
const repositoryPath = path.join(__dirname, 'templates', 'RepositoryTemplate.txt');
const mapperPath = path.join(__dirname, 'templates', 'MapperTemplate.txt');
const ServiceSOPath = path.join(__dirname, 'templates', 'ServiceSO.txt');
const ServiceSOImplPath = path.join(__dirname, 'templates', 'ServiceSOImpl.txt');

export interface ControllerData {
    moduleNameLowerCase: string;
    modelNamePascalCase: string;
    entityNamePascalCase: string;
    serviceSOPascalCase?: string;
    serviceSOCamelCase?: string;
    routePathLowerCase: string;
    controllerNamePascalCase: string;
    repositoryNamePascalCase: string;
    repositoryNameCamelCase: string;
    // [key: string]: string; // Allow dynamic property access
}

export function generateController(data: ControllerData): string {
    const template = fs.readFileSync(templatePath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}

export function generateRepository(data: ControllerData): string {
    const template = fs.readFileSync(repositoryPath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}

export function generateMapper(data: ControllerData): string {
    const template = fs.readFileSync(mapperPath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}

export function generateService(params: ControllerData): string {
    const directoryPath = `ngos-service/src/main/java/my/com/sapura/ngos/service/application/${params.moduleNameLowerCase}`;

    const template = fs.readFileSync(ServiceSOPath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => params[match.trim()] || '');
}

export function generateServiceImpl(params: ControllerData): string {

    const template = fs.readFileSync(ServiceSOImplPath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => params[match.trim()] || '');
}

export function generateSpringBootController(params: ControllerData): void {
    const directoryPath = `ngos-web/src/main/java/my/com/sapura/ngos/controller/application/${params.moduleNameLowerCase}`;

    const generatedCode = generateController(params);
    const fileName = `${params.controllerNamePascalCase}Controller.java`;
    const filePath = path.join(directoryPath, fileName);

    // Check if the directory exists, and if not, create it
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true }); // Use { recursive: true } to create parent directories if they don't exist
    }

    try {
        fs.writeFileSync(filePath, generatedCode, 'utf-8');
        console.log(`✅ Successfully generated ${filePath}`);
    } catch (error: any) {
        console.error(`❌ Error generating ${filePath}: ${error.message}`);
    }
}

export function generateSpringBootRepository(params: ControllerData): void {
    const directoryPath = `ngos-repository/src/main/java/my/com/sapura/ngos/orm/repository/${params.moduleNameLowerCase}`;

    const generatedCode = generateRepository(params);
    const fileName = `${params.controllerNamePascalCase}Repository.java`;
    const filePath = path.join(directoryPath, fileName);

    // Check if the directory exists, and if not, create it
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true }); // Use { recursive: true } to create parent directories if they don't exist
    }

    try {
        fs.writeFileSync(filePath, generatedCode, 'utf-8');
        console.log(`✅ Successfully generated ${fileName}`);
    } catch (error: any) {
        console.error(`❌ Error generating ${fileName}: ${error.message}`);
    }
}

export function generateSpringBootMapper(params: ControllerData): void {
    const directoryPath = `ngos-mapper/src/main/java/my/com/sapura/ngos/mapper/${params.moduleNameLowerCase}`;

    const generatedCode = generateMapper(params);
    const fileName = `${params.controllerNamePascalCase}Mapper.java`;
    const filePath = path.join(directoryPath, fileName);

    // Check if the directory exists, and if not, create it
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true }); // Use { recursive: true } to create parent directories if they don't exist
    }

    try {
        fs.writeFileSync(filePath, generatedCode, 'utf-8');
        console.log(`✅ Successfully generated ${fileName}`);
    } catch (error: any) {
        console.error(`❌ Error generating ${fileName}: ${error.message}`);
    }
}

export function generateSpringBootService(params: ControllerData): void {
    const directoryPath = `ngos-service/src/main/java/my/com/sapura/ngos/service/application/${params.moduleNameLowerCase}`;

    const generatedService = generateService(params);
    const generatedServiceImpl = generateServiceImpl(params);
    const serviceSO = `${params.controllerNamePascalCase}SO.java`;
    const serviceSOImpl = `${params.controllerNamePascalCase}SOImpl.java`;
    const serviceSOPath = path.join(directoryPath, serviceSO);
    const serviceSOImplPath = path.join(directoryPath, serviceSOImpl);

    // Check if the directory exists, and if not, create it
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true }); // Use { recursive: true } to create parent directories if they don't exist
    }

    try {
        fs.writeFileSync(serviceSOPath, generatedService, 'utf-8');
        fs.writeFileSync(serviceSOImplPath, generatedServiceImpl, 'utf-8');
        console.log(`✅ Successfully generated ${serviceSO} and ${serviceSOImpl}`);
    } catch (error: any) {
        console.error(`❌ Error generating ${serviceSO} and ${serviceSOImpl}: ${error.message}`);
    }
}

