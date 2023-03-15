import { IRoutePath } from '../app-routes';


export class AppPublicRoute {

    /**
     * @description The initial/default aboslute url for users when they visit the application
     */
    public static $absolutePath = `public`;

    /**
     * @description The name of the url for registering in routing module
     */
    public static $name = `public`;

    /**
     * @description Get the url string for routing to the home/feeds page which should be the initial/default page when visiting the site
     */
    public static home(): IRoutePath {
        return {
            $name: `home`,
            $absolutePath: `${AppPublicRoute.$absolutePath}/home`
        };
    }

    /**
     * @description Get the url string for routing to the sign in page
     */
    public static signIn(): IRoutePath {
        return {
            $name: `signin`,
            $absolutePath: `${AppPublicRoute.$absolutePath}/signin`
        };
    }

    /**
     * @description Get the url string for routing to the sign up page
     */
    public static signUpWithEmail(): IRoutePath {
        return {
            $name: `signup-with-email`,
            $absolutePath: `${AppPublicRoute.$absolutePath}/signup-with-email`
        };
    }


    /**
     * @description Get the url string for routing to the page to verify users email address
     */
    public static verifyEmail(): IRoutePath {
        return {
            $name: `verify-email`,
            $absolutePath: `${AppPublicRoute.$absolutePath}/verify-email`
        };
    }

    /**
     * @description Get the url string for routing to request for change of password
     */
    public static forgotPassword(): IRoutePath {
        return {
            $name: `forgot-password`,
            $absolutePath: `${AppPublicRoute.$absolutePath}/forgot-password`
        };
    }

    /**
     * @description Get the url string for routing to request to reset your password
     */
    public static resetPassword(): IRoutePath {
        return {
            $name: `reset-password`,
            $absolutePath: `${AppPublicRoute.$absolutePath}/reset-password`
        };
    }

    /**
     * @description Get the url string for routing to the page to request for new verification email sent
     */
    public static sendEmailVerification(): IRoutePath {
        return {
            $name: `send-email-verification`,
            $absolutePath: `${AppPublicRoute.$absolutePath}/send-email-verification`
        };
    }


    /**
     * @description Get the status of an email sent
     */
     public static emailStatus(): IRoutePath {
        return {
            $name: `email-status`,
            $absolutePath: `${AppPublicRoute.$absolutePath}/email-status`
        };
    }

    public static getRoutes(): IAppPublicRoute {
      return {
        $absolutePath: AppPublicRoute.$absolutePath,
        $name: AppPublicRoute.$name,
        home: AppPublicRoute.home,
        signIn: AppPublicRoute.signIn,
        signUpWithEmail: AppPublicRoute.signUpWithEmail,
        verifyEmail: AppPublicRoute.verifyEmail,
        forgotPassword: AppPublicRoute.forgotPassword,
        resetPassword: AppPublicRoute.resetPassword,
        sendEmailVerification: AppPublicRoute.sendEmailVerification,
        emailStatus: AppPublicRoute.emailStatus,
      };
    }
}

export interface IAppPublicRoute {
  $absolutePath: string;
  $name: string;
  home: () => IRoutePath;
  signIn: () => IRoutePath;
  signUpWithEmail: () => IRoutePath;
  verifyEmail: () => IRoutePath;
  forgotPassword: () => IRoutePath;
  resetPassword: () => IRoutePath;
  sendEmailVerification: () => IRoutePath;
  emailStatus: () => IRoutePath;
}

