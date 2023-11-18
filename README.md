# Snowfall.js

Snowfall.js is a JavaScript library for creating and animating snowflakes on a web page using HTML5 canvas and JavaScript classes. You can customize the number, size, speed, color and text of the snowflakes, and enjoy the beautiful snow falling effect on your website or app. Snowfall.js is easy to use and compatible with most browsers and devices. Try it now and add some winter magic to your project.

## Installation

To use Snowfall.js, you need to download the file snowfall.js from [this repository] and include it in your HTML page using the script tag:

```html
<script src="snowfall.js?v=1.0.0"></script>
```

## Usage

To create and animate snowflakes on your page, you need to create an object of the class Snowfall and pass it options as an object. For example:

```javascript
let snowfall = new Snowfall({
    count: 100, // number of snowflakes
    minRadius: 10, // minimum radius of a snowflake in pixels
    maxRadius: 30, // maximum radius of a snowflake in pixels
    minSpeed: 3, // minimum speed of a snowflake in pixels per frame
    maxSpeed: 10, // maximum speed of a snowflake in pixels per frame
    text: "\u2744", // text for a snowflake (can be any symbol or text)
    color: "#ffffff", // color of a snowflake in HEX format
    zIndex: "1000" // z-index for the snowflakes canvas
});
```
All options are optional and have default values, which you can see in the file snowfall.js. You can create multiple objects of Snowfall with different options for different effects.

## License

This project is distributed under the GNU GPL v3.0 license. You can freely use, modify and distribute this code, but you must keep the authorship of the original code and indicate the license. You must also share your changes under the same license. You can read more about the license in the file LICENSE.

## Authors

This project was created by [Andrey Yurkevich](https://github.com/Andrey-1988-dev "Andrey Yurkevich"). If you have any questions or suggestions about this project, please feel free to contact me.