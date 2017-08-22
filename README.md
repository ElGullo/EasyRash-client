Introduction
-------------

EasyRash is an online platform for organizing academic conferences.
It covers all the roles and phases involved in the process, including
Event and Paper submissions and Peer-Review.
The reviewers can use the site to annotate the papers
and give feedback to the chair for the final decision.

This is the EasyRash client repo.

Requirements
-------------
```
angular
gulp
gulp-concat
gulp-rename
gulp-uglify
gulp-order
gulp-watch
postcss-scopify
gulp-postcss
```

You can install them easily with npm:

```
npm install angular gulp gulp-concat gulp-rename gulp-uglify gulp-order gulp-watch postcss-scopify gulp-postcss
```

Usage
------

- Set baseUrl in js/app.js to your server url (defaults to localhost:10000)
- Compile with Gulp
```
make
```
- Serve index.html with Apache/Ngnix.

