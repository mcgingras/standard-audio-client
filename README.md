# C8
Secret NFT repo.

### Setup

I am using a framework called Redwood.js to get the benefits of graphql out of the box. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.


### Common Errors
- If you get contract call revert exception errors, check to make sure metamask is connected to the correct network. (xdai / mainnet? for prod... localhost:8545 for dev)

### Concerns
- I am concerned that random colors as the only attribute is not discernable enough. A user will not be able to immediately identify that a tape is "cool" unless by random chance that it gets a lot of the same colors. Its not really easy to quickly parse and tell a rare tape apart, especially for someone who does not do research into looking at the value. For that reason, it might be a better idea to have the visual characteristics be something more defining -- like a sticker on the label. Similar to how CryptoPunks have pipes, or glasses, etc. Its easy to see right away. Maybe: "shiny screws" or "rainbow tape" or something like that. I think as a V1 I might just stick with colors though

- different levels of colors "rare colors" "common colors" etc
- different animations of tape, some buttons to show different animations

### Todo
- definitely figure out the spotify refresh issue -- update? fixed? -- how long does it go for
- take pictures of all the tapes? Set up some task to do that?
- put image of screenshot as field of tape
- figure out spline or three.js
- figure out tape attributes
- better all tapes browsing (shelves, see figma)

### Serious Todos
- format bids to update automatically
- test accepting bid
- artists are not pulling in listening room
- better loading state in listening room
- my tapes
- about
- remove "listening room" from nav
- better defaults in stats
- padding around stats for bid (mb-2)
- better stats (color rarity?)
- x on stats modal to close
- actually implement capacity (low priority for now)
- style bidItems
- fix eth display issue on biditems
