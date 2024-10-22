class reqSender {
    userData;
    constructor() {
        this.userData = {
            name: "",
            email: "",
            password: ""
        };
    }
    getData(url, control1 = () => { }, control2 = () => { }) {
        fetch(url).then((response) => response.json())
            .then(data => {
                control1(data.name, data.email, data.password);
                control2(data);
            })
            .catch((err) => {
                console.log('Fetch Error :-S', err);
            });
        return this.userData;
    }
    getUserData(dosmth) {
        console.log("getUserData func call");
        this.getData('/api/users', (name, email, password) => {
            console.log("got data: " + name);
            this.userData.name = name;
            this.userData.email = email;
            this.userData.password = password;
            dosmth(name, email, password);
    });
        return this.userData;
    }
    getUserId(dosmth) {
        this.getData('/api/users', () => { }, (data) => {
            dosmth(data.id);
        });
    }
    getCommentData(dosmth) {
        console.log("getCommentData func call");
        this.getData('/api/comments', () => { }, (data) => {
            for (let i = 0; i < data.length; i++) {
                dosmth(data[i].username, data[i].text, data[i].rate);
            }
        });
        return;
    }
    getImageData(id, dosmth) {
        console.log("getImageData call");
        let url = '/api/images/' + id.toString();
        fetch(url).then((response) => response.blob)
            .then(data => {
                dosmth(data);
            })
            .catch((err) => {
                console.log('Fetch Error :-S', err);
            });
    }
}
var current = new reqSender();