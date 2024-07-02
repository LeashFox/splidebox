# Splidebox
**A lightbox carousel built with Splide, DOMPurify, and Tailwind CSS.**

**This project wouldn't be possible without the Naotoshi Fujita, the developer behind Splide. cure53, the developer behind DOMPurify, and Tailwind Labs, the developers behind Tailwind** 

*Please note: this project is in **early stages**. I am building a native JavaScript class that will allow you to specify which elements to turn into a lightbox and parse various options.*

*This means there's a high probability for some janky code while I work on features and eventually refactor it.*

*Any contributions or feedback is welcome.*

## Installation:

There's a couple of ways that you can install it.

Either: 
- Download, clone, or fork this repo and use the splidebox.js under src/js
 

- run ```npm install splidebox``` and use either the ```src/js/splidebox.js``` or ```dist/js/splidebox.min.js```


## Dependencies (included in splidebox.min.js):
- Splide (Lightweight Carousel library) - https://splidejs.com/
- Tailwind CSS - https://tailwindcss.com/docs/installation
- DOMPurify (for security when iterating through and rendering images)

## Supported options:

***Currently, these options are supported:***
- openButtonSelector: **string** = defaults to "open-splidebox",
- closeButtonSelector: **string** = defaults to "close-splidebox",
- images: **array** = defaults to empty array,
- splideOptions: **object** = can be used to pass in splide options (https://splidejs.com/guides/options/)

You'll need to instantiate the class when building a Splidebox.

****An example snippet:****

```
const lightboxWrapper = document.getElementById('lightbox-wrapper');

let imageArray = [
    'https://placehold.co/300x300',
    'https://placehold.co/350x350',
    'https://placehold.co/400x400',
]

lightboxWrapper.Splidebox({
    openButtonSelector: '#product_image',
    closeButtonSelector: '#new_close_button',
    images: imageArray,
    splideOptions: {
        type: 'loop',
        pagination: 'false',        
        // Any further options from Splide (https://splidejs.com/guides/options/)
    }
})
```

## Roadmap

My aim is to make this project extensible. I'd like to make it as easy as native Splide, where all you need to do is provide an element class or ID, parse a few options, and have a fully working pre-built lightbox.