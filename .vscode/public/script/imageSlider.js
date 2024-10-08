class imageSlider {
    slider;
    content;
    currentId;
    lastId;
    constructor(images) {
        console.log("new slider");
        this.slider = document.getElementById('slider');
        this.currentId = 0;
        this.lastId = images.length - 1;
        this.content = [];
        this.init(images);
    }
    init(images) {
        for (let i = 0; i < images.length; i++) {
            let image = document.createElement('img');
            image.src = '../img/' + images[i];
            image.id = 'full-img-item' + i.toString();
            image.className = 'full-img-item';
            this.content.push(image);
        }
        document.getElementById('slider').style.backgroundImage = "url(" + "'../img/" + images[0] + "')";
        console.log(this.content);
        const images_html = this.content;
        var _currentId = this.currentId;
        var _lastId = this.lastId;
        this.slider.addEventListener('click', function popup() {
            const body = document.getElementsByTagName('body')[0];
            const fullImgContainer = document.createElement('div');
            const fullImgCloseBtn = document.createElement('button');
            const fullImgRightBtn = document.createElement('button');
            const fullImgLeftBtn = document.createElement('button');

            fullImgContainer.className = 'full-img-container';
            fullImgCloseBtn.className = 'full-img-close';
            fullImgRightBtn.className = 'full-img-right';
            fullImgLeftBtn.className = 'full-img-left';

            function close() {
                body.removeChild(fullImgContainer);
            }
            function rightSlide() {
                let prevImg = images_html[_currentId];
                if (_currentId < _lastId) {
                    _currentId += 1;
                }
                else {
                    _currentId = 0;
                }
                fullImgContainer.removeChild(prevImg);
                fullImgContainer.insertAdjacentElement('beforeend', images_html[_currentId]);
            }
            function leftSlide() {
                let prevImg = images_html[_currentId];
                if (_currentId > 0) {
                    _currentId -= 1;
                }
                else {
                    _currentId = _lastId;
                }
                fullImgContainer.removeChild(prevImg);
                fullImgContainer.insertAdjacentElement('beforeend', images_html[_currentId]);
            }

            fullImgCloseBtn.addEventListener('click', close);
            fullImgRightBtn.addEventListener('click', rightSlide);
            fullImgLeftBtn.addEventListener('click', leftSlide);

            fullImgContainer.insertAdjacentElement('afterbegin', fullImgRightBtn);
            fullImgContainer.insertAdjacentElement('afterbegin', images_html[0]);
            fullImgContainer.insertAdjacentElement('afterbegin', fullImgLeftBtn);
            fullImgContainer.insertAdjacentElement('afterbegin', fullImgCloseBtn);
            body.insertAdjacentElement('beforeend', fullImgContainer);
        });
    }
}