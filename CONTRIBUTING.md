# Contributing to diva-frontend

## Pull requests

Since the `master` branch is what we use in production, we have a
`dev` branch that unstable changes get merged into first. Only when we
consider that stable we merge it into the `master` branch and release the
changes for real.

Adhering to the following process is the best way to get your work
included in the project:

1.  Fork the project, clone your fork, and configure the remotes:

    ```bash
    # Clone your fork of the repo into the current directory
    git clone https://gitea.cstudio.ch/<your-username>/diva-frontend.git
    # Navigate to the newly cloned directory
    cd diva-frontend
    # Assign the original repo to a remote called "upstream"
    git remote add upstream https://gitea.cstudio.ch/C44/diva-frontend.git
    ```

2.  If you cloned a while ago, get the latest changes from upstream:

    ```bash
    git checkout dev
    git pull upstream dev
    ```

3.  Create a new topic branch (off the `dev` branch) to contain your feature, change, or fix:

    ```bash
    git checkout -b <topic-branch-name>
    ```

4.  Commit your changes in logical chunks. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) or your code is unlikely be merged into the main project. Use Git's [interactive rebase](https://help.github.com/articles/about-git-rebase/) feature to tidy up your commits before making them public.

5.  Locally merge (or rebase) the upstream dev branch into your topic branch:

    ```bash
    git pull [--rebase] upstream dev
    ```

6.  Push your topic branch up to your fork:

    ```bash
    git push origin <topic-branch-name>
    ```

7.  Open a Pull Request with a clear title and description.
