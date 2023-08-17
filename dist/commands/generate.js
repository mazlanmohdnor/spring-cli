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
exports.generateSpringBootService = exports.generateSpringBootController = exports.generateServiceImpl = exports.generateService = exports.generateController = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const templatePath = path.join(__dirname, 'templates', 'ControllerTemplate.txt');
const ServiceSOPath = path.join(__dirname, 'templates', 'ServiceSO.txt');
const ServiceSOImplePath = path.join(__dirname, 'templates', 'ServiceSOImple.txt');
function generateController(data) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}
exports.generateController = generateController;
function generateService(data) {
    const template = fs.readFileSync(ServiceSOPath, 'utf-8');
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}
exports.generateService = generateService;
function generateServiceImpl(data) {
    const template = fs.readFileSync(ServiceSOImplePath, 'utf-8');
    return template.replace(/\${(.*?)}/g, (_, match) => data[match.trim()] || '');
}
exports.generateServiceImpl = generateServiceImpl;
function generateSpringBootController(params) {
    const generatedCode = generateController(params);
    const fileName = `${params.controllerNamePascalCase}Controller.java`;
    fs.writeFileSync(fileName, generatedCode, 'utf-8');
}
exports.generateSpringBootController = generateSpringBootController;
function generateSpringBootService(params) {
    const generatedService = generateService(params);
    const generatedServiceImpl = generateServiceImpl(params);
    const serviceSO = `${params.controllerNamePascalCase}SO.java`;
    const serviceSOImpl = `${params.controllerNamePascalCase}SOImpl.java`;
    fs.writeFileSync(serviceSO, generatedService, 'utf-8');
    fs.writeFileSync(serviceSOImpl, generatedServiceImpl, 'utf-8');
}
exports.generateSpringBootService = generateSpringBootService;
//# sourceMappingURL=generate.js.map