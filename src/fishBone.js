/* 
	@description FishBone widget.
	@author: Natarajan Shanker
	@example: new FishBone({ elements: ["One","Two","Three"],result: "Result" });
*/

// Array function to split a given array into two arrays
Array.prototype.splitArray = Array.prototype.splitArray || function () {
	var point = parseInt(this.length / 2) - 1;

	return {
		first: this.slice(0, point + 1),
		second: this.slice(point + 1)
	}
}

// The FishBone constructor
var FishBone = function (data, attributes) {
	this.elements = data.elements;
	this.attributes = attributes;
	this.result = data.result;
	this.draw();
};

// The FishBone prototype exposing the functionality
FishBone.prototype = {

	// draw the fish bone
	draw: function () {

		// split into two arrays, one for top and another for bottom
		var firstHalf = this.elements.splitArray().first,
			secondHalf = this.elements.splitArray().second;

		// create the canvas if it doesn't exist
		this.canvas = this.canvas || this.createCanvas();

		// set canvas properties
		var ctx = this.canvas.getContext("2d");
		ctx.font = "30px Arial";

		// start at 20 pixels from left
		var beg = 20;

		// draw the top half
		firstHalf.forEach(function (element) {

			// draw the box
			ctx.rect(beg, 20, 150, 100);
			ctx.stroke();

			// write the text
			ctx.fillText(element, beg + 20, 75);
			ctx.stroke();

			// draw the line from the box to the center line
			ctx.moveTo(beg + 75, 120);
			ctx.lineTo(beg + 100, 150);
			ctx.stroke();

			// increment left, for next box
			beg = beg + 200;
		});

		// reset left
		beg = 20;

		// draw the lower haf
		secondHalf.forEach(function (element) {

			// draw the box
			ctx.rect(beg, 180, 150, 100);
			ctx.stroke();

			// write the text
			ctx.fillText(element, beg + 20, 235);
			ctx.stroke();

			// draw the line from the box to the center line
			ctx.moveTo(beg + 75, 180);
			ctx.lineTo(beg + 100, 150);
			ctx.stroke();

			// increment left, for next box
			beg = beg + 200;
		});

		// the center line
		ctx.moveTo(20, 150);
		ctx.lineTo(beg, 150);
		ctx.stroke();

		// the box for the "result"
		ctx.rect(beg, 100, 120, 100);
		ctx.stroke();

		// write the "result" text
		ctx.fillText(this.result, beg + 10, 160);
		ctx.stroke();
	},

	// create the canvas DOM object and add it to the body, return it
	createCanvas: function () {
		var canvas = document.createElement("canvas"),
			attributes = this.attributes || {};
			attributes.width = attributes.width || "960px";
			attributes.height = attributes.height || "300px";

		for (attribute in attributes) {
			canvas.setAttribute(attribute, attributes[attribute]);
		}

		document.body.appendChild(canvas);

		return canvas;
	}
};

