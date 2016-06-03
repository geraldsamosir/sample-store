# Veritrans Sample Store for Snap

## Requirements
This project require [Node.js](https://nodejs.org/)

## Installation

```
npm install
```

## Build

```
npm run build
```

## Configuration
Before run the server please set your sandbox [Client Key and Server Key](https://support.veritrans.co.id/hc/en-us/articles/203230050-How-can-I-find-Client-Key-and-Server-Key-) in `config/sandbox.json` file.

## Run server

```
npm run sandbox
```
Open your browser and got to http://localhost:8000

To run it in other environment please set config file matching with env variable, eg. `production`, and run:
```
NODE_ENV=production npm start
```