# Waste exemptions prototype

This is the code for the [current prototype for Defra's Waste Exemptions service](https://wex-prototype.herokuapp.com/).

Ask a member of the team for login details. It is password-protected to ensure it's not confused with a live government service.

This is in a new location. The [previous version](https://waste-exemptions-renewals.herokuapp.com/) still exists but is no longer supported.

## Installation

It is recommended that you have some familiarity with GitHub and using the terminal before starting. The [Digital Service Team guides](https://github.com/DEFRA/dst-guides) contain a lot of useful information.

This section assumes that you're accessing Git using the Mac terminal. Alternatively you can use tools such as the GitHub app or Sourcetree.

* On a Mac terminal, install `homebrew` and use this to install `git` and `npm` on your machine.
* Create and navigate to a projects folder: `mkdir projects` and `cd projects`
* Then copy the latest code with `git clone https://github.com/DEFRA/wex-prototype.git`.
* Navigate to the prototype folder: `cd wex-prototype`.
* Enter `npm start` to start the prototype.
* Go to http://localhost:3000/. If everything has worked then you should see the front page.
* Press `control c` to stop the prototype.

[Instructions for a blank version of the prototype kit](https://github.com/DEFRA/wex-prototype/blob/master/docs/documentation/install/introduction.md)

## Making changes

To make changes to the prototype, you will need a GitHub and a Heroku account and access to edit this project - speak to one of the team to arrange this.

* Configure your terminal to access your Git account.
* Configure Heroku to show your prototype and update it when code is pushed to `master`.
* In the terminal, navigate to your project folder.
* Pull the latest code using `git pull`
* If you're collaborating with a colleague then work from a branch and create pull requests rather than committing directly to `master`. This encourages peer review and reduces the risk of code conflicts.
* If you've created any new files, then add them using `git add -A`
* Commit your changes using `git commit -a -m "A message to say what you're committing"`
* If nothing is broken and you're happy to publish your changes directly to `master`, use `git push -u origin master` to push your changes.
* If you're working from a branch then replace `master` with the name of your branch and create a pull request via the GitHub user interface.
