import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routeMenu from "./routeMenu";
import Page404 from "@/pages/Error/404";
import Page500 from "@/pages/Error/500";

const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        {routeMenu.map(({ layout: Layout, routes }, i) => {
          return routes.map(routesItem => {
            return (
              <Route
                exact
                key={routesItem.path}
                path={routesItem.path}
                render={() => (
                  <Layout key={i.toString()} {...props}>
                    <routesItem.component />
                  </Layout>
                )}
              />
            );
          });
        })}
        <Route exact path="/500" component={Page500} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
