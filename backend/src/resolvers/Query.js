const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users
    }

    return db.users.filter(user => {
      return user.nom.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts
    }

    return db.posts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase())
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase())
      return isTitleMatch || isBodyMatch
    })
  },
  notes(parent, args, { db }, info) {
    if (!args.query) {
      return db.notes
    }
  },
  comments(parent, args, { db }, info) {
    return db.comments
  },
  me() {
    return {
      id: '123098',
      nom: 'Mike',
      prenom: 'Moman',
      email: 'mike@example.com',
      mdp: '1234'
    }
  },
  post() {
    return {
      id: '092',
      title: 'GraphQL 101',
      body: '',
      published: false
    }
  },
  vins(parent, args, { db }, info) {
    return db.vins
  },
  badges(parent, args, { db }, info) {
    return db.badges
  },
  note(parent, args, { db }, info){
    return db.note
  }
}

export { Query as default }
