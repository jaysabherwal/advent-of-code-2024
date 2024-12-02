const execute = () => {
  const date = new Date().getDate();

  const day = date < 10 ? `0${date}` : `${date}`;

  console.log(`Executing ${day}.js`);

  const file = require(`./days/${day}.js`);
  
  file();
};


execute();
