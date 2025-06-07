/* SmtpJS.com - v3.0.0 */

var Email = {

    send: function (a) {
        return new Promise(function (resolve, reject) {
            a.nocache = Math.floor(1e6 * Math.random() + 1);
            a.Action = "Send";
            var data = JSON.stringify(a);
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", data, function (response) {
                resolve(response);
            });
        });
    },

    ajaxPost: function (url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            var response = xhr.responseText;
            if (callback !== null) {
                callback(response);
            }
        };
        xhr.send(data);
    },
    ajax: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            var response = xhr.responseText;
            if (callback !== null) {
                callback(response);
            }
        };
        xhr.send();
    }
};
export default Email;
