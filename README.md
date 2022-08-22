# Base Visualisation Builder

A base project for visualisation builders on DAFNI. This project has in it the code needed to
authenticate and authorise users on DAFNI which will allow you to focus on the code to actually
implement the visualisation builder you want to create.

The project uses [Vue](https://v2.vuejs.org/) and [Vuetify](https://vuetifyjs.com/en/) as these
are the tools DAFNI uses to build its Front Ends. The only restrictions visualisation builders on
DAFNI have are; firstly they must be built as web applications so that they can be deployed and
loaded in a browser, secondly they must be linked into DAFNI's Keycloak auth service otherwise
we will not be able to provide your visualisation with any data. If you would prefer to write
your visualisation builder in React/Angular or even pure HTML + JS then that is up to you and it
should work on DAFNI, this base project is provided purely for your convenience as a quick way to
start writing your builder without needing to worry about how to login to Keycloak, get the
visualisation instance details or data files from DAFNI etc.
