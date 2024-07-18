"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send("Get Request");
});
app.post('/test', (req, res) => {
    res.send("Post Request");
});
