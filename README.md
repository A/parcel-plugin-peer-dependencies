# Parcel Plugin Peer Dependencies

Parcel plugin to exclude peer dependencies. Should be useful with `yarn workspaces`.

## Installation

```
yarn add --dev parcel-plugin-peer-dependencies
npm i -D parcel-plugin-peer-dependencies

```

## Usage

Just declare your peerDependencies in the `package.json`:

```
// package.json
{
  // ...
  "peerDependencies": {
    "classnames": "*",
    "date-fns": "*",
    "lodash.groupby": "*",
    "lodash.omit": "*",
    "nanoid": "*",
    "react": "*",
    "swr": "*"
  },
  // ...
}

```

The logic behind is based on idea, that peer dependency is declared inside of root level `package.json` file
and included into the one of sibling packages.


## Credits

This plugin was developed, because `parcel-plugin-externals` hadn't worked correct for my workspaces setup,
so I just re-implemented its much simplier version, that supports only peerDependencies, and relays on a
different tools to resolve dependencies paths. Sending virtual thanks to the author.
