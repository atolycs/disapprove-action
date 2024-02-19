# Disapprove Pull Request Action

My custom Disapprove Pull request action


- inputs
    * `token`
        * Generated Github App Token
        * default: `${{ github.token }}`
    * `pr_number`
        * Trigger Pull Request Number
        * default: `${{ github.event.number }}`
        * optional: yes
    * `message`
        * Disapprove Message
        * default: `This pull request isi not approved`
    * `bot-mode`
        * Boolean Comment is bot?
        * default: `true`

    

- Directory Style

```
|+ root
 \_ .eslintrc.json  =>
 \_ action.yml      => Github Action Define file
 \_ src             => Script Source
 \_ dist            => Builded Bundle scripts
 \_ README.md       => This file
 \_ package.json    => Nodejs package Define file
```
