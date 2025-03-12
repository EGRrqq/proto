/**
 * @typedef {object} ICustomElement
 * @property {ElementInternals} _internals
 * @property {() => void} connectedCallback
 * @property {() => void} disconnectedCallback
 * @property {() => void} adoptedCallback
 * @property {(name: TObservedAttributes, oldValue: string, newValue: string ) => void} attributeChangedCallback
 */

/** @typedef {[]} TObservedAttributes */

// Create a class for the element
/**
 * Class repsents custom drawing canvas elem
 * @extends {HTMLElement}
 * @implements {Partial<ICustomElement>}
 */
class CanvasBoard extends HTMLElement {
	/** @type TObservedAttributes */
	static observedAttributes = [];

	constructor() {
		// Always call super first in constructor
		super();
		console.log(this, this.ELEMENT_NODE);
	}

	/** @type {ICustomElement["connectedCallback"]} */
	connectedCallback() {
		console.log("Custom element added to page.");

		const shadow = this.attachShadow({ mode: "open" });
		const canvas = document.createElement("canvas");
		shadow.appendChild(canvas);
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
}

/**
 * initialize canvas
 * @type {() => void}
 */
export const canvas_init = () =>
	customElements.define("canvas-board", CanvasBoard);
