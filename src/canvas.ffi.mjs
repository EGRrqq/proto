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

	/** @type {ICustomElement["connectedCallback"]} */
	connectedCallback() {
		console.log("connected");
		// attach shadow dom to web component
		const shadow = this.attachShadow({ mode: "open" });
		// append canvas to shadow dom
		shadow.appendChild(this.ctx.canvas);
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

	// ---

	/**
	 * Initialize canvas with 2d context
	 * @type {() => void}
	 * @private */
	canvas_init = () => {
		const canvas = document.createElement("canvas");
		// can pass settings in future
		this.CTX = canvas.getContext("2d", {});
	};

	/**
	 * Getter for canvas context
	 * @type {ICanvasBoard["ctx"]} */
	get ctx() {
		if (!this.CTX) throw new Error("Canvas ctx is NULL");

		return this.CTX;
	}
}

/**
 * initialize canvas
 * @type {() => void}
 */
export const canvas_define = () =>
	customElements.define("canvas-board", CanvasBoard);
