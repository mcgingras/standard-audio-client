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


- Concerns with the contract. Nothing is stored on chain -- do people care about that? See DOM tweet about how NFTs are really just owning a collection of data, which this is.
- Concerns about capacity not "truly" being a capcity. You could add a million songs to the metadata field for all I care... the capacity isn't actually imposing a constraint on the capacity of what is "stored" but it does impose a capcity on what is pulled through to the dapp. Makes you ask a somewhat philisophical question about NFTs -- what actually is the NFT? What sort of role does the dapp play in what you own? Sort of useless outside of the dapp (just a bundle of stats... completely arbitrary outside of the dapp)


### Current
- better all tapes browser (one screen... true SPA)

### Todo
- figure out tape attributes

### Serious Todos
- opensea integration
- my tapes
- about
- better defaults in stats
- better stats (color rarity?)
- actually implement capacity (low priority for now)


# Notes
Need to run `yarn rw prisma generate` when changes are made to prisma config (changing db path etc)
