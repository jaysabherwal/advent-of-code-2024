const execute = () => {
  const override = process.argv[2];

  const file = require(`./days/${override ?? getDate()}.js`);
  
  file();
};

const getDate = () => {
  const date = new Date().getDate();
  return date < 10 ? `0${date}` : `${date}`;
};


execute();
