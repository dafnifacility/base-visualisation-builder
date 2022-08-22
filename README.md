# Base Visualisation Builder

A base project for visualisation builders on DAFNI. This project has in it the code needed to
authenticate and authorise users on DAFNI which will allow you to focus on the code to actually
implement the visualisation builder you want to create.

The project uses [Vue](https://v2.vuejs.org/) and [Vuetify](https://vuetifyjs.com/en/) as these
are the tools DAFNI uses to build its Front Ends. The only restrictions visualisation builders on
DAFNI have are; firstly they must be built as web applications so that they can be deployed and
loaded in a browser, secondly they must be linked into DAFNI's Keycloak auth service otherwise
we will not be able to provide your visualisation with any data. If you would prefer to write 
your visualisation builder in React/Angular or even pure HTML + JS then that is also possible 
and you can use the code in this project as an example for setting up your Keycloak login, 
getting a visualisation instance details and/or accessing data files from the DAFNI store.

Below we will briefly go over each folder, the contents and whether they are necessary for your visualisation builder to work on DAFNI.

## api

This folder contains the code that calls across to DAFNI's APIs. There are functions to call to
get a visualisation instance, get the list of files contained in a list of dataset versions and
download a file from our Minio store. The backends folder inside `api` contains a script that
will load the API urls into the application so that they can be called by your code.

The entirety of this folder is required for your visualisation builder to work correctly.

## assets - Standard Vue Directory

This folder contains the same stylesheets that are used to create the DAFNI facility and
Documentation sites. We make these available to allow you to match your visualisation builder to
DAFNI's style if you would like to, though that is up to you.

None of this folder is required for your visualisation builder to work correctly. Feel free to
delete it or change some of the contents. NOTE - if you do delete the folder then you may need
to change some other files that currently rely on the contents of this folder, including 
`nuxt.config.js` and `static/js/colours.`.

## backends-templates

This folder contains some template JSON files that when deployed will be filled with DAFNI's API
urls.

This folder is required for your visualisation builder to work correctly. You should be able to
just ignore this folder completely.

## components - Standard Vue Directory

This is the folder that Vue expects custom components to be placed in. Currently inside this 
folder is a copy of DAFNI's loading spinner component, that displays when the builder is logging 
in to DAFNI.

This folder is not required for your visualisation builder to work correctly. Feel free to 
delete the folder, change the components we have provided or add new components yourself - Vue 
heavily encourages you to create new custom components. NOTE - deleting this folder would 
require you to change some files that use the loading spinner, we would not recommend you delete 
the folder unless you are familiar with Vue.

## layouts - Standard Vue Directory

This is the folder that Vue expects the base layout files for your application to be placed in. 
We have provided DAFNI's default and error layouts.

This folder is not required for your visualisation builder to work correctly. Feel free to 
delete the folder, change the layouts we have provided or add new layouts yourself - Vue 
encourages using layouts. NOTE - we do not recommend deleting the folder unless you are familiar 
with Vue.

## middleware - Standard Vue Directory

This folder contains a script that waits to ensure DAFNI's API urls have been loaded into the 
application and will trigger a redirect if the DAFNI account that is currently logged in does 
not have the correct permissions to see visualisations on DAFNI. Scripts placed in this folder 
will run before a page is rendered on a route change. For more information follow the link in 
the README.md in the folder.

This folder is required for your visualisation builder to work correctly.

## pages - Standard Vue Directory

This is the folder that Vue expects your views and routes to be placed in. In order for your 
visualisation builder to work correctly once deployed it must be made available at the url 
`instance/INSTANCE_UUID` we have provided the correct page for this in the file 
`pages/instance/_id.vue`. 

This folder is required for your visualisation builder to work correctly. Feel free to modify 
the page we have provided but do not delete it or the folder.


## plugins - Standard Vue Directory

This is the folder that Vue expects Javascript plugins to be placed in. These scripts run before 
the application has been mounted. There are 3 plugins in this folder that we have provided, one 
that provides a request interceptor for axios so the correct information is sent to our APIs, 
one handles all of the keycloak login processes for you and the last initialises vuetify for 
this project.

This folder is required for your visualisation builder to work correctly. Feel free to add new 
plugins or modify the vuetify plugin, do not remove or modify the axios/keycloak plugins.


## static

This folder contains some useful javascript files in `static/js` and some useful pngs and svgs 
in `static/ui` that can be used if you would like to style your visualisation builder to align 
with DAFNI. There is also a test csv file in the folder in case you need some test data to load 
into your builder. 

This folder is not required for your visualisation builder to work correctly but 
`static/js/authenticated.js` is needed as it contains some utility functions used in the 
authentication code in this project. Feel free to remove or modify the rest of the files.

# store - Standard Vue Directory

This is the folder that Vue/[Vuex](https://vuex.vuejs.org/) expects store files to be placed in. 
State management is taken care of by the scripts in this folder. We have provided 3 store files 
for you, `auth.js` contains all of the state management associated with keycloak and logins to 
DAFNI, `index.js` contains the loading state to determine whether the page is loading or not, 
`dafni.js` contains the state management associated with calling the APIs as well as the 
responses from those API calls. 

This folder is required for your visualisation builder to work correctly. Feel free to add new 
store files or modify the index store, do not remove or modify the auth/dafni store files.

## Build setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

```
