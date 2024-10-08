var picture = document.getElementById('picture');
var pictureUrl;
var file;
async function addPicture() {
    file = await selectFile("image/*");
    pictureUrl = URL.createObjectURL(file);
    picture.innerHTML = `<div class="picture" id="picture" style="background-image: url(${pictureUrl})"></div>`;
}

function selectFile(contentType) {
    return new Promise(resolve => {
        const input = document.getElementById('file');

        input.onchange = _ => {
            resolve(input.files[0]);
        };

        input.click();
    });
}

const addPicBtn = document.getElementById('add-picture');
addPicBtn.addEventListener('click', addPicture);
