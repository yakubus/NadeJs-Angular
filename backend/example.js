const express = require('express')
const Dialer = require('dialer').Dialer
const app = express();
const port = 3000;

let call = null
app.get('/', (req, res) => {
    res.send('działa. Wejdz na /call aby zasymulować dzwonienie')
})
app.get('/call', async function (req, res) {
    if (!call || await call.getStatus() === 'ANSWERED') {
        call = await Dialer.call('555555555', '555666777');
    }
    res.send('dzwoni');
});

app.get('/status', async function (req, res) {
    if (call) {
        let status = await call.getStatus()
        res.json({ status: status });
        return;
    }
    res.send('nie było dzwonione więc nie mam statusu')

});

app.listen(port, () => {
    console.log('server running at port ' + port)
});