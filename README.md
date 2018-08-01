# Assignment Submission Slack App
This app enables a dialog popup by invoking the `/submit` slash command in the V School Students Slack Workspace.

## Installing
Currently, the Slack app is pointing to a live server running on Digital Ocean, so you won't be able to run this locally without messing with the live version. BUT, you could create a new slack app and set it up to work locally using the same codebase if you wanted.

To set up locally:

* Clone this repo and `cd slack-submit-assignments
* Run `npm install`
* `node` (or `nodemon`) `index.js`
* Install `ngrok`
    * `npm i -g ngrok`
    * `ngrok http 8282` (the port your server is running on locally
* Put the ngrok https url as the base url for the slack app requests on the app's configuration panel.

## For help creating Slack apps
I've started a blog entry on writing Slack apps. For now it isn't polished, but it has some good notes to help out.
[Find the blog post here](https://coursework.vschool.io/p/4d1397a2-6641-4c43-8174-0af2b2e90269/)