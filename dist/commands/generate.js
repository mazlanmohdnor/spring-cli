"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSpringBootService = exports.generateSpringBootMapper = exports.generateSpringBootRepository = exports.generateSpringBootController = exports.generateServiceImpl = exports.generateService = exports.generateMapper = exports.generateRepository = exports.generateController = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const templatePath = path.join(__dirname, 'templates', 'ControllerTemplate.txt');
const repositoryPath = path.join(__dirname, 'templates', 'RepositoryTemplate.txt');
const mapperPath = path.join(__dirname, 'templates', 'MapperTemplate.txt');
const ServiceSOPath = path.join(__dirname, 'templates', 'ServiceSO.txt');
const ServiceSOImplPath = path.join(__dirname, 'templates', 'ServiceSOImpl.txt');
function generateController(data) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}
exports.generateController = generateController;
function generateRepository(data) {
    const template = fs.readFileSync(repositoryPath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}
exports.generateRepository = generateRepository;
function generateMapper(data) {
    const template = fs.readFileSync(mapperPath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}
exports.generateMapper = generateMapper;
function generateService(params) {
    const directoryPath = `ngos-service/src/main/java/my/com/sapura/ngos/service/application/${params.moduleNameLowerCase}`;
    const template = fs.readFileSync(ServiceSOPath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => params[match.trim()] || '');
}
exports.generateService = generateService;
function generateServiceImpl(params) {
    const template = fs.readFileSync(ServiceSOImplPath, 'utf-8');
    // @ts-ignore
    return template.replace(/\${(.*?)}/g, (_, match) => params[match.trim()] || '');
}
exports.generateServiceImpl = generateServiceImpl;
function generateSpringBootController(params) {
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
    }
    catch (error) {
        console.error(`❌ Error generating ${filePath}: ${error.message}`);
    }
}
exports.generateSpringBootController = generateSpringBootController;
function generateSpringBootRepository(params) {
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
    }
    catch (error) {
        console.error(`❌ Error generating ${fileName}: ${error.message}`);
    }
}
exports.generateSpringBootRepository = generateSpringBootRepository;
function generateSpringBootMapper(params) {
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
    }
    catch (error) {
        console.error(`❌ Error generating ${fileName}: ${error.message}`);
    }
}
exports.generateSpringBootMapper = generateSpringBootMapper;
function generateSpringBootService(params) {
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
    }
    catch (error) {
        console.error(`❌ Error generating ${serviceSO} and ${serviceSOImpl}: ${error.message}`);
    }
}
exports.generateSpringBootService = generateSpringBootService;
//# sourceMappingURL=generate.js.map