import core from "@actions/core"
import github from "@actions/github"


async function run() {
  try {
    const token = core.getInput("token", { required: true })
    const bot_mode = core.getBooleanInput("bot_mode", { required: false })
    const message = core.getInput("message", { required: true })
    const context = github.context

    const pr_number = context.payload.pull_request.number

    const octokit = github.getOctokit(token)
    if (bot_mode) {
      await octokit.request.defaults({
        headers: {
          authorization: `token ${token}`  // eslint-disable-line no-template-curly-in-string
        }
      })
    }
    core.info(`==> Approved checking on PR#${pr_number} ...`)

    const reviews = await octokit.rest.pulls.listReviews({
      ...context.repo,
      pull_number: pr_number
    })

    for ( const review of reviews.data ) {
      if (review.state != "APPROVED") {
        continue
      }

      core.info(`==> Dissmissing Approvvals in PR #${review.user.login}`)

      octokit.rest.pulls.dismissReview({
        ...context.repo,
        pull_number: pr_number,
        review_id: review.id,
        message: message
      })
    }

  } catch (error) {
    core.setFailed(error.message)
  }

}

export default run()