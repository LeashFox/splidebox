import DOMPurify from 'dompurify';
import Splide from '@splidejs/splide';

class Splidebox {
    constructor(options = {}) {
        // Options
        this.splideboxContainerId = options.splideboxContainerId || 'splidebox-container';
        this.openButtonId = options.openButtonId;
        this.closeButtonId = options.closeButtonId;
        this.images = options.images || [];

        // Splide Options to parse
        this.splideOptions = options.splideOptions || {};

        // Declarations
        this.lightboxOpen = false;

        // Register splidebox ID as splideboxContainer
        this.splideboxContainer = document.getElementById(this.splideboxContainerId);

        // Init
        this.init();
    }

    init() {
        this.createMarkup();
        this.attachEvents();
    }

    createMarkup() {
        this.splideboxContainer.innerHTML = `
            <section id="splidebox" class="fixed w-full h-full top-0 left-0 p-4 z-40 hidden"  style="background: rgba(0, 0, 0, 0.7)">

                <section class="splidebox splide w-full h-full relative" aria-label="Product Image Lightbox">

                    <span id="${this.closeButtonId}" class="absolute z-50 top-4 right-4 cursor-pointer rounded-full bg-[#ccc] w-[42px] h-[42px] opacity-[.7] hover:opacity-[.9] flex items-center justify-center">

                        <svg class="text-black w-[28px] h-[28px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </span>
                    <div class="splide__track h-full">
                        <ul class="splide__list w-full" id="splide-list">
                            ${this.images.map(image => `
                                <li class="splide__slide">
                                    <img class="w-[50%] h-full max-w-[650px] m-auto object-contain" src="${image}" alt="Product Image" />
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </section>
            </section>
        `;

        this.splidebox = document.getElementById('splidebox');
    }

    attachEvents() {

        if (this.openButtonId !== 'open-splidebox') {
            const openButton = document.getElementById(this.openButtonId);
            // Bind "openLightbox" to openButton
            openButton.addEventListener('click', () => this.openLightbox(this.images) );
        }

        if (this.closeButtonId !== 'close-splidebox') {
            const closeButton = document.getElementById(this.closeButtonId);
            // Bind "closeLightbox()" to closeButton
            closeButton.addEventListener('click', () => this.closeLightbox() );
        }

        // Allow "esc" key to close Lightbox
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.lightboxOpen) {
                this.closeLightbox();
            }
        });

        this.initSplide();
    }

    openLightbox() {
        window.dispatchEvent(new Event('resize'));

        this.updateImages();
        
        this.lightboxOpen = true;
        this.splidebox.classList.remove('hidden');
    }

    closeLightbox() {
        this.lightboxOpen = false;

        this.splidebox.classList.add('hidden');

        if (this.splide) {
            this.splide.destroy();
        }
    }

    updateImages() {
        const sanitizedImages = this.images.map(image => DOMPurify.sanitize(image));
        const imagesMarkup = sanitizedImages.map(image => `
            <li class="splide__slide">
                <img class="w-[50%] h-full max-w-[650px] m-auto object-contain" src="${image}" alt="Product Image" />
            </li>
        `).join('');

        const splideList = document.getElementById('splide-list');
        splideList.innerHTML = imagesMarkup;

        this.initSplide();
    }

    initSplide() {

        if (this.splide) {
            this.splide.destroy();
        }

        this.splide = new Splide('.splidebox', {
            perPage: 1,
            pagination: true,
            ...this.splideOptions,
        }).mount();

    }
}

export default Splidebox;