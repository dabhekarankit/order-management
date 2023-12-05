require("dotenv").config();
const express = require("express");
const { serve, setup } = require("swagger-ui-express");
const path = require("path");
const YAML = require("yamljs");

const router = express.Router();
const superAdminSwaggerDocument = YAML.load(path.join(__dirname, "../swagger.yml"));

router.use(
    "/documentation",
    (req, res, next) => {
        superAdminSwaggerDocument.info.title = `${process.env.APP_NAME}`;
        superAdminSwaggerDocument.info.version = "1.0";
        superAdminSwaggerDocument.servers = [
            { url: `${process.env.APP_URL}/api`, description: "API Local URL" },
        ];
        req.swaggerDoc = superAdminSwaggerDocument;
        next();
    },
    serve,
    setup(superAdminSwaggerDocument, { swaggerOptions: { persistAuthorization: true } })
);

module.exports = router;
