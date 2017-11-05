const rp = require('request-promise-native');

rp('https://api.github.com/users/dev-sec/repos', {
  json: true,
  headers: {
    'Authorization': 'token ' + process.env.GITHUB_TOKEN,
    'user-agent': 'nodejs'
  }
}).then(function (body) {
  urls = body.map(function(element) {
   return element.contributors_url;
  });
  return urls
}).then(function (urls) {
  return urls.map(function(element){
    return rp(element, {
      json: true,
      headers: {
        'Authorization': 'token ' + process.env.GITHUB_TOKEN,
        'user-agent': 'nodejs'
      }
    })
  })
}).then(function (calls) {
  return Promise.all(calls)
}).then(function (content) {
  // we get an array with arrays
  var flattened = content.reduce(
    function(a, b) {
      return a.concat(b);
    },
    []
  );
  return flattened
}).then(function (content) {
  // agreegate content
  var contributors = content.reduce(function (gh_contributors, contributor) {
    if (gh_contributors.has(contributor.login)) {
      entry = gh_contributors.get(contributor.login)

      console.log(contributor.login + " with " + entry.contributions + " add " + contributor.contributions)
      sum = entry.contributions + contributor.contributions
      console.log(sum)
      entry.contributions = sum
      gh_contributors.set(contributor.login, entry)
    }
    else {
      gh_contributors.set(contributor.login, contributor);
    }
    return gh_contributors;
  }, new Map());
  return contributors
}).then(function (content) {
    console.log(content.values())
    entries = Array.from(content.values())
    // sort by contributions
    return entries.sort(function(a, b) {
      return b.contributions - a.contributions;
    });
}).then(function (contributors) {
  // ouput contributors
  contributors.forEach(function(element) {
    console.log(element.login + " -> " + element.contributions)
  })

  // write sorted array to disk
  var fs = require('fs');
  fs.writeFile("contributors.json", JSON.stringify(contributors, null, 4), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file contributors.json was saved!");
  });
}).catch(function (err) {
    console.log(err)
});
