import board/impl_board
import lustre
import lustre/attribute
import lustre/element
import lustre/element/html

// todo:
// - define canvas

// Main
pub fn main() {
  // define web
  impl_board.define_web_component()
  let board = element.element("canvas-board", [], [])

  let app = lustre.element(html.main([], [board]))
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}
