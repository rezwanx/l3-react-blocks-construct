# Deploying a React App to Azure Static Web Apps Manually

This guide outlines the steps to manually deploy a React application to Azure Static Web Apps using the Azure Static Web Apps CLI. This method is useful for local testing and deployment without relying on automated CI/CD pipelines.

## Prerequisites

*   An Azure subscription. If you don't have one, you can [create a free Azure account](https://azure.microsoft.com/en-us/free/).
*   A React application built for production (using `npm run build` or `yarn build`).
*   Node.js and npm (or yarn) installed.  You can download Node.js from [nodejs.org](https://nodejs.org/).

## Steps

1.  **Create a Static Web App in Azure:**

    *   Navigate to the Azure portal ([https://portal.azure.com](https://portal.azure.com)).
    *   Search for "Static Web Apps" in the search bar and select it.
    *   Click "Create" to create a new Static Web App. You'll need to provide details like the subscription, resource group, and name for your app. *Important:* You do *not* need to connect a repository at this stage if you are deploying manually.

2.  **Create `swa-cli.config.json`:**

    *   Create a file named `swa-cli.config.json` in the root directory of your React project (alongside `package.json`).
    *   Paste the following configuration into the file, replacing `<static-app name>` with the *exact* name of your Static Web App in Azure:

    ```json
    {
      "$schema": "[https://aka.ms/azure/static-web-apps-cli/schema](https://aka.ms/azure/static-web-apps-cli/schema)",
      "configurations": {
        "<static-app name>": {
          "appDir": "build",
          "outputLocation": "build"
        }
      }
    }
    ```

    *   **Explanation:**
        *   `$schema`: Points to the schema for validation.
        *   `configurations`: Contains the configuration for your static web app.
        *   `<static-app name>`: The *name* of your static web app in Azure. **This must match exactly.**
        *   `appDir`: Specifies the directory containing your built application files (usually `build` after running `npm run build`).
        *   `outputLocation`: Should match the `appDir` in this case.  This is where the built files will be located.

3.  **Create `staticwebapp.config.json`:**

    *   Create a file named `staticwebapp.config.json` in the root directory of your React project (alongside `package.json` and `swa-cli.config.json`).
    *   Paste the following configuration into the file:

    ```json
    {
        "navigationFallback": {
            "rewrite": "/index.html"
        }
    }
    ```

    *   **Explanation:**
        *   `trailingSlash`: Configures how trailing slashes in URLs are handled. `"auto"` is generally a good choice.
        *   `routes`: Defines routing rules. The first `/*` route handles initial requests and rewrites them to `/index.html`. The *second* `/*` route with `navigationFallback` is **crucial** for client-side routing in React.
        *   `navigationFallback`: Tells Azure Static Web Apps to serve `index.html` for requests that don't match static files (CSS, JavaScript, images).  This is how client-side routing works.
        *   `exclude`:  Specifies paths to exclude from the `navigationFallback`. This is *essential* so your CSS, JavaScript, and image files are served correctly.  **Make sure these paths match the structure of your `build` directory.**
        *   `responseOverrides`: Allows you to customize responses for specific status codes (like 404 errors).

4.  **Install the Azure Static Web Apps CLI:**

    *   Open your terminal in the root directory of your React project.
    *   Run the following command to install the CLI globally:

    ```bash
    npm install -g @azure/static-web-apps-cli
    ```

5.  **Verify Installation:**

    *   Run the following command to check the CLI version:

    ```bash
    swa --version
    ```

6.  **Get the Deployment Token:**

    *   In the Azure portal, navigate to your Static Web App.
    *   In the left-hand menu, under "Settings," find "Deployment credentials."
    *   Copy the "Manage deployment token" value. **Keep this token secure!** Treat it like a password.

7.  **Deploy the Application:**

    *   In your terminal, navigate to the root directory of your React project.
    *   Run the following command, replacing `<token>` with the deployment token you copied and `<static-app name>` with the name of your static web app in Azure:

    ```bash
    swa deploy --deployment-token "<token>" --config-name "<static-app name>" --env production
    ```
    *   If you do not set `--env` it will deploy as preview mode.
    *   The first time you run this command, it might take a little longer as the CLI downloads the `StaticSitesClient` executable.

8.  **Access Your Application:**

    *   Once the deployment is complete, the CLI will output the URL of your deployed application. You can also find this URL in the Azure portal on the overview page of your Static Web App.

9. **Set up a custom domain in Azure Static Web Apps**
   
    *   By default, Azure Static Web Apps provides an autogenerated domain name for your website, but you can point a custom domain to your site. Free SSL/TLS certificates automatically get created for the autogenerated domain name and any custom domains that you might add. For more details see [Set up a custom domain in Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain-external)

## Troubleshooting

*   **`swa` command not found:** Ensure Node.js and npm (or yarn) are installed correctly, and that you installed the `@azure/static-web-apps-cli` globally.
*   **Deployment errors:** Double-check the `<static-app name>` in your `swa-cli.config.json` file and the `swa deploy` command. Verify the deployment token is correct. Examine the output in the terminal for specific error messages.


This guide provides a manual deployment approach. For production environments, it is highly recommended to set up continuous integration and continuous deployment (CI/CD) using GitHub Actions or Azure DevOps to automate the build and deployment process.  See the [Azure Static Web Apps documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-web-framework?tabs=bash&pivots=vanilla-js) & [About SWA CLI](https://azure.github.io/static-web-apps-cli/docs/intro) for more information on CI/CD.