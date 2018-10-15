React Application for generating a prime table.

How to run:
Navigate to primes/src/client/ location to view in browser.

I have already bundled up the application with a production build using webpack but if you would like to install node_modules and do so yourself please follow the below instruction:

 1.To install node_modules please run the below command from the root directory.
  'npm install'

 2.The build is done using webpack. To build please run one of the following commands depending on environment:
  'npm run build' (to run a production build) or 'npm run dev' (if you want to produce a development build - easier to check code in the console).

For development purposes I also included a command to keep watch on file changes ('npm run dev:watch'). This will automatically build on each code change within the root directory.

The development files will be found in src/client/app
The production bundle will be found in src/client/public


What I am pleased with:
The algorithm to generate primes is efficient - it works by excluding multiples of values as it loops.
The algorithm can generate 1000000 primes in around 15 seconds.

If I had more time:
I would work on the render method more to make this perform faster.
I have used array chunking to only display 10 rows - this similar method could be used for the column generation.
The rows and columns would be better getting generated on user scroll, rather than having to click a button to load more results.

