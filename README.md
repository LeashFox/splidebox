<br />
<br />

<p align="center">
  <a href="https://github.com/LeashFox/splidebox">
    <img src="https://github.com/LeashFox/splidebox/blob/master/splidebox.svg" alt="Splidebox Logo"/>
  </a>
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/dw/splidebox">
  <img alt="GitHub License" src="https://img.shields.io/github/license/leashfox/splidebox">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/splidebox">
  <img alt="npm" src="https://img.shields.io/npm/v/splidebox">
  <a href="https://www.buymeacoffee.com/leashfox" target="_blank">
    <img src="https://img.shields.io/badge/-buy_me_a%C2%A0coffee-gray?logo=buy-me-a-coffee" alt="Buy Me A Coffee">
  </a>
</p>


### Splidebox is a lightweight JavaScript library for creating customisable image lightboxes using Splide.js. Easily integrate image galleries into your web applications with minimal setup.

This project wouldn't be possible without:
- **Naotoshi Fujita**, the developer behind ```Splide```
- **cure53**, the developer behind ```DOMPurify```
- **Tailwind Labs**, the developers behind ```Tailwind```.

Any contributions, suggestions, or feedback is welcome.

## Preview:

<p dir="auto">
    <img src="preview.gif" 
         alt="Splidebox Preview" 
         style="max-width: 100%;"
    />
</p>

## Dependencies:
Theses are compiled within ```dist/js/splidebox.js``` and ```dist/js/splidebox.min.js```, or imported in ```src/js/splidebox.js```
- Splide (Lightweight Carousel library) - https://splidejs.com/
- Tailwind CSS - https://tailwindcss.com/docs/installation
- DOMPurify (for security when iterating through and rendering images) - https://github.com/cure53/DOMPurify

## Installation Options:

There's a few of ways that you can install it.

### Use the CDN from jsDeliver:

**splidebox.js:**
```html
<script src="https://cdn.jsdelivr.net/npm/splidebox/dist/js/splidebox.js"></script>
```

**splidebox.min.js:**
```html
<script src="https://cdn.jsdelivr.net/npm/splidebox/dist/js/splidebox.min.js"></script>
```

### Download, clone, or fork this repo and use the splidebox.js under:
- ```src/js``` or ```dist/js```

### run ```npm install splidebox``` and use either:
```src/js/splidebox.js```, ```dist/js/splidebox.js``` or ```dist/js/splidebox.min.js```


## Supported Options

- background: **(object)**
    - enable: **(boolean)** (default: `true`)
    - backgroundColor: **(string)** (default: `'rgba(0, 0, 0, 0.7)'`)

- closeWithEscapeKey: **(boolean)** (default: `true`)

- openButtonSelector: **(string)** (default: `'open-splidebox'`)

- closeButtonSelector: **(string)** (default: `'close-splidebox'`)

- splideboxLabel: **(string)** (default: `'An image carousel.'`)
    - Used to set the `aria-label` attribute for the Splide carousel.

- images: **(array)** (default: `[]`)
    - Array of image URLs to display in the carousel.

- splideOptions: **(object)**
    - Can be used to parse options from Splide.js (https://splidejs.com/guides/options/).
    - *Not all options have been tested. Please report any bugs encountered.*


## New Features:

#### Splidebox will now automatically grab images from the attribute ```data-splidebox-images``` from the specified ```openButtonSelector```

If left blank, it'll use the images specified in the ```images``` option when initialising Splidebox.

This means that you can have multiple elements with the same ```openButtonSelector``` class, yet load different images, all on the same markup for the lightbox (rather than having multiple containers for different lightboxes.)

```html
<div class="image cursor-pointer"
     data-splidebox-images='["https://placehold.co/100x100","https://placehold.co/150x150","https://placehold.co/200x200"]'>
     
    <img class="w-[250px] w-[250px] m-auto object-cover"
         src="https://placehold.co/300x300"
         alt="Image"/>
</div>
```

## Example:

You'll need to instantiate the class when building a Splidebox. It's best to do this after the DOM content has loaded:

```javascript

document.addEventListener('DOMContentLoaded', () => {

    const lightboxWrapper = document.getElementById('lightbox-wrapper');

    let imageArray = [
        'https://placehold.co/300x300',
        'https://placehold.co/350x350',
        'https://placehold.co/400x400',
    ]

    lightboxWrapper.Splidebox({
        background: {
            enable: true, // You don't need to specify this.
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
        closeWithEscapeKey: false,
        openButtonSelector: '.image',
        closeButtonSelector: '#new_close_button',
        splideboxLabel: 'Product lightbox',
        images: imageArray,
        splideOptions: {
            type: 'loop',
            pagination: 'false',
            // Any further options from Splide (https://splidejs.com/guides/options/)
        }
    })

});
```