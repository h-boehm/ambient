import * as entries from './entries_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new entry with the title, year and language provided in the body
 */
 app.post('/entries', (req, res) => {
    entries.createEntry(req.body.title, req.body.year, req.body.language)
        .then(entry => {
            res.status(201).json(entry);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Retrive the entry corresponding to the ID provided in the URL.
 */
 app.get('/entries/:id', (req, res) => {
    const entryId = req.params.id;
    entries.findEntryById(entryId)
        .then(entry => { 
            if (entry !== null) {
                res.json(entry);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve first entry. 
 * If the query parameters include a year, then only the entries for that year are returned.
 * Otherwise, all entries are returned.
 */
 app.get('/entries', (req, res) => {
    let filter = {};
    // Is there a query parameter named year? If so add a filter based on its value.
    if(req.query.year !== undefined){
        filter = { year: req.query.year };
    }
    entries.findEntries(filter, '', 1)
        .then(entries => {
            res.send(entries);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

/**
 * Retrieve all entries.
 * If the query parameters include a year, then only the entries for that year are returned.
 * Otherwise, all entries are returned.
 */
 app.get('/archives', (req, res) => {
    let filter = {};
    // Is there a query parameter named year? If so add a filter based on its value.
    if(req.query.year !== undefined){
        filter = { year: req.query.year };
    }
    entries.findEntries(filter, '', 0)
        .then(entries => {
            res.send(entries);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

/**
 * Update the entry whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
 app.put('/entries/:_id', (req, res) => {
    entries.replaceEntry(req.params._id, req.body.title, req.body.year, req.body.language)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, title: req.body.title, year: req.body.year, language: req.body.language });
            } else {
                res.json({ _id: req.params._id, title: req.body.title, year: req.body.year, language: req.body.language });
              /*  res.status(404).json({ Error: 'Resource not found' });*/
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the entry whose id is provided in the query parameters
 */
 app.delete('/entries/:id', (req, res) => {
    entries.deleteById(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});