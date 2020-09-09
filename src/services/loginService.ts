export default class LoginService {
    static atteptLogin (userData) {
        const { email, password } = userData;
        console.debug(`User login attempt --> email: ${email} | password: ${password}`);
        var auth = window.btoa(email + ':' + password);
        var xhttp = new XMLHttpRequest();
        var endpointURL = 'https://demo-eu02-suitsupplyworld.demandware.net/s/INT/dw/shop/v20_9/customers/auth?client_id=46f6e40b-b605-4bb2-a162-534b3fbba5e0';

        xhttp.open('POST', endpointURL);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.setRequestHeader('Authorization', 'Basic ' + auth);
        xhttp.send(JSON.stringify({ type: 'credentials' }));
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var token = xhttp.getResponseHeader('Authorization');
                var parsedToken = token.slice(7);
                var response = JSON.parse(this.responseText);

                if (parsedToken != null) {
                    var sessionURL = 'https://demo-eu02-suitsupplyworld.demandware.net/s/INT/dw/shop/v20_9/sessions';
                    xhttp.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 204) {
                            console.debug('You have successfully logged in \n' +
                            'auth_type: ' + response['auth_type'] + '\n' +
                            'customer_id: ' + response['customer_id'] + '\n' +
                            'customer_no: ' + response['customer_no'] + '\n' +
                            'email: ' + response['email'] + '\n' +
                            'first_name: ' + response['first_name'] + '\n' +
                            'last_name: ' + response['last_name'] + '\n' +
                            'login: ' + response['login'] + '\n' +
                            'token: ' + parsedToken
                            );
                        }
                    };
                    xhttp.open('POST', sessionURL);
                    xhttp.setRequestHeader('Content-type', 'application/json');
                    xhttp.setRequestHeader('x-dw-client-id', '46f6e40b-b605-4bb2-a162-534b3fbba5e0');
                    xhttp.setRequestHeader('Authorization', 'Bearer ' + parsedToken);
                    xhttp.send();
                }
            } else if (this.status === 401){
                console.debug('Invalid username and password');
            }
        };
    }
}