require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false }
});

async function checkSupabase() {
    try {
        console.log('Connecting to Supabase...\n');

        // Check total chunks
        const totalResult = await pool.query('SELECT COUNT(*) as total FROM content_chunks');
        console.log('✅ Total chunks in Supabase:', totalResult.rows[0].total);

        // Check epilepsy mentions
        const epilepsyResult = await pool.query(
            `SELECT COUNT(*) as count FROM content_chunks 
             WHERE LOWER(text) LIKE '%epilepsy%' OR LOWER(topic) LIKE '%epilepsy%'`
        );
        console.log('📊 Chunks mentioning "epilepsy":', epilepsyResult.rows[0].count);

        // Check for specific antiepileptic drugs
        const drugsResult = await pool.query(
            `SELECT COUNT(*) as count FROM content_chunks 
             WHERE LOWER(text) LIKE '%phenytoin%' 
                OR LOWER(text) LIKE '%carbamazepine%'
                OR LOWER(text) LIKE '%valproate%'
                OR LOWER(text) LIKE '%levetiracetam%'`
        );
        console.log('💊 Chunks mentioning epilepsy drugs:', drugsResult.rows[0].count);

        // Get a sample result
        const sampleResult = await pool.query(
            `SELECT subject, topic, substring(text, 1, 200) as preview 
             FROM content_chunks 
             WHERE LOWER(text) LIKE '%antiepileptic%' 
             LIMIT 1`
        );

        if (sampleResult.rows.length > 0) {
            console.log('\n📄 Sample result found:');
            console.log('Subject:', sampleResult.rows[0].subject);
            console.log('Topic:', sampleResult.rows[0].topic);
            console.log('Preview:', sampleResult.rows[0].preview + '...\n');
        } else {
            console.log('\n⚠️  No sample results found for "antiepileptic"\n');
        }

        // Check embeddings status
        const embeddingsResult = await pool.query(
            `SELECT 
                COUNT(*) as total,
                COUNT(embedding) as with_embeddings,
                COUNT(*) - COUNT(embedding) as without_embeddings
             FROM content_chunks`
        );
        console.log('🔢 Embeddings status:');
        console.log('   Total chunks:', embeddingsResult.rows[0].total);
        console.log('   With embeddings:', embeddingsResult.rows[0].with_embeddings);
        console.log('   Without embeddings:', embeddingsResult.rows[0].without_embeddings);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
        process.exit();
    }
}

checkSupabase();
