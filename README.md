# Angular-Auth-Template

# Angular
We have 4 modules in front side.
1) App module
2) Authorization module
3) Application module
4) Shared module

When user open the programm it automatically opens Authorization page where user can 
``sign in`` and ``sign up`` or reset password if forgot.
in the application we have 2 interceptors.
1) authorization interceptor
2) request handler interceptor

Authorization interceptor is checking is there ``auth_token`` in the local storage or not if not it redirects to login page if yes then request is working.

Request handler interceptor is checking ```401 unauthorized``` error which is coming from back side the error we can get when JWT token is expired. If interceptor is getting the error it redirects user to auth page to authorize again.

to make authorization and security more reliable We have Guards for routers which are checking for ``auth_token`` in local storage if the token is existing automatically opening user page if token doesn't exist it redirects to Authorization page. If auth_token is existing user can't open authorization page it always redirects to user page same way working second guard which is responsable for authorization router.

# How works application.

```npm run start``` is running ``ng serve`` command which runs applications and opens on ``localhost:/4200 PORT``
when we run the application it is going inside ``app-routing.module`` and checking if we didn't give any route before ``localhost:/4200`` it reads the path which is written in empty route and the route itself redirects to ``auth`` path there you can notice ``pathMatch`` which means after redirection the path name will be visible in the browser URL. in the route we're passing ``Authcomponent`` as a component which will be loaded and we're using lazy loading we load there ``authorization`` module, on the route we added ``Router Guard`` which is checking if ``user_token`` is existing in the local storage it skips the ``Auth module`` and redirects to ``System Module``.

`Application-routing.module` and ``application.module`` are created for lazy loading there we will show all those components which will be visible to user after authorization. If you see ``path:'**'``, that means when user wrote a URL which is not existing.

# Node js Express

in the back side we have src folder which is the root file inside whish we have these folders
``controller`` / ``middleware`` / ``model`` / ``public`` / ``uploads`` / ``utils``.

for file uploading we use multer and inside DB we save the image name but the exact image we save inside the project for that we have special folder it called public, to show the images we should put the backed hostName with image name for example ``localhost:3000/public/image.png`` this path we should write inside ``src`` ``<img src="localhost:3000/public/image.png">`` this will pake request to backend and find the image by passed name.

# How back-end works
all requests are public for user user can make requests without auth_token except ``/user`` route because there we use a middleware which is checking user has ``auth_token`` or not if no then middleware returns an ``HttpException`` with 401 status code which means ``User is not authorized``. When user Signing up his password is hashing via ``bycript`` library after authorization user can login.

 