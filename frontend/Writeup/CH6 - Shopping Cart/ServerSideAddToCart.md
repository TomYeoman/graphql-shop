# Serverside add to cart

- We'll need to create a new table to store which items a user has selected, we will call it `CartItem`

- Add a new mutation addToCart where we'll pass in an item to add. By fetching the user ID from the request + using the item we added we can

1) Add an item to the cartItem if it already exists
2) Update the quantity if that cartItem alreadt exists

