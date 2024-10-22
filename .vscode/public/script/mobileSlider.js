class imageSlider {
    slider;
    constructor(images) {
        console.log("new slider");
        this.slider = document.getElementById('slider');
        for (let i = 0; i < images.length; i++) {
            let image = document.createElement('img');
            image.src = '../img/' + images[i];
            image.id = 'slider-img-item' + i.toString();
            image.className = 'slider-img-item';
            this.content.push(image);
            this.slider.insertAdjacentElement('beforeend', image);
        }
    }
}

