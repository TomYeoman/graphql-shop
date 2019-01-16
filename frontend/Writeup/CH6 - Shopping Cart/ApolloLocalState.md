# Apollo local state

We can create local state through

- Creating a new node in the `withData` fale
- Create queries / mutations we would normally, but reference @local to resolve to our local resolvers

See this in action within the `Cart` component we created,

- We can close the cart within here via the `CloseButton`
- We can re-open it from the new button in the `NavBar` using the same local mutation
