export default class LoginService {
    static atteptLogin(userData): Promise<any> {
        const { email, password, sessionURL, customerAuthURL, clientID } = userData;
        console.debug(
            `User login attempt::
------------------------ 
    email: ${email},
    password: ${password},
    sessionURL: ${sessionURL},
    customerAuthURL: ${customerAuthURL},
    clientID: ${clientID}
------------------------`
        );

        var auth = window.btoa(email + ':' + password);
        var xhttp = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xhttp.open('POST', customerAuthURL);
            xhttp.setRequestHeader('Content-type', 'application/json');
            xhttp.setRequestHeader('Authorization', 'Basic ' + auth);
            xhttp.send(JSON.stringify({ type: 'credentials' }));
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var token = xhttp.getResponseHeader('Authorization');
                    var parsedToken = token.slice(7);

                    xhttp.open('POST', customerAuthURL);
                    xhttp.setRequestHeader('Content-type', 'application/json');
                    xhttp.setRequestHeader('Authorization', 'Basic ' + auth);
                    xhttp.send(JSON.stringify({ type: 'credentials' }));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            var token = xhttp.getResponseHeader('Authorization');
                            var parsedToken = token.slice(7);
                            var response = JSON.parse(this.responseText);

                            if (parsedToken != null) {
                                xhttp.onreadystatechange = function () {
                                    if (this.readyState === 4 && this.status === 204) {
                                        if (this.readyState === 4 && this.status === 204) {
                                            resolve('You have successfully logged in \n' +
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
                                    }
                                };
                                xhttp.open('POST', sessionURL);
                                xhttp.setRequestHeader('Content-type', 'application/json');
                                xhttp.setRequestHeader('x-dw-client-id', clientID);
                                xhttp.setRequestHeader('Authorization', 'Bearer ' + parsedToken);
                                xhttp.send();
                            }
                        } else if (this.status === 401) {
                            reject('Invalid username and password');
                        }
                    };
                }
            }
        })
    }
}