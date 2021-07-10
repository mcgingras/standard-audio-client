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