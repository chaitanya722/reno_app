
// let baseUrl = 'https://api-m.paypal.com';
let baseUrl = 'https://api-m.sandbox.paypal.com'; //
const base64 = require('base-64');

// This Client id and Secret key provided by client

// let clientId = 'AdPn4L0WCn6fI8OyyvFwLCzs_dVEJERa4iFWE6Cf96FyUnhv7vTItocNTSJzEFcQu-rIE7EzIo9jrzOt';
// let secretKey = 'EB83-t86dCCKbb-bv9_Vw61Ib0EjFchoBAYAWjpz5B7iaFp9guYaijY3kAHV_GkfD2fWqOn7g2n-1DT-';

//TIDIYKIWI TESST  This is for local Test Sandbx ruko toh

let clientId = 'AWMrxxJAQEP8dFGskdIbe8eUIe7k0FPs48HLzbg_fWG-1c9zCLNSwDaeeAUfGRTe9Ka2mwD6ornphrrt'
let secretKey = 'EKQDV6m975uHtnHerApui6zY9B8rAReJno-18kO6IX4cP8sFU_Rm1nleugEdwczDZhEDbYwpHp0PnPu6'

const generateToken = () => {
    var headers = new Headers()
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + base64.encode(`${clientId}:${secretKey}`));

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const { access_token } = JSON.parse(result)
            resolve(access_token)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const createOrder = (orderDetail,token) => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(orderDetail)
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
            
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const capturePayment = (id, token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}







export default {
    generateToken,
    createOrder,
    capturePayment
}