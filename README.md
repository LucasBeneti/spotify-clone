# Spotify Clone

This is a study/portifolio project where I tried to recreate the UI and basic features of the Spotify app. I could use the Spotify API for a bunch of features, but I decided to implement [my own backend](https://github.com/LucasBeneti/spotify-clone-backend) for it, also for learning purposes.

Since we have available a bunch of good tools with generous free tiers, I'm making use of a couple of cool tools, like [Clerk](https://clerk.com/) for authentication and user handling, [Supabase](https://supabase.com/) for the backend hosting and deployed on [Render](https://render.com/) (mainly for the simplicity, although I containirezed all of the applications and created a `docker-compose.yml` to run the whole application).

A deployed version of this application can be found [here](https://spotify-clone-side-proj.onrender.com/) (it may take a while to load the page on the first try, but that's just how Render free tier works, just be a little patient).

## Expanding the ESLint configuration

-- I will leave it here for easier future reference. --If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Notes

Here are some notes to remember to implement on this project. It should be deleted in when the project is finished.

## TODOs

- separate the tables to its own component (with variations, depending where it is being rendered)

- implement the data fetch within the tables neede for that table (this way we can handle better the loading state and some other experiences for the user)
