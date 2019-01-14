const { forwardTo } = require("prisma-binding");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail')

const Mutations = {

    /**###########################
    # LOCAL       ##############
    ############################ */

    /**
     *
     * @param {*} parent
     * @param {*} args - the body of the query / mutation
     * @param {*} context - Do we need headers, cookies etc? also covers DB
     * @param {*} info - Contains frontend information ( the query ), this is how we know what to return
     */
    createDog(parent, args, context, info) {
        console.log(args)
        global.dogs = global.dogs || [];
        const newDog = {name : args.name};
        global.dogs.push(newDog)
        return newDog;
    },

    /**###########################
    # PRISMA       #############
    ############################ */

    async createItem(parent, args, ctx, info) {

        // TODO - Check if logged in
        if (!ctx.request.userId) {
            throw new Error("You must be logged in to do this!")
        }
        console.log(ctx.request.userId)
        const item = await ctx.db.mutation.createItem({
            data : {
                // This is how we create a relationship between the item and the user
                user: {
                    connect: {
                        id: ctx.request.userId,
                    }
                },
                ...args
            }
        }, info);

        return item;
    },
    async updateItem(parent, args, context, info) {

        const updates = {...args}
        // We don't want to update the ID
        delete updates.id;

        const item = await context.db.mutation.updateItem({
            data : {...updates},
            where : {
                id : args.id
            }
        }, info);

        return item;
    },
    async deleteItem(parent, args, context, info) {

        const where = {id : args.id};

        // Find item
        const item = await context.db.query.item({ where}, `{ id, title}`);

        console.log(item);
        // Check whether they own it / have permissions
        // TODO
        // Delete it!
        return await context.db.mutation.deleteItem({ where }, info);
    },
    async signup(parent, args, context, info) {
        args.email = args.email.toLowerCase();
        // Hash password ( 1 way hash )
        const password = await bcrypt.hash(args.password, 10)
        // Create the user in DB
        const user =  await context.db.mutation.createUser(
            {
                data : {
                    ...args,
                    password,
                    // Because permissions is an ENUM we must SET it
                    permissions : {set : ['USER']}
                }
            }
            ,info
        );

        // Create a JWT for them
        const token = jwt.sign({userId : user.id}, process.env.APP_SECRET);
        // Set it on the response
        context.response.cookie('token', token, {
            httpOnly : true,
            maxAge : 1000 * 60 * 60 * 24 * 365
        });

        return user;
    },
    async signin(parent, {email, password}, ctx, info) {
        // #1 ) Check if there's a user with this email
        const user = await ctx.db.query.user({where : {email}});

        if(!user) {
            throw new Error(`No such user found for email ${email}`)
        }
        // #2 ) Check if password is correct
        const valid = await bcrypt.compare(password, user.password)

        if(!valid) {
            throw new Error('Invalid Password!')
        }
        // #3 ) Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

        // #4 ) Set the cookie with new token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365
        });

        // Return the user
        return user;
    },
    async signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token')
        return { message: "Goodbye!" }
    },
    async requestReset(parent, { email}, ctx, info) {
        // #1 ) Check if they are a real user
        const user = await ctx.db.query.user({ where: { email } });

        if (!user) {
            throw new Error(`No such user found for email ${email}`)
        }
        // #2) Set a reset token + expiry on user
        const randomBytesPromiseified = promisify(randomBytes);
        const resetToken = (await randomBytesPromiseified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
        const res = await ctx.db.mutation.updateUser({
            where: { email: email },
            data: { resetToken, resetTokenExpiry },
        });

        // #3) Email the user the reset token
        const mailRes = await transport.sendMail({
            from : "a@a.com",
            to : user.email,
            html: "Password reset link",
            subject: makeANiceEmail(`Yojwt.verify() ur password reset token is here! /n/n
            <a href="${process.env.FRONTEND_URL}}/reset?resetToken=${resetToken}">Click here to reset!</a>
            `)
        })

        // #4) Return info back to user
        return {message : "Reset link sent"}
    },
    async resetPassword(parent, { resetToken, newPassword, confirmPassword }, ctx, info) {
        // Check if passwords match
        if (newPassword !== confirmPassword) {
            throw new Error('Passwords do not match!')
        }
        // Check if it's a legit reset token
        // Check if it's not expired
        const [user] = await ctx.db.query.users({
            where : {
                resetToken : resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000
            }
        })

        if (!user) {
            throw new Error('Token is either invalid or expired!')
        }

        // Hash new password
        const password = await bcrypt.hash(newPassword, 10)

        // Save to user + remove token / expire
        const updatedUser = await ctx.db.mutation.updateUser({
            where : {email : user.email},
            data : {
                password,
                resetToken : null,
                resetTokenExpiry : null,
            }
        })
        // Create new JWT
        const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

        // Send a new JWT back to user
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365
        });

        // Return the user
        return user;
    },
};

module.exports = Mutations;
