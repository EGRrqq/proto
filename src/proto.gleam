import lustre
import lustre/attribute
import lustre/element/html

// Main
pub fn main() {
  let app =
    lustre.element(html.main([], [html.canvas([attribute.id("board")])]))
  lustre.start(app, "#app", Nil)
}
