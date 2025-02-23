
import pg from 'pg'
const { Client } = pg

const client = new Client({
  user: 'user',
  host: 'localhost',
  database: 'nexton',
  password: 'user123',
  port: 5432,
});

async function fetchUnemployedCandidates() {
  try {
    await client.connect();

    // Query the view to get unemployed candidates
    const candidatesRes = await client.query(`
      SELECT * FROM candidates_without_current_job;
    `);

    const candidates = candidatesRes.rows;
    const totalUnemployed = candidates.length;

    if (totalUnemployed === 0) {
      console.log('No unemployed candidates found.');
      return;
    }

    // Determine the location with the most unemployed candidates
    const locationRes = await client.query(`
      SELECT location, COUNT(*) as count
      FROM candidates_without_current_job
      GROUP BY location
      ORDER BY count DESC
      LIMIT 1;
    `);

    const mostAffectedLocation = locationRes.rows[0];

    const notificationMessage = `
      Notification: We have ${totalUnemployed} candidates without a job.
      The location with the most unemployed candidates is ${mostAffectedLocation.location} with ${mostAffectedLocation.count} unemployed candidates.
    `;

    console.log(notificationMessage);

  } catch (error) {
    console.error('Error fetching unemployed candidates:', error);
  } finally {
    await client.end();
  }
}

fetchUnemployedCandidates();
