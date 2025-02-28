import lustre
import lustre/attribute
import lustre/element
import lustre/element/html
import paint/canvas

// Main
pub fn main() {
  canvas.define_web_component()
  let board =
    element.element(
      "paint-canvas",
      [
        attribute.id("board"),
        attribute.width(800),
        attribute.height(600),
        attribute.style([#("background", "#eee")]),
      ],
      [],
    )
  let app = lustre.element(html.main([], [board]))

  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}
