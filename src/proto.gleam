<<<<<<< HEAD
import dot_env
import dot_env/env
import gleam/erlang/process
import mist
import proto/router
import wisp
import wisp/wisp_mist

pub fn main() {
  // This sets the logger to print INFO level logs, and other sensible defaults
  // for a web application.
  wisp.configure_logger()

  // Here we generate a secret key, but in a real application you would want to
  // load this from somewhere so that it is not regenerated on every restart.
  dot_env.new()
  |> dot_env.set_path(".env")
  |> dot_env.set_debug(False)
  |> dot_env.load
  let assert Ok(secret_key_base) = env.get_string("SECRET_KEY_BASE")

  // Start the Mist web server.
  let assert Ok(_) =
    wisp_mist.handler(router.handle_request, secret_key_base)
    |> mist.new
    |> mist.port(8000)
    |> mist.start_http

  // The web server runs in new Erlang process, so put this one to sleep while
  // it works concurrently.
  process.sleep_forever()
=======
import lustre
import lustre/attribute
import lustre/element
import lustre/element/html
import lustre/ui

pub fn main() {
  let styles = []
  let _app =
    lustre.element(ui.centre(
      [attribute.style(styles)],
      html.h1([], [element.text("sleeeeeeeeeeeeeeepy")]),
    ))

  let br = lustre.element(html.h1([], [element.text("Yoo")]))

  let assert Ok(_) = lustre.start(br, "#app", Nil)

  Nil
>>>>>>> 3d660ff (client init)
}
