import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.o89yv.mongodb.net/pact-resolve?retryWrites=true&w=majority";

async function cleanupMci() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('pact_mediation');
        const collection = db.collection('mciEvents');
        
        const events = await collection.find({}).sort({ updatedAt: -1 }).toArray();
        console.log('Total events found:', events.length);
        
        if (events.length > 1) {
            const keepId = events[0]._id;
            console.log('Keeping latest event:', keepId, 'with', events[0].gallery?.length, 'photos');
            
            const deleteResult = await collection.deleteMany({ _id: { $ne: keepId } });
            console.log('Deleted duplicates:', deleteResult.deletedCount);
            
            const activateResult = await collection.updateOne(
                { _id: keepId },
                { $set: { isActive: true } }
            );
            console.log('Ensured active:', activateResult.modifiedCount);
        } else if (events.length === 1) {
            await collection.updateOne({}, { $set: { isActive: true } });
            console.log('Single event ensured active');
        }
    } finally {
        await client.close();
    }
}

cleanupMci().catch(console.error);
