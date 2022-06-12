# launchboard

Launchboard is a React UI for Launch Pools.

It will allow users to add, remove and commit stakes that are held by the Launch Pools Solidity contract - https://github.com/MaxosLLC/LaunchPools

Here is a [description of the Launch Pools product](https://medium.com/@andysingleton/first-look-at-launch-pools-f814b40a17d7).

---

### Prerequisites:

1. Node.
2. Git.
3. Browser extension Metamask: https://metamask.io/download.html.

Run Hardhat's local network, deploy the contracts and copy the addresses into `constants/index.js`. For details
see [here](https://github.com/green-john/LaunchPools/tree/use-hardhat-test#running-a-local-node).

### Install and run

```bash
npm install
npm start
```

Once the system is running, make sure to connect Metamask to the correct network (i.e. `localhost:8545`)

### Caveats

When running a local blockchain, metamask has issues sending the correct nonce. Therefore, you must
[reset the account in metamask](https://metamask.zendesk.com/hc/en-us/articles/360015488891-Resetting-an-Account) every time.
