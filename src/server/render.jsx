// Express middleware to render the app server-side and expose its state
// to the client

import React from "react";
import Router from "react-router";

import HtmlDocument from "./HtmlDocument";
import {fetchData, routes} from "../routes";


const debug = require("debug")("app:render");
let webpackStats;

if (process.env.NODE_ENV === "production") {
  webpackStats = require("./webpack-stats.json");
}


function render(req, res, next) {
  if (process.env.NODE_ENV === "development") {
    webpackStats = require("./webpack-stats.json");
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve("./webpack-stats.json")];
  }
  var router = Router.create({
    location: req.url,
    onAbort(redirect) {
      debug("onAbort redirect:", redirect);
      res.redirect(303, redirect.to);
    },
    onError(err) {
      debug("Routing Error", err);
    },
    routes: routes,
  });
  router.run((Root, state) => {
    fetchData(state.routes, state.params, state.query)
      .then(
        data => React.renderToString(<Root loading={false} {...data} />),
        errors => {
          debug("errors", errors);
          return React.renderToString(<Root errors={errors} loading={false} />);
        }
      ).then(markup => {
        const css = webpackStats.css.concat([
          process.env.NODE_ENV === "production" ? "/assets/basscss.min.css" : "/assets/basscss.css",
        ]);
        const html = React.renderToStaticMarkup(
          <HtmlDocument css={css} markup={markup} scripts={webpackStats.script} />
        );
        const doctype = "<!DOCTYPE html>";
        res.send(doctype + html);
      }).catch(error => next(error));
  });
}


export default render;
