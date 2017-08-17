const path = require('path');

module.exports = {
    'server': {
        'social': {
            "port": 3002,
            "connectionString": "mongodb://localhost:27017/tradejs-social",
            "apiUrl": "http://localhost:3002",
            "secret": "REPLACE THIS WITH YOUR OWN SECRET, IT CAN BE ANY STRING"
        },
        'order': {
            'port': 3005,
            "apiUrl": "http://localhost:3005",
            'connectionString': 'mongodb://localhost:27017/tradejs-orders'
        }
    },
    image: {
        profilePath: path.join(__dirname, 'images', 'images', 'profile'),
		profileBaseUrl: '/images/profile/',
		profileDefaultPath: path.join(__dirname, 'images', 'images', 'default', 'profile', 'nl.png'),
		profileDefaultUrl: '/images/default/profile/nl.png'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        key: {
            user: 'user_'
        }

    },
    'broker': {
        'account': {
            'broker': 'oanda',
            'id': null,
            'environment': '',
            'username': null,
            'token': '067331173f67faf3cef7e69263a3015a-fefb596cddfe98d2f24e9ca843c3c443',
            'accountId': '1218398'
        },
        'system': {
            'port': 3000,
            'timezone': 'America/New_York'
        },
        'path': {
            'custom': '/Users/kewinbrandsma/Projects/TradeJS/custom',
            'cache': '/Users/kewinbrandsma/Projects/TradeJS/_cache',
            'config': '/Users/kewinbrandsma/Projects/TradeJS/_config'
        }
    }
};