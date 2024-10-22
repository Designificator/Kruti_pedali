var picture = document.getElementById('picture');
var files;
async function addPicture() {
    files = await selectFile("image/*");
    picture.innerHTML = `<div class="picture" id="picture" style="background-image: url(${URL.createObjectURL(files)})"></div>`;
}

function selectFile(contentType) {
    return new Promise(resolve => {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = contentType;
        input.id = 'img-select';
        input.onchange = _ => {
            resolve(input.files[0]);
        };

        input.click();
    });
}

const addPicBtn = document.getElementById('add-picture');
addPicBtn.addEventListener('click', addPicture);