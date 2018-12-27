import commander from 'commander';

commander.arguments('<configFile>')
  .action((configFile, cmd: commander.Command) => {
    console.log(cmd);
  });

commander.parse(process.argv);

// console.log(commander.config);
