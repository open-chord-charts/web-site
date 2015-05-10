// Express middleware to render the app server-side and expose its state
// to the client

import React from "react";
import Router from "react-router";

import HtmlDocument from "./HtmlDocument";
import {fetchData, routes} from "../routes";


const debug = require("debug")("app:render");


function render(req, res, next) {
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
    if (state.routes.some(route => route.isNotFound)) {
      const appHtml = React.renderToString(<Root/>);
      res.status(404).send(renderMarkup(appHtml));
      return;
    }
    fetchData(state.routes, state.params, state.query)
      .then(
        data => React.renderToString(<Root loading={false} {...data} />),
        errorByRouteName => React.renderToString(<Root errorByRouteName={errorByRouteName} loading={false} />)
      )
      .then(appHtml => res.send(renderMarkup(appHtml)))
      .catch(error => next(error));
  });
}


function renderMarkup(appHtml) {
  let webpackStats;
  if (process.env.NODE_ENV === "production") {
    webpackStats = require("./webpack-stats.json");
  } else if (process.env.NODE_ENV === "development") {
    webpackStats = require("./webpack-stats.json");
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve("./webpack-stats.json")];
  }
  const doctype = "<!DOCTYPE html>";
  const css = webpackStats.css.concat([
    process.env.NODE_ENV === "production" ? "/assets/basscss.min.css" : "/assets/basscss.css",
  ]);
  const html = React.renderToStaticMarkup(
    <HtmlDocument appHtml={appHtml} css={css} scripts={webpackStats.script} />
  );
  return doctype + html;
}


export default render;
