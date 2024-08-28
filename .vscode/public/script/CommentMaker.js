class Comment {
    commentElement;
    constructor(commentText, commentName, commentItemStars) {
        this.commentElement = this.create(commentText, commentName, commentItemStars);
    }

    create(commentItemText, commentItemName, commentItemStars) {
        // Get input value
        const commentText = commentItemText.value;
        const commentName = commentItemName.value;

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
/*
    render() {
        console.log(this.items);
        this.items.comments.forEach((comment) => {
            const dateToFormat = new Date(comment.date);
            const year = dateToFormat.getFullYear();
            const month = dateToFormat.getMonth();
            const date = dateToFormat.getDate();
            const finalDate = `${date}.${month + 1}.${year}`;

            this.addComment(finalDate, comment.text);
        })*/
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

function StarsSelect1() {
    for (var j = 0; j < 1; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
}
function StarsSelect2() {
    for (var j = 0; j < 2; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
}
function StarsSelect3() {
    for (var j = 0; j < 3; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
}
function StarsSelect4() {
    for (var j = 0; j < 4; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
}
function StarsSelect5() {
    for (var j = 0; j < 5; j++) {
        starsArray[j].innerHTML = '<img src="img/star.png">';
    }
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

//Добавление комента из формы
function AddNewCom() {
    const newComment = new Comment(commentItemText, commentItemName, commentItemStars);
    commentList.insertAdjacentElement('afterbegin', newComment.commentElement);

    RefreshStars();
    commentItemText.value = '';
    commentItemName.value = '';
}

const commentItemStars = document.getElementById('stars');
const commentItemText = document.getElementById('comment-item-text');
const commentItemName = document.getElementById('comment-item-name');
const submitBtn = document.getElementById('submit');
const commentList = document.getElementById('comment-list');
let x = 1;

submitBtn.addEventListener('click', AddNewCom);
