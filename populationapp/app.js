const express = require('express');
const supabaseClient =require('@supabase/supabase-js');
const dotenv= require('dotenv')
const app = express();
const port = 3000;
dotenv.config();

const supabaseUrl =process.env.SUPABASE_URL;
const supabasekey =process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabasekey)

// my route
// this connection to the home page api? it not working
app.get("/api/population/:year", async (req, res) => {
  try {
    const year = req.params.year;
    const url = `https://api.datausa.io/tesseract/data.jsonrecords?cube=acs_yg_total_population_5&drilldowns=State,Year&measures=Population&include=Year:${year}&sort=Population.desc&limit=52`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// connecting to the trend page? 
app.get("/api/all-population", async (req, res) => {
  try {
    const url =
      "https://api.datausa.io/tesseract/data.jsonrecords?cube=acs_yg_total_population_5&drilldowns=State,Year&measures=Population&limit=5000";

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/saved-population', async (req, res) => {

  const { data, error } = await supabase
    .from('population')
    .select('*');

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }
  res.json(data);

});
app.post('/api/save-population', async (req, res) => {

  const newData = req.body;

  const { data, error } = await supabase
    .from('population')
    .insert([newData]);

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }
  res.json(data);

});


app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile('public/home.html', { root: __dirname });
});

app.get('/home', (req, res) => {
  res.sendFile('public/home.html', { root: __dirname });
});
app.get('/trend', (req, res) => {
  res.sendFile('public/trend.html', { root: __dirname });
});

app.get('/help', (req, res) => {
  res.sendFile('public/help.html', { root: __dirname });
});
app.get('/aboutme', (req, res) => {
  res.sendFile('public/aboutme.html', { root: __dirname });
});




app.listen(port, () => {
    console.log(`express app is listening on port: ${port}`);
});

