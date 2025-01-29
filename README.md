# Blocks Construct

Blocks Construct is a fully functional application blueprint designed to accelerate development with **SELISE Blocks**. Pre-integrated with Blocks microservices, it offers a seamless full-stack foundation, complete with essential features, prebuilt modules, and practical use cases. Whether starting fresh or enhancing an existing project, **Blocks Construct** provides a scalable framework that streamlines workflows, ensures best practices, and maximizes **SELISE Blocks'** capabilities.


### 🌍 Live Links  

🔗 *Blocks Construct* - https://dev-construct.seliseblocks.com 

🔗 *Blocks Cloud* - https://dev-app.seliseblocks.com

### Other Links  

🔗 SELISE Blocks cli npm package - https://www.npmjs.com/package/@seliseblocks/cli

🔗 Open-source GitHub repo link -

---








## 📌 Setting Up Blocks Construct from GitHub Using CLI

### Step 1: Access SELISE Blocks Cloud Console

#### Visit SELISE Blocks Cloud Website

- Open your browser and navigate to [SELISE Blocks Cloud](https://dev-app.seliseblocks.com/).

#### Sign Up for an Account

- Click on the **Sign Up** button to create a new account.

#### Log In to Your Account

- Once signed up, log in with your credentials and proceed to the **Console** section.

---

### Step 2: Create a New Project

#### Start a New Project

- In the **Console**, click on **Create New Project**.

#### Project Name (Step 1)

- Enter a **unique name** for your project.

#### Domain (Step 2)

- Provide the **domain** associated with your project.

#### Access Your Project Dashboard

- After creating your project, navigate to the **Project Dashboard**.

---

### Step 3: Install Blocks CLI

#### Install Blocks CLI Globally

```sh
npm install -g @seliseblocks/cli
```

#### Verify the Installation (Optional)

```sh
blocks v
# or
blocks version
```

If you receive a version number, the installation is successful. If no response appears, re-run the previous command.

---

### Step 4: Set Up Your Project

#### Create a New Project Locally

```sh
blocks new <project-name>
```

Replace `<project-name>` with your project’s name.

#### Enter Your Domain

- When prompted, enter the domain you provided earlier.

#### Enter the Project Key

- Find your **Project Key** on your **Project Dashboard** and enter it when prompted.
- The GitHub repository for **Blocks Construct** will now be cloned to your local machine.

#### Navigate to the Project Directory

```sh
cd <project-name>
```

Replace `<project-name>` with your actual project’s name.

---

### Step 5: Install and Start Blocks Construct

#### Install Project Dependencies

```sh
npm install
```

#### Install Blocks Construct

- This will install **Blocks Construct** locally on your machine.

#### Launch the Application

To run the project using your application domain, use:

```sh
npm run start:local
```

or
to run the project using localhost, use:

```sh
npm start
```

- The **login page** for your project should now appear.

---

### Step 6: Create and Log In

#### Create a User on SELISE Blocks Cloud

- If you haven't already, invite a user from User Management Service on the [**SELISE Blocks Cloud**](https://dev-app.seliseblocks.com/) application.

![Screenshot 2025-01-29 at 11 30 28 AM](https://github.com/user-attachments/assets/96185c96-a2e3-4502-8124-29a18f0ad30b)

An activation email will be sent to the user's email for your project portal. Upon clicking it, the user will be able to set a password for the portal, and their account will be activated.

#### Log In to Blocks Construct

- Use your new credentials to log in to [**Blocks Construct**](https://dev-construct.seliseblocks.com).




## 🎯 You're all set!

Now, you can start building and customizing your application using **Blocks Construct**. 🚀

