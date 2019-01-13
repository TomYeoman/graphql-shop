# Gated Signup

We can prevent certain pages from being accessed when not being signed in by wrapping them within a gated component

I.E we create a `PleaseSignIn` page where it will

- Call the GET_CURRENT_USER Query
- Present the sign in page if we do not have a user
- Otherwise it will render the props.children it's been provided