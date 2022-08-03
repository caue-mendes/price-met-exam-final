const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();
app.use(express.json());

let instruments = [];

fs.readFile("instruments.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    instruments = JSON.parse(data);
  }
});

app.post("/api", (req, res) => {
  const { name, price } = req.body;
  const instrument = {
    name,
    price,
    id: randomUUID(),
  };
  instruments.push(instrument);
  InstrumentFile();
  return res.json(instrument);
});

app.get("/api", (req, res) => {
  return res.json(instruments);
});

app.get("/api/:id", (req, res) => {
  const { id } = req.params;
  const instrument = instruments.find((instrument) => instrument.id === id);
  return res.json(instrument);
});

app.put("/api/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const instrumentIndex = instruments.findIndex(
    (instrument) => instrument.id === id
  );
  instruments[instrumentIndex] = {
    ...instruments[instrumentIndex],
    name,
    price,
  };
  InstrumentFile();
  return res.json({ message: "Changes done!" });
});

app.delete("/api/:id", (req, res) => {
  const { id } = req.params;
  const instrumentIndex = instruments.findIndex(
    (instrument) => instrument.id === id
  );
  instruments.splice(instrumentIndex, 1);
  InstrumentFile();
  return res.json({ message: "Deleted!" });
});

function InstrumentFile() {
  fs.writeFile("instruments.json", JSON.stringify(instruments), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Adicionado!");
    }
  });
}

app.listen(5000, () => {
  console.log("Server on 5000");
});
