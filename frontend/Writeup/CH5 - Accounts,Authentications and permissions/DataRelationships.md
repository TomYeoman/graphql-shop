# Data relationships

We can establish a connection with our `datamodel.graphql` schema like so

```
!User
```

We then use the connect within our queries / mutations to connect that piece of data
```
        const item = await ctx.db.mutation.createItem({
            data : {
                // This is how we create a relationship between the item and the user
                user: {
                    connect: {
                        id: "123",
                    }
                },
                ...args
            }
        }, info);
```