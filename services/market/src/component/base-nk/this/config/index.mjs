
export class Git {
    constructor(root = '/git', git = 'github.com', user = 'ZababurinSergei', service = 'checklist', branch = 'main', cors = 'http://localhost:3000' ) {
        this.root = root
        this.git = git;
        this.user = user;
        this.service = service;
        this.gitUser = `${root}/${git}/${user}`
        this.gitDir = `${root}/${git}/${user}/${service}`
        this.gitUrl = `https://${git}/${user}/${service}`
        this.oauth2format = 'github'
        this.corsProxy = cors
        this.branch = branch
        this.set = {
            service: (name) => {
                this.gitDir = `${root}/${git}/${user}/${name}`
                this.gitUrl = `https://${git}/${user}/${name}`
            }
        }
        this.get = {
            config: {
                service: this.service,
                gitUser: this.gitUser,
                gitDir: this.gitDir,
                gitUrl: this.gitUrl,
                oauth2format: this.oauth2format,
                corsProxy: this.corsProxy,
                branch: this.branch
            }
        }
    }
}

const git = new Git('/git', 'github.com', 'ZababurinSergei', 'welcomebook', 'main', 'http://localhost:3000')

export const gitConfig = () => {
    return git
}
// let gitConfig = {
//     git: {
//         auth: {
//             oauth2format: {
//                 value:  git.oauth2format
//             }
//         },
//         cors: {
//             proxy: {
//                 value: git.corsProxy
//             }
//         },
//         dir: {
//             user: git.gitUser,
//             root: git.root,
//             value: git.gitDir,
//         },
//         url: {
//             value: git.gitUrl
//         },
//         branch: {
//             value: git.branch
//         }
//     },
// }

// export { gitConfig }