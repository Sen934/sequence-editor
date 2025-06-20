# Starting the project

1. run `npm install`
2. create `.env.local` with variables from `.env.example`
3. run `npx msw init public --save`
4. `npm run dev`

# Notes
1.  Motivated by FSD methodology (https://feature-sliced.github.io/documentation/docs)
2.  I didn't try to implement the exact functional requirements or a pixel perfect design. The goal was to show how i code and i hope you like it.
3. There is no GET request, but if you open pages, you'd see how i'd like to handle them and i've shown how i'd handle api in general.
4. I didn't investigate the best option for Rich text editor. I've chosen the one with quicker setup, which unfortunately it wasn't. I would probably choose some editor with markdown syntax if possible, because it's much safer. There are also some warnings from it, which i decided not to investigate
