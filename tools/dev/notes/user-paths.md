# User paths where AI Slop can be blocked

## User clicks directly on a slop account's URL (path 1)

- [x] implemented

### Path 
    - (user encounters account URL on a page) - (attempted navigation to account page)  - (🛑 SBZ block page)

## User clicks on a link to a Post where the URL contains a slop account's URL (Path 2)

- [ ] not implemented

### Path
    - (user is on a different page) - (attempted navigation to Post page) - (🛑 SBZ block page)

#### Sites where this path is possible
 - Facebook - no? something weird where theres "&set=a." and a random ID number, which might be the URL?
 - Twitter - yes
 - Instagram - no, post ID is randomly generated
 - Youtube - no, videos are given random IDs
 - Tiktok - yes