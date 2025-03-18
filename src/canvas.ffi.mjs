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
	// variables
	/**
	 * canvas context INIT variable
	 * @type {CanvasRenderingContext2D | null}
	 * @private */
	CTX = null;

	/** @type TObservedAttributes */
	static observedAttributes = [];

	constructor() {
		// Always call super first in constructor
		super();

		this.canvas_init();
		console.log(this.ctx);
	}

	// -- WEB COMPONENT METHODS --

	/** @type {ICustomElement["connectedCallback"]} */
	connectedCallback() {
		console.log("connected");
		// attach shadow dom to web component
		const shadow = this.attachShadow({ mode: "open" });
		// append canvas to shadow dom
		shadow.appendChild(this.ctx.canvas);

		// draw loop, on each render
		// will be inside animation frame
		this.clear();
		this.scale();

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
		// can pass settings in future
		this.CTX = canvas.getContext("2d", {});
	};

	// -- GETTERS --

	/**
	 * Getter for canvas context
	 * @type {ICanvasBoard["ctx"]} */
	get ctx() {
		if (!this.CTX) throw new Error("Canvas ctx is NULL");

		return this.CTX;
	}

	// -- VIEW METHODS --

	/**
	 * Clear canvas
	 * @type {() => void}
	 * @private
	 * */
	clear = () =>
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

	/**
	 * [Scaling for high resolution displays. MDN DOCS](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays)
	 * @type {() => void}
	 * @private
	 * */
	scale = () => {
		// Get the DPR and size of the canvas
		const dpr = window.devicePixelRatio;
		const rect = this.ctx.canvas.getBoundingClientRect();

		// Set the "actual" size of the canvas
		this.ctx.canvas.width = rect.width * dpr;
		this.ctx.canvas.height = rect.height * dpr;

		// Scale the context to ensure correct drawing operations
		this.ctx.scale(dpr, dpr);

		// Set the "drawn" size of the canvas
		this.ctx.canvas.style.width = `${rect.width}px`;
		this.ctx.canvas.style.height = `${rect.height}px`;
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
