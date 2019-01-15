# Permission management

We begin by creating a new gated /permissions page which providing we're an admin will load a list of users and their permissions - to do this we need to

- Create a new query `users`
  - By adding some extra information to the request context within `index` we can attatch the user that has sent the request
    - Within the query check whether the user is logged in (session ID exists)
    - Check whether the user has the permissions `ADMIN`
    - Return the results to the user if so

We then consume this component within our new Permissions page - using our styled table / button to make it look good