const express = require('express');
const miniapp = require('express').Router();

const notesRouter = require('./notes');

miniapp.use('/notes', notesRouter);

module.exports = miniapp;