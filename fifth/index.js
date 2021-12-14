const stdin = process.openStdin();

stdin.addListener('data', value => console.log(`Input is: ${value.toString().trim()}`));
