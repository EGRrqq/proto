/**
 * @typedef {object} ICustomElement
 * @property {ElementInternals} _internals
 * @property {() => void} connectedCallback
 * @property {() => void} disconnectedCallback
 * @property {() => void} adoptedCallback
 * @property {(name: TObservedAttributes, oldValue: string, newValue: string ) => void} attributeChangedCallback
 */

/** @typedef {[]} TObservedAttributes */

/**
 * @typedef {object} ICanvasBoard
 * @property {CanvasRenderingContext2D} ctx
 */

// Create a class for the element
/**
 * Class repsents custom drawing canvas elem
 * @extends {HTMLElement}
 * @implements {Partial<ICustomElement>}
 * @implements {ICanvasBoard}
 */
class CanvasBoard extends HTMLElement {
	// -- VARS --

	/** @type TObservedAttributes */
	static observedAttributes = [];

	// -- CONSTRUCTOR --

	constructor() {
		// Always call super first in constructor
		super();

		this.canvas_init();
		this.css_init();
	}

	// -- WEB COMPONENT METHODS --

	/** @type {ICustomElement["connectedCallback"]} */
	connectedCallback() {
		console.log("connected");
		// attach shadow dom to web component
		const shadow = this.attachShadow({ mode: "open" });
		// append canvas to shadow dom
		shadow.appendChild(this.ctx.canvas);
		shadow.appendChild(this.css);

		// initialize render loop
		this.canvas_render();

		// draw rectangle to check how scale works
		this.drawRect();
	}

	/** @type {ICustomElement["disconnectedCallback"]} */
	disconnectedCallback() {
		console.log("Custom element removed from page.");
	}

	/** @type {ICustomElement["adoptedCallback"]} */
	adoptedCallback() {
		console.log("Custom element moved to new page.");
	}

	/** @type {ICustomElement["attributeChangedCallback"]} */
	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`Attribute ${name} has changed.`);
	}

	// -- HELPER METHODS --

	/**
	 * Initialize canvas with 2d context
	 * @type {() => void}
	 * @private */
	canvas_init = () => {
		const canvas = document.createElement("canvas");
		/**
		 * canvas context declaration init
		 * can pass setiings in the future
		 * @type {CanvasRenderingContext2D | null}
		 * @private
		 */
		this._ctx = canvas.getContext("2d", {});
	};

	/**
	 * Initialize web components css styles
	 * @type {() => void}
	 * @private */
	css_init = () => {
		// add classes and ids for html elemns
		this.ctx.canvas.id = "board";

		/**
		 * css declaration init
		 * @type {HTMLStyleElement | null}
		 * @private
		 */
		this._css = document.createElement("style");
		this._css.textContent = /* css */ `
		`;
	};

	/**
	 * render loop, will be called inside `requestAnimationFrame`
	 * @type {() => void}
	 * @private */
	canvas_render = () => {
		this.clear();
		this.scale();
	};

	// -- GETTERS --

	/**
	 * Getter for canvas context
	 * @type {ICanvasBoard["ctx"]} */
	get ctx() {
		if (!(this._ctx instanceof CanvasRenderingContext2D))
			throw new Error(
				"Canvas ctx var is not equal to CanvasRenderingContext2D",
			);

		return this._ctx;
	}

	/**
	 * Getter for canvas context
	 * @type {HTMLStyleElement}
	 * @private */
	get css() {
		if (!(this._css instanceof HTMLStyleElement))
			throw new Error("Custom CSS var is not equal to HTMLStyleElement");

		return this._css;
	}

	// -- VIEW METHODS --

	/**
	 * Clear canvas
	 * @type {() => void}
	 * @private
	 * */
	clear = () => {
		// get canvas ctx only once
		const ctx = this.ctx;

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	};

	/**
	 * [Scaling for high resolution displays. MDN DOCS](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays)
	 * @type {() => void}
	 * @private
	 * */
	scale = () => {
		// get canvas ctx only once
		const ctx = this.ctx;

		// Get the DPR and size of the canvas
		const dpr = window.devicePixelRatio;
		const rect = ctx.canvas.getBoundingClientRect();

		// Set the "actual" size of the canvas
		ctx.canvas.width = rect.width * dpr;
		ctx.canvas.height = rect.height * dpr;

		// Scale the context to ensure correct drawing operations
		ctx.scale(dpr, dpr);

		// Set the "drawn" size of the canvas
		ctx.canvas.style.width = `${rect.width}px`;
		ctx.canvas.style.height = `${rect.height}px`;
	};

	// -- DRAW METHODS --

	/**
	 * Draw rectangle on the canvas
	 * @type {() => void}
	 * @private
	 * */
	drawRect = () => {
		const settings = {
			fillStyle: "#007bff",
			strokeStyle: "black",
			style: "fill",
		};
		const rect = {
			position: {
				x: 150,
				y: 75,
			},
			size: {
				width: 75,
				height: 105,
			},
		};

		this.ctx.save();

		const { position, size } = rect;
		const halfWidth = size.width / 2;
		const halfHeight = size.height / 2;
		const x = position.x - halfWidth;
		const y = position.y - halfHeight;

		this.ctx.fillStyle = settings.fillStyle;
		this.ctx.fillRect(x, y, size.width, size.height);

		this.ctx.restore();
	};
}

/**
 * define web component with canvas
 * @type {() => void}
 */
export const define_web_component = () =>
	customElements.define("canvas-board", CanvasBoard);
