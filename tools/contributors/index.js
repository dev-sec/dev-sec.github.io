const rp = require('request-promise-native');

rp('https://api.github.com/users/dev-sec/repos?page=1&per_page=100', {
  json: true,
  headers: {
    'Authorization': 'token ' + process.env.GITHUB_TOKEN,
    'user-agent': 'dev-sec'
  }
}).then(function (body) {
  console.log("Parse repository:")
  urls = body.map(function(element) {
    console.log("   " + element.full_name)
    return element.contributors_url+"?page=1&per_page=100";
  });
  return urls
}).then(function (urls) {
  console.log("Download contributors:")
  // fetch contributors for each repository
  return urls.map(function(element){
    console.log("   " + element)
    return rp(element, {
      json: true,
      headers: {
        'Authorization': 'token ' + process.env.GITHUB_TOKEN,
        'user-agent': 'dev-sec'
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
  console.log("Aggregate contributions:")
  var contributors = content.reduce(function (gh_contributors, contributor) {
    // we processed the user already
    if (gh_contributors.has(contributor.login)) {
      entry = gh_contributors.get(contributor.login)
      sum = entry.contributions + contributor.contributions
      console.log("   " + contributor.login + " has " + entry.contributions + "contributions, add " + contributor.contributions + ", new score " + sum)
      entry.contributions = sum
      gh_contributors.set(contributor.login, entry)
    }
    // new user
    else {
      console.log("   " + contributor.login + " with " + contributor.contributions + "contributions")
      gh_contributors.set(contributor.login, contributor);
    }
    return gh_contributors;
  }, new Map());
  return contributors
}).then(function (content) {
    console.log("Sort users by contributions")
    // console.log(content.values())
    entries = Array.from(content.values())

    // we filter the content, since we do not need all the data
    const allowed = ["login", "avatar_url", "url", "contributions"];
    filtered = entries.map(function(element) {
      return Object.keys(element)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = element[key];
        return obj;
      }, {});
    })

    // sort by amount of contributions
    return filtered.sort(function(a, b) {
      return b.contributions - a.contributions;
    });
}).then(function (contributors) {
  total = 0;
  // output contributors
  contributors.forEach(function(element) {
    console.log("   " + element.login + " -> " + element.contributions)
    total += 1;
  })

  console.log("Total contributors: " + total)

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
