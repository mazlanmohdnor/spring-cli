import * as fs from 'fs';
import * as path from 'path';

const templatePath = path.join(__dirname, 'templates', 'ControllerTemplate.txt');

export interface ControllerData {
    moduleNameLowerCase: string;
    modelNamePascalCase: string;
    entityNamePascalCase: string;
    serviceSOPascalCase: string;
    serviceSOCamelCase: string;
    routePathLowerCase: string;
    controllerNamePascalCase: string;
    [key: string]: string; // Allow dynamic property access
}

export function generateController(data: ControllerData): string {
    const template = fs.readFileSync(templatePath, 'utf-8');
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}

export function generateSpringBootController(params: ControllerData): void {
    const generatedCode = generateController(params);
    const fileName = `${params.controllerNamePascalCase}.java`;

    fs.writeFileSync(fileName, generatedCode, 'utf-8');
    console.log(`Generated ${fileName}`);
}
