const jwt = require('jsonwebtoken');

const checkAuth = (request, response, next) => {
    const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');
    if(token) {
        try {
            const decoded = jwt.verify(token, 'salt');
            request.userID = decoded._id;
            next();
        } catch (e) {
            return response.status(403).json({
                'msg': 'Нет доступа'
            });
        }
    } else {
      return response.status(403).json({
          'msg': 'Нет доступа'
      });
    }
}

module.exports = checkAuth;