class Comment {
    commentElement;
    username;
    text;
    rate;
    constructor(commentText, commentName, commentItemStars) {
        this.commentElement = this.create(commentText, commentName, commentItemStars);
    }

    create(commentItemText, commentItemName, commentItemStars) {
        // Get input value
        const commentText = commentItemText.value;
        const commentName = commentItemName.innerText;

        // Create comment DOM element
        const newCommentItem = document.createElement('div');
        newCommentItem.className = "comment-item";
        const newCommentItemStars = commentItemStars.cloneNode(true);
        newCommentItemStars.id = "stars" + x.toString();
        const newCommentItemInner = document.createElement('div');
        newCommentItemInner.className = "comment-item-inner";
        const newCommentName = document.createElement('h3');
        newCommentName.innerText = commentName;
        newCommentName.id = "comment-item-name";
        const newCommentItemAva = document.createElement('div');
        newCommentItemAva.className = "comment-item-avatar";
        newCommentItemAva.innerHTML = '<img src="img/0lslz48qa80x7xarnt4ivlvtxnivvpmu.png" width="70vh" height="70vh">'
        const newCommentText = document.createElement('div');
        newCommentText.innerText = commentText;
        newCommentText.className = "comment-item-text";
        const newComment = document.createElement('div');
        newCommentItemInner.insertAdjacentElement('afterbegin', newCommentName);
        newCommentItemInner.insertAdjacentElement('beforeend', newCommentText);
        newCommentItem.insertAdjacentElement('beforeend', newCommentItemAva);
        newCommentItem.insertAdjacentElement('beforeend', newCommentItemInner);
        newComment.insertAdjacentElement('afterbegin', newCommentItemStars);
        newComment.insertAdjacentElement('beforeend', newCommentItem);

        this.text = commentText;
        this.username = commentName;


        return newComment;
    }
}

class CommentList {
    constructor(container, items) {
        this.container = container;
        this.items = items;

        this.render();
    }

    addComment(commentElement) {
        this.container.appendChild(commentElement);
    }
}

/*let commentList;
api.getPictures()
    .then((data) => {
        data.forEach((item) => {
            fetch(`example.com`)
                .then(res => res.json())
                .then((data) => {
                    commentList = new CommentList(commentContainer, data)
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    })
    .catch((err) => console.log(err));
    */

//Звезды
const starsArray = new Array(5);

for (var i = 0; i < 5; i++) {
    starsArray[i] = document.getElementById("star" + (i + 1).toString());
}
var rate;
function StarsSelect1() {
    for (var j = 0; j < 1; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
    rate = 1;
}
function StarsSelect2() {
    for (var j = 0; j < 2; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
    rate = 2;
}
function StarsSelect3() {
    for (var j = 0; j < 3; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
    rate = 3;
}
function StarsSelect4() {
    for (var j = 0; j < 4; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
    rate = 4;
}
function StarsSelect5() {
    for (var j = 0; j < 5; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
    rate = 5;
}
starsArray[0].addEventListener('click', StarsSelect1);
starsArray[1].addEventListener('click', StarsSelect2);
starsArray[2].addEventListener('click', StarsSelect3);
starsArray[3].addEventListener('click', StarsSelect4);
starsArray[4].addEventListener('click', StarsSelect5);
function RefreshStars() {
    for (var i = 0; i < 5; i++) {
        const star = document.getElementById("star" + (i + 1).toString());
        star.innerHTML = '<img src="img/empty_star.png">';
    }
}

function AddNewCom() {
    const newComment = new Comment(commentItemText, commentItemName, commentItemStars);
    SendCommentToAPI(commentItemName.innerText, commentItemText.value, rate);
    commentList.insertAdjacentElement('afterbegin', newComment.commentElement);

    RefreshStars();
    commentItemText.value = '';
    commentItemName.value = '';
}
const commentItemName = document.getElementById('comment-item-name');
function GetUsername() {
    var username = '';
    fetch('http://localhost:3002/api/users').then((response) => {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        else {
            return response.text();
        }
    })
        .then(responseText => {
            username = responseText;
            console.log("got name: " + username);
            commentItemName.innerText = username;
        })
        .catch((err) => {
            console.log('Fetch Error :-S', err);
        });
    return username;
}
function SendCommentToAPI(username, text, rate) {
    const commentData = {
        "username": username,
        "text": text,
        "rate": rate
    }
    fetch('http://localhost:3002/api/comments', {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(commentData)
    })
        .then(
            function (response) {
                if (response.status !== 201) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                else {
                    console.log('Comment is sent');
                }
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

GetUsername();
const commentItemStars = document.getElementById('stars');
const commentItemText = document.getElementById('comment-item-text');
const submitBtn = document.getElementById('submit');
const commentList = document.getElementById('comment-list');
let x = 1;

submitBtn.addEventListener('click', AddNewCom);
