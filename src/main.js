//import core from "@actions/core"
//import github from "@actions/github"


/**
 * @param {import("@actions/github").context} context 
 * @param {ReturnType<typeof import("@actions/github").getOctokit>} octokit 
 * @param {import("@actions/core")} core 
 * @param {String} message 
 */

export async function run(core, octokit, context, message) {
  try {
    core.info(`==> Disapproving Pull Request`)
    const reviews = await octokit.rest.pulls.listReviews({
      ...context.repo,
      pull_number: context.payload.pull_number
    })

    for ( const review of reviews.data ) {
      if ( review.state != "APPROVED" ) {
        continue
      }

      core.info(`==> Catch Approved Review id.`)
      core.info(`==> Disapproving...`)
      
      await octokit.rest.pulls.dismissReview({
        ...context.repo,
        number: review.id,
        message: message
      })

    }


  } catch (e) {
    core.setFailed(`==> ${e.message}`)
  }
}
