# Dub - URL Shortener CLI

A command line tool for easily shortening URLs using the dub.co service. ✂️

> **Warning**
> This cli is still in development and chnaces of breaking.
>
> So if you find any issues or have any other feedback, please feel free to open an issue or pull request on GitHub!

## Installation

Install dub globally to access the commands from your terminal:

```bash
npm install -g dub
```

or if you are using pnpm

```bash
pnpm install -g dub
```

## Usage

### Login

You need to run the `login` command with your `API token`:

```bash
dub login [token]
```

#### Example

```bash
dub login Xhaw9TUajakGfRii3lmgGYFd
```

This command will authenticate your API token and fetch your credentials and project details from `dub.co`. It will then save them in a `dubcli.json` file on your machine.

If the cli does not work as expected, you can try to run `dub login` again to refresh your credentials.

### Config

To view your current dub configuration, you can run the `config` command:

```bash
dub config
```

This will show you the contents of the `dubcli.json` file on your machine.

To change your dub configuration, you can run the `config set` command:

```bash
dub config set
```

This command will ask you to choose what you want to update: `project or domain.`

If you choose `project`, it will show you all your projects and ask you to select one. It will then update the `currentProject` value in the dub config file.

If you choose `domain`, it will do the same for the `currentDomain` value.

### Shorten

To create a new short link, you can run the `shorten` command:

```bash
dub shorten [url] [shortkey]
```

This command will take a `url` and an optional `shortkey` as arguments and shorten the url using the dub.co API.

#### Example

```bash
dub shorten https://example.com/jhondoe/data jhon
```

If you provide a `url` but not a `shortkey`, it will generate a random shortkey using `nanoid`.

If you do not provide any arguments, it will prompt you to enter a `destination url` and an optional `shortkey`.
