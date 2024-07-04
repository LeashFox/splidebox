import DOMPurify from 'dompurify';
import Splide from '@splidejs/splide';

class Splidebox {
    constructor(element, options = {}) {

        // -------- Default Options -------- //
        const {
            background = {
                enable: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            closeWithEscapeKey = true,
            openButtonSelector = 'open-splidebox',
            closeButtonSelector = 'close-splidebox',
            splideboxLabel = 'An image carousel',
            images = [],
            splideOptions = {}
        } = options;

        // -------- Element Validation -------- //

        if (typeof element === 'string') {
            this.splideboxContainer = document.querySelector(element);
        } else if (element instanceof HTMLElement) {
            this.splideboxContainer = element;
        } else {
            throw new Error("Invalid element. Must be a selector string or an HTMLElement.");
        }

        if (!this.splideboxContainer) {
            throw new Error(`Container element not found with selector: ${element}`);
        }

        // -------- Definitions -------- //

        this.background = {
            enable: background.enable !== undefined ? background.enable : true,
            backgroundColor: background.backgroundColor || 'rgba(0, 0, 0, 0.7)',
        };
        this.closeWithEscapeKey = closeWithEscapeKey;
        this.openButtonSelector = openButtonSelector;
        this.closeButtonSelector = closeButtonSelector;
        this.splideboxLabel = splideboxLabel;
        this.images = images;
        this.splideOptions = splideOptions;
        this.lightboxOpen = false;

        this.init();
    }

    // -------- Methods -------- //

    init() {
        this.createMarkup();
        this.attachEvents();
    }

    createMarkup() {
        const sanitizedImages = this.images.map(image => DOMPurify.sanitize(image));

        // Create the lightbox container
        const splidebox = document.createElement('section');
        splidebox.id = 'splidebox';
        splidebox.classList.add('fixed', 'w-full', 'h-full', 'top-0', 'left-0', 'p-4', 'z-40', 'hidden');
        if (this.background.enable === true) {
            splidebox.style.background = this.background.backgroundColor;
        }

        // Create the Splide wrapper
        const splideWrapper = document.createElement('section');
        splideWrapper.classList.add('splidebox', 'splide', 'w-full', 'h-full', 'relative');
        splideWrapper.setAttribute('aria-label', this.splideboxLabel);

        // Create the close button
        const closeButton = document.createElement('span');
        closeButton.id = this.closeButtonSelector;
        closeButton.classList.add('absolute', 'z-50', 'top-4', 'right-4', 'cursor-pointer', 'rounded-full', 'bg-[#ccc]', 'w-[42px]', 'h-[42px]', 'opacity-[.7]', 'hover:opacity-[.9]', 'flex', 'items-center', 'justify-center');

        const closeButtonIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        closeButtonIcon.classList.add('text-black', 'w-[28px]', 'h-[28px]');
        closeButtonIcon.setAttribute('viewBox', '0 0 384 512');
        closeButtonIcon.innerHTML = `
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
    `;
        closeButton.appendChild(closeButtonIcon);

        // Create the Splide track
        const splideTrack = document.createElement('div');
        splideTrack.classList.add('splide__track', 'h-full');

        // Create the Splide list
        const splideList = document.createElement('ul');
        splideList.classList.add('splide__list', 'w-full');
        splideList.id = 'splide-list';

        // Append sanitized images to the list
        sanitizedImages.forEach(image => {
            const listItem = document.createElement('li');
            listItem.classList.add('splide__slide');

            const img = document.createElement('img');
            img.classList.add('w-[50%]', 'h-full', 'max-w-[650px]', 'm-auto', 'object-contain');
            img.src = image;
            img.alt = 'Product Image';

            listItem.appendChild(img);
            splideList.appendChild(listItem);
        });

        splideTrack.appendChild(splideList);
        splideWrapper.appendChild(closeButton);
        splideWrapper.appendChild(splideTrack);
        splidebox.appendChild(splideWrapper);
        this.splideboxContainer.appendChild(splidebox);

        this.splidebox = document.getElementById('splidebox');
    }

    attachEvents() {
        const openButton = document.querySelector(this.openButtonSelector);
        const closeButton = document.getElementById(this.closeButtonSelector);

        if (openButton) {
            openButton.addEventListener('click', () => this.openLightbox());
        }

        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeLightbox());
        }

        if (this.closeWithEscapeKey) {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && this.lightboxOpen) {
                    this.closeLightbox();
                }
            });
        }

        this.initSplide();
    }

    updateImages() {
        const splideList = document.getElementById('splide-list');
        splideList.innerHTML = this.images.map(image => `
            <li class="splide__slide">
                <img class="w-[50%] h-full max-w-[650px] m-auto object-contain" src="${DOMPurify.sanitize(image)}" alt="Product Image" />
            </li>
        `).join('');

        this.initSplide();
    }

    openLightbox() {
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

    initSplide() {
        if (this.splide) {
            this.splide.destroy();
        }

        this.splide = new Splide('.splidebox', {
            perPage: 1,
            pagination: true,
            ...this.splideOptions,
        }).mount();

        // Fix pagination not showing
        window.dispatchEvent(new Event('resize'));

    }
}

HTMLElement.prototype.Splidebox = function(options) {
    return new Splidebox(this, options);
};

export default Splidebox;
