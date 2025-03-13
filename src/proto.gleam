import lustre
import lustre/attribute
import lustre/element
import lustre/element/html

// todo:
// - define canvas

// Main
pub fn main() {
  canvas_define()

  let board = element.element("canvas-board", [], [])

  // canvas.interact
  let app = lustre.element(html.main([], [board]))

  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}

@external(javascript, "./canvas.ffi.mjs", "canvas_define")
pub fn canvas_define() -> Nil
