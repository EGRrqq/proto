import lustre
import lustre/attribute
import lustre/element
import lustre/element/html
import lustre/ui

pub fn main() {
  let styles = [#("font-size", "3rem")]

  let app =
    lustre.element(ui.centre(
      [attribute.style(styles)],
      html.h1([], [element.text("sadness")]),
    ))

  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}
