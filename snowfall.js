/*!
 * Snowfall.js - A JavaScript library for creating and animating snowflakes on a web page
 * https://github.com/Andrey-1988-dev/snowfall.js
 *
 * Author: Andrey Yurkevich (https://github.com/Andrey-1988-dev)
 * Contact: yurkevich.a.n.1988@gmail.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Version: 1.1.0
 * Date: 2021-11-27T00:00Z
 */

'use strict'

// Class for creating snowflakes
class Snowflake {
    // Constructor takes x and y coordinates, radius, speed and color of the snowflake
    constructor(canvas, h, s, c, t) {
        // Generate a random x coordinate within the canvas width
        this.x = Math.random() * canvas.width; // x coordinate
        // Generate a random y coordinate within the canvas height
        this.y = Math.random() * canvas.height; // y coordinate
        this.h = h; // font size
        this.s = s; // speed
        this.c = c; // color
        this.t = t; // text
    }

    // Function to calculate the new position of the snowflake relative to the edge of the canvas
    calculateNewPosition = (oldPosition, oldCanvasSize, newCanvasSize) => {
        // Calculate the old position of the snowflake from the edge in percentage
        let percentage = oldPosition / (oldCanvasSize / 100);
        // Calculate the new position of the snowflake from the edge in pixels
        // Return the new position
        return newCanvasSize / 100 * percentage;
    }

    updateAfterCanvasResize = (oldCanvasWidth, oldCanvasHeight, newCanvasWidth, newCanvasHeight) => {
        if (oldCanvasWidth !== newCanvasWidth) {
            // Call the function to calculate the new position of the snowflake from the left edge
            this.x = this.calculateNewPosition(this.x, oldCanvasWidth, newCanvasWidth);
        }
        if (oldCanvasHeight !== newCanvasHeight) {
            // Call the function to calculate the new position of the snowflake from the top edge
            this.y = this.calculateNewPosition(this.y, oldCanvasHeight, newCanvasHeight);
        }
    }

    // Method to draw the snowflake on the canvas
    draw = ctx => {
        // Check if the snowflake is within the visible area
        if (this.x + this.h >= window.scrollX && this.x - this.h <= window.scrollX + window.innerWidth && this.y + this.h >= window.scrollY && this.y - this.h <= window.scrollY + window.innerHeight) {
            ctx.font = this.h + "px Arial, sans-serif"; // set the font and text size
            ctx.fillText(this.t, this.x, this.y); // draw the text with the snowflake symbol
            ctx.fillStyle = this.c; // set the color
        }
    }

    // Method to update the position of the snowflake
    update = canvas => {
        this.y += this.s; // increase the y coordinate by the speed
        // if the snowflake goes beyond the bottom edge of the canvas, move it to the top
        if (this.s > 0) {
            if (this.y > canvas.height) {
                this.y = -this.h;
                this.x = Math.random() * canvas.width;
            }
        } else {
            if (this.y < 0) {
                this.y = canvas.height + this.h;
                this.x = Math.random() * canvas.width;
            }
        }
    }
}

class Snowfall {
    requestAnimationFrame;

    // Constructor takes parameters for creating snowflakes
    constructor(options = {}) {
        let {
            count = 100,
            minRadius = 10,
            maxRadius = 30,
            minSpeed = 3,
            maxSpeed = 10,
            text = "❄",
            color = "#99ccff",
            zIndex = "1000"
        } = options;

        count = Number(count);
        minRadius = Number(minRadius);
        if (minRadius <= 0) {
            minRadius = 10
        }
        maxRadius = Number(maxRadius);
        if (maxRadius <= 0) {
            maxRadius = 30
        }
        minSpeed = Number(minSpeed);
        maxSpeed = Number(maxSpeed);

        const snowfieldCanvas = document.createElement("canvas");
        snowfieldCanvas.id = "snowfall";
        snowfieldCanvas.style.zIndex = zIndex;
        snowfieldCanvas.style.position = "absolute";
        snowfieldCanvas.style.top = "0";
        snowfieldCanvas.style.left = "0";
        snowfieldCanvas.style.pointerEvents = "none";

        document.body.append(snowfieldCanvas);

        // Get the canvas element by id
        this.canvas = snowfieldCanvas;
        // Get the drawing context on the canvas
        this.ctx = this.canvas.getContext("2d");
        // Set the width and height of the canvas equal to the width and height of the browser window
        this.resizeCanvas();
        // Add an event handler to resize the canvas when the window size changes
        window.addEventListener("resize", () => {
            // Use requestAnimationFrame to optimize the resizing
            requestAnimationFrame(this.resizeCanvas.bind(this));
        });

        // Create an array to store the snowflakes
        this.snowflakes = [];
        // Set the number of snowflakes
        this.count = count;
        // Set the minimum and maximum radius of the snowflakes
        this.minRadius = minRadius;
        this.maxRadius = maxRadius;
        // Set the speed of the snowflakes
        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;
        // Set the color of the snowflakes
        this.color = color;
        // Set the text
        this.text = text;
        // Call the function to create the snowflakes
        this.createSnowflakes();
        // Call the function to animate the snowflakes
        this.animateSnowflakes();
    }

    // Function to resize the canvas
    resizeCanvas = () => {
        let oldCanvasWidth, oldCanvasHeight
        if (this.snowflakes) {
            oldCanvasWidth = this.canvas.width
            oldCanvasHeight = this.canvas.height
        }
        this.canvas.style.display = 'none';

        // Set the width and height of the canvas equal to the width and height of the browser window
        if (window.devicePixelRatio > 1) {
            let scrollWidth = document.documentElement.scrollWidth
            let scrollHeight = document.documentElement.scrollHeight
            this.canvas.width = scrollWidth * window.devicePixelRatio;
            this.canvas.height = scrollHeight * window.devicePixelRatio;
            this.canvas.style.width = scrollWidth + "px";
            this.canvas.style.height = scrollHeight + "px";
            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        } else {
            this.canvas.width = document.documentElement.scrollWidth;
            this.canvas.height = document.documentElement.scrollHeight;
        }
        this.canvas.style.display = ''
        if (this.snowflakes) {
            let newCanvasWidth = this.canvas.width
            let newCanvasHeight = this.canvas.height
            // Loop through the array of snowflakes
            for (let snowflake of this.snowflakes) {
                // Update the position of the snowflake after resizing the canvas
                snowflake.updateAfterCanvasResize(oldCanvasWidth, oldCanvasHeight, newCanvasWidth, newCanvasHeight);
            }
        }
    }

    // Function to create snowflakes and add them to the array
    createSnowflakes = () => {
        // Loop through the number of snowflakes
        for (let i = 0; i < this.count; i++) {
            // Generate a random radius within the minimum and maximum radius
            let r = this.minRadius + Math.random() * (this.maxRadius - this.minRadius);
            // Generate the speed based on the size of the snowflake
            let rp;
            if (this.minRadius !== this.maxRadius) {
                rp = (r - this.minRadius) / ((this.maxRadius - this.minRadius) / 100);
            } else {
                rp = 100;
            }
            let s = this.minSpeed + ((this.maxSpeed - this.minSpeed) / 100 * rp);
            // Create a new snowflake object with the given parameters
            let snowflake = new Snowflake(this.canvas, r, s, this.color, this.text);
            // Add the snowflake to the array
            this.snowflakes.push(snowflake);
        }
    }

    // Function to animate the snowflakes
    animateSnowflakes = () => {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Loop through the array of snowflakes
        for (let snowflake of this.snowflakes) {
            // Draw the snowflake on the canvas
            snowflake.draw(this.ctx);
            // Update the position of the snowflake
            snowflake.update(this.canvas);
        }
        // Request a new animation frame
        this.requestAnimationFrame = requestAnimationFrame(this.animateSnowflakes);
    }

    // Method to destroy the snowfall and remove the canvas element
    destroy = () => {
        cancelAnimationFrame(this.requestAnimationFrame);
        document.getElementById("snowfall").remove();
        for (let name in this) {
            delete this[name];
        }
        // Empty the array of snowflakes
        this.snowflakes = [];
        // Remove the event listener for resize
        window.removeEventListener("resize", this.resizeCanvas);
    }
}