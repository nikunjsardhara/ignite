# Door-design-admin

Door design admin in adminator **to give permissions** to a particular adminator
& **assign roles** to the adminators.

## Developers

### Environment Variables

To run this project, we need create environment variables file for following command.

```sh
cp .env.example .env
```

### Available Scripts

To run this project, we need create environment variables file for following command.

```sh
npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

```sh
npm test
```

Launches the test runner in the interactive watch mode.See the section about [running tests](https://create-react-app.dev/docs/running-tests/) for more information.

```sh
npm run build
```

Builds the app for production to the build folder.It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

```sh
npm run eject
```

Note: this is a one-way operation. Once you `eject`, **you can’t go back!**

## Screenshot

![Adminator dashboard](https://i.imgur.com/7GMVe8f.png)

### Demo Site Image: [Here](https://i.imgur.com/7GMVe8f.png)

## Table of contents

- [Door-design-admin](#door-design-admin)
  - [Developers](#developers)
    - [Environment Variables](#environment-variables)
    - [Available Scripts](#available-scripts)
  - [Screenshot](#screenshot)
    - [Demo Site Image: Here](#demo-site-image-here)
  - [Table of contents](#table-of-contents)
  - [Dashboard](#dashboard)
    - [Create Users](#create-users)
    - [Active-Disactive set users & Delete users](#active-disactive-set-users--delete-users)
    - [Edit user](#edit-user)
  - [Adding Roles](#adding-roles)
  - [Door Submissions](#door-submissions)
  - [Setting](#setting)

## Dashboard

In dashboard adminator is show site current analytics.

![Users](https://i.imgur.com/vOMBkea.png)

### Create Users

Just click **Add new user** in below image

![Add new user](https://i.imgur.com/o4xgszR.png)

### Active-Disactive set users & Delete users

Just click **user icons** in below image

![Delete users](https://i.imgur.com/dwDLCEd.png)

### Edit user

If you can edit users then click on user **name**. You can edit also their roles in edit user page. You can set custom roles as your choices.

## Adding Roles

We can add roles with their permissions(permissions are describe below). You can make your custom roles name and manages roles (by edit & delete roles).

| Permissions  | Actions |
| ------------ | ------- |
| submission_c | Create  |
| submission_r | Read    |
| submission_u | Update  |
| submission_d | Delete  |

We can add multiple permissions (just by select multiple in select field) & add particular role in multiple permissions.

## Door Submissions

In door submissions all users are submitted doors and each doors of attributes & values are shown to adminator and manages door by their custom permissions.

![Door submissions](https://i.imgur.com/Rh5gAmF.png)

[View full image](https://i.imgur.com/Rh5gAmF.png)

## Setting

Edit adminator's profile


