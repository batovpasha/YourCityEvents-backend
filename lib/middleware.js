const path = require('path');

const bodyParser = require('body-parser');
const cors       = require('cors');
const multer     = require('multer');

const TokenOperations = require('./services/tokens/TokenOperations');

module.exports = {
    json : bodyParser.json({
        limit  : 1024 * 1024,
        verify : (req, res, buf) => {
            try {
                JSON.parse(buf);
            } catch (e) {
                res.send({
                    status : 0,
                    error  : {
                        code    : 'BROKEN_JSON',
                        message : 'Please, verify your json'
                    }
                });
                throw new Error('BROKEN_JSON');
            }
        }
    }),
    urlencoded : bodyParser.urlencoded({ extended: true }),
    cors       : cors({ origin: '*' }), // we allow any origin because we don't use cookies and basic auth
    upload     : multer({
        storage : multer.diskStorage({
            destination : (req, file, cb) => {
                const descriptionPath = path.join(__dirname, '..', 'static', 'photos');
                cb(null, descriptionPath);
            },
            filename : (req, file, cb) => {
                const extensionsByMimetypes = {
                    'image/png'  : '.png',
                    'image/jpeg' : '.jpg'
                };
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
                const fileExtension = extensionsByMimetypes[file.mimetype];
                const uniqueFilename = `${file.fieldname}-${uniqueSuffix}${fileExtension}`;
                cb(null, uniqueFilename);
            }
        })
    }),
    auth : (req, res, next) => {
        const authorizationHeader = req.get('Authorization') || '';
        const token = authorizationHeader.replace('Bearer ', '');
        try {
            const { userId } = TokenOperations.validateToken(token);
            // eslint-disable-next-line no-param-reassign
            req.params.userId = userId;

            return next();
        } catch (err) {
            res.json({
                status : 0,
                error  : {
                    code   : err.code,
                    fields : {}
                }
            });
        }
    }
};
