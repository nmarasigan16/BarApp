export default mockState = {
    username: 'keshavsaharia',
    profile: {
        name: 'Keshav',
        followers: 10,
        following: 15,
        public_repos: 4,
        avatar_url: 'blahblah.com',
        website: 'moomoo.com',
        email: 'crapito@gmail.com',
        bio: 'I eat cheese',
        login: 'keshavsaharia'
    },
    followStatus: 1,
    repos: [
        {
            name: 'cat',
            description: 'meow',
            owner: {
                login: 'hello'
            },
            id: 40
        },
    ],
    followers: [
        {
            name: 'geordie',
            avatar_url: 'google.com',
            id: 3,
        },
    ],
    following: [
        {
            name: 'coomeron',
            avatar_url: 'jimmyjohns.com',
            id: 5,
        },
    ],
    starredRepos: [
        {
            name: '',
            description: '',
            owner: {
                login: ''
            },
            id: 1
        }
    ]
}