import { AppPrivateRoute, IAppPrivateRoute } from "./public/app-private-routes";
import { AppPublicRoute, IAppPublicRoute } from "./public/app-public-routes";

/**
 * @description contains all the routes used in the application
 */
export class ApplicationRoutes {

  static generateRoutes(): IApplicationRoutes
  {

    return {
      /**
       * @description get the urls for the public part of the application
       * @returns AppPublicRoute as a class
       */
        publicRoute : AppPublicRoute.getRoutes(),

      /**
       * @description get the urls for the private part of the application
       * @returns AppPrivateRoute as a class
       */
       privateRoute : AppPrivateRoute.getRoutes(),

      /**
       * @description logouts and redirect to the sign page
       * @returns string
       */
       logout : `logout`,

       /**
        * @description lnot found page
        * @returns string
        */
       notFound : `notFound`,
    }


  }

}



/**
 * @description The interface use for any route
 */
 export interface IRoutePath {
  /**
   * @description The name of the route which is used in registering the route to a component in the routing module file
   */
  $name: string;


  /**
   * @description The absolute path of the route which is used to nagivate to the page
   */
  $absolutePath: string;
}

export interface IApplicationRoutes {
  publicRoute: IAppPublicRoute;
  privateRoute: IAppPrivateRoute;
  // testsRoute: IAppTestsRoute;
  // privateRoute: IAppPrivateRoute;
  // // studentRoute: IAppStudentRoute;
  // admin: IAppAdminRoute;
  logout: string;
  notFound: string;
}
