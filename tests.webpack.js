var testsContext = require.context('./__tests__', true, /-test\.js$/);
testsContext.keys().forEach(testsContext);
