// Get the mongoose object
import mongoose from "mongoose";

// Prepare to the database entries_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/entries_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const entrySchema = mongoose.Schema({
    title: { type: String, required: false },
    year: { type: String, required: true },
    language: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Entry = mongoose.model("Entry", entrySchema);

/**
 * Create a entry
 * @param {String} title 
 * @param {String} year 
 * @param {String} language 
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createEntry = async (title, year, language) => {
    // Call the constructor to create an instance of the model class Entry
    const entry = new Entry({ title: title, year: year, language: language });
    // Call save to persist this object as a document in MongoDB
    return entry.save();
}

/**
 * Retrive entries based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns
 */
const findEntries = async (filter, projection, limit) => {
    const query = Entry.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Replace the title, year, language properties of the entry with the id value provided
 * @param {String} _id 
 * @param {String} title 
 * @param {String} year 
 * @param {String} language 
 * @returns A promise. Resolves to the number of documents modified
 */
const replaceEntry = async (_id, title, year, language) => {
    const result = await Entry.replaceOne({ _id: _id },
        { title: title, year: year, language: language });
    return result.nModified;
}

/**
 * Delete the entry with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Entry.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

/**
 * Retrive entries based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns
 */
 const findEntries2 = async (_id) => {
    const query = Entry.find(_id)
    return query.exec();
}


export { createEntry, findEntries, replaceEntry, deleteById, findEntries2 };