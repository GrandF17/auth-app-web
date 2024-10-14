import axios from "axios";

const link = "http://localhost:4000"

export const getCode = () => {
    axios.post(`${link}/user/mail_verify`, {
        mail: 'v.o.nikolenko@gmail.com'
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}