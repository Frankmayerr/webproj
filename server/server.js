const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const fs = require("fs");

firebase.initializeApp({
    databaseURL: 'https://webprojgladkikh.firebaseio.com',
});
var db = firebase.database();

app.listen(8000, () => {
    console.log('Server started!');
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
    console.log("Get!");
});

app.all('*', function(req, res, next) {
    if (!res.headersSent) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin, Access-Control-Allow-Methods");
    }
    if ('OPTIONS' == req.method && !res.headersSent) {
        return res.sendStatus(200).end();
    }
    next();
});

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function(a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

app.patch('/sortcards', function(req, res) {
    var result = {};
    console.log("sortcards!")
    var count = 0;
    db.ref('/webproj/cardPayments').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let val = childSnapshot.val();
            result[count] = val;
            count++;
        });
        console.log(result);
        var arr = Object.keys(result).map(function(k) { return result[k] });
        arr = arr.sort(dynamicSort(req.body["name"]))
        count = 0;
        result = {};
        arr.forEach(function(x) {
            result[count] = x;
            count++;
        })
        if (!res.headersSent)
            return res.send(result).end();
    });
})

app.patch('/sortreq', function(req, res) {
    var result = {};
    console.log("sortreqs!")
    var count = 0;
    db.ref('/webproj/requests').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let val = childSnapshot.val();
            result[count] = val;
            count++;
        });
        console.log(result);
        var arr = Object.keys(result).map(function(k) { return result[k] });
        arr = arr.sort(dynamicSort(req.body["name"]))
        count = 0;
        result = {};
        arr.forEach(function(x) {
            result[count] = x;
            count++;
        })
        if (!res.headersSent)
            return res.send(result).end();
    });
})


app.get('/cardPayments', function(req, res) {
    var result = {};
    console.log("getcards!")
    var count = 0;
    db.ref('/webproj/cardPayments').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let val = childSnapshot.val();
            result[count] = val;
            count++;
        });
        console.log(result);
        if (!res.headersSent)
            return res.send(result).end();
    });
})

app.get('/requests', function(req, res) {
    var result = {};
    console.log('getRequests!');
    var count = 0;
    db.ref('/webproj/requests').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            result[count] = childSnapshot.val();
            count++;
        });
        console.log(result);
        if (!res.headersSent)
            return res.send(result).end();
    });
})

app.patch('/changeSecurity', function(req, res) {
    console.log('change security');
    var id = req.body['id'];
    var ref = db.ref('/webproj/');
    ref.child('cardPayments').orderByChild('id').equalTo(id).once("value", function(snapshot) {
        let count = 0;
        snapshot.forEach(function(childSnapshot) {
            count += 1;
            let obj = childSnapshot.val();
            let newSecurity = 'false';
            if (obj.IsSecure === 'false')
                newSecurity = 'true';
            childSnapshot.ref.update({ IsSecure: newSecurity },
                err => {
                    if (!res.headersSent)
                        res.sendStatus(err.status).end();
                });
            if (!res.headersSent)
                res.sendStatus(200).end();
        });
    });
})

var options = {
    root: 'C:\\Users\\yglad\\Desktop\\web\\project\\server\\public\\',
};

app.post('/getFile', function(req, res) {
    console.log("getFile!");
    console.log(req.body);
    fs.writeFileSync("./public/temp.txt", JSON.stringify(req.body));
    return res.sendFile('temp.txt', options, function(err) {
        if (err) {
            console.log(err);
            if (!res.headersSent)
                res.sendStatus(err.status).end();
        } else {
            console.log('Sent:', fs.readFileSync(options.root + 'temp.txt', 'utf8'));
        }
    });
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

app.post('/storeCardPayments', function(req, res) {
    console.log("storeCards");
    console.log(req.body);
    var value = req.body;
    value['id'] = guid();
    db.ref('/webproj/cardPayments').push(req.body,
        err => {
            if (!res.headersSent)
                return res.sendStatus(err.status).end();
        });
    if (!res.headersSent)
        return res.sendStatus(200).end();
});

app.post('/storeRequests', function(req, res) {
    console.log("storePayments!");
    console.log(req.body);
    db.ref('/webproj/requests').push(req.body,
        err => {
            if (!res.headersSent)
                return res.sendStatus(err.status).end();
        });
    if (!res.headersSent)
        return res.sendStatus(200).end();
});

app.patch('/filtercard', function(req, res) {
    var result = {};
    console.log("filtercards!")
    var count = 0;
    console.log(req.body)
    db.ref('/webproj/cardPayments').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let val = childSnapshot.val();
            console.log(val);
            if (val[req.body['column']] === req.body['value']) {
                result[count] = val;
                count++;
            }
        });
        console.log(result);
        if (!res.headersSent)
            return res.send(result).end();
    });
})

app.patch('/filterreq', function(req, res) {
    var result = {};
    console.log("filterreqs!")
    var count = 0;
    db.ref('/webproj/requests').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let val = childSnapshot.val();
            if (val[req.body['column']] === req.body['value']) {
                result[count] = val;
                count++;
            }
        });
        console.log(result);
        if (!res.headersSent)
            return res.send(result).end();
    });
})