"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_1 = require("events");
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const nocache_1 = __importDefault(require("nocache"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const helmet_1 = __importDefault(require("helmet"));
const yamljs_1 = __importDefault(require("yamljs"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./logger");
const models_1 = require("./models");
const constants_1 = require("./common/constants");
const mysql_1 = require("./common/connection/mysql");
class App extends events_1.EventEmitter {
    // private sequelize: Sequelize;
    constructor(Controllers) {
        super();
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.logger = logger_1.Logger.getInstance(module);
        this.initializeSecurity();
        this.initializeMiddlewares();
        this.initializeApiDocs();
        this.initializeControllers(Controllers);
    }
    /**
     * Adds security middleware to app
     */
    initializeSecurity() {
        this.app.use(helmet_1.default.frameguard());
        this.app.use(helmet_1.default.hidePoweredBy());
        this.app.use(helmet_1.default.hsts());
        this.app.use(helmet_1.default.ieNoOpen());
        this.app.use(helmet_1.default.noSniff());
        this.app.use(helmet_1.default.xssFilter());
    }
    /**
     * Adds desired middleware to app
     */
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, compression_1.default)());
        this.app.use((0, nocache_1.default)());
        // use for computing processing time on response
        this.app.use((request, _response, next) => {
            request.start = Date.now();
            next();
        });
    }
    /**
     * Initialise db connection Sequelize ORM
     */
    initializeSequelize(sequelize) {
        (0, models_1.initModels)(sequelize);
    }
    /**
     * Adds Swagger (OAPI) generated documentation route
     */
    initializeApiDocs() {
        const swaggerDoc = yamljs_1.default.load(`${__dirname}/apiDocs.yaml`);
        this.app.use(`/${constants_1.SERVICE_NAME}/swagger`, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
    }
    /**
     * Iterates through controllers in services/index and adds their routes/handlers to app
     * @param controllers
     */
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    listen() {
        (0, mysql_1.asyncConnectMysqlDB)()
            .then((sequelize) => {
            this.initializeSequelize(sequelize);
        })
            .then(() => {
            this.app.listen(config_1.default.port, () => this.logger.info(`App listening on the port ${config_1.default.port}`));
        });
    }
}
exports.default = App;
