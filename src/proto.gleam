import board/impl_board
import lustre
import lustre/element
import lustre/element/html

// Main
pub fn main() {
  // define board 
  impl_board.define_web_component()
  let board = element.element("canvas-board", [], [])

  // create app
  let app = lustre.element(html.main([], [board]))
  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}
