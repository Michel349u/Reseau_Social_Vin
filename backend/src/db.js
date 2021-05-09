const users = [
  {
    id: '1',
    nom: 'Andrew',
    prenom: 'Jacques',
    email: 'andrew@example.com',
    mdp: '1234',
    type: 'User',
    age: 27
  },
  {
    id: '2',
    nom: 'Harvest',
    prenom: 'Sarah',
    email: 'sarah@example.com',
    mdp: '1234',
    type: 'User'
  },
  {
    id: '3',
    nom: 'Trafalgar',
    prenom: 'Mike',
    email: 'mike@example.com',
    mdp: '1234',
    type: 'User'
  },
  {
    id: '4',
    nom: 'Mitel',
    prenom: 'Balentin',
    email: 'balentin@example.com',
    mdp: '1234',
    type: 'Vignoble',
    lat: 49.118960656732796,
    long: 6.177084736095903,
    logo: ""
  },
  {
    id: '5',
    nom: 'Sch',
    prenom: 'Jakes',
    email: 'jakes@example.com',
    mdp: '1234',
    type: 'Vignoble',
    lat: 49.10993611954346,
    long: 6.1084105959953225,
    logo: ""
  },
  {
    id: '6',
    nom: 'Null',
    prenom: 'Giroud',
    email: 'giroud@example.com',
    mdp: '1234',
    type: 'Vignoble',
    lat: 49.10769131037487,
    long: 6.082616718939436,
    logo: ""
  }
]

const posts = [
  {
    id: '10',
    title: 'Vin incroyable',
    body: 'super vin dommage le coup amer a la fin',
    published: true,
    author: '1'
  },
  {
    id: '11',
    title: 'Super vin',
    body: '',
    published: true,
    author: '1'
  },
  {
    id: '12',
    title: 'Vin légendaire',
    body: 'Super vin rien a dire',
    published: true,
    author: '2'
  },
  {
    id: '13',
    title: 'Vin trop sucrée',
    body: 'Dommage pour ce gout beaucoup trop sucrée a mon coup mais super vignoble',
    published: true,
    author: '3'
  },
  {
    id: '14',
    title: 'Je suis dingue de ce vin',
    body: '',
    published: true,
    author: '2'
  }

]

const TypeVin = {
  CHAMPAGNE: 'Champagne',
  VIN_BLANC: 'Vin blanc',
  VIN_ROSE: 'Vin rosé',
  VIN_ROUGE: 'Vin rouge'
}

const TypeRobe = {
  SCINTILLANTE: 'Scintillante',
  ROUGE_VIF: 'Rouge vif un peu violacé',
  ROUGE_CERISE: 'Rouge cerise',
  ROUGE_ORANGE: 'Rouge avec des nuances orangées',
  ROUGE_BRUN: 'Rouge brun à brique',
  JAUNE_PALE: 'jaune pâle, presque transparent',
  JAUNE_VERT: 'jaune avec des reflets un peu verts',
  JAUNE_PAILLE: 'jaune paille',
  JAUNE_OR: 'jaune d’or cuivré',
  JAUNE_BRUN: 'jaune brun',
  ROSE_PALE: 'rose pâle, incolore',
  ROSE_SAUMONE: 'rose saumoné',
  ROSE_ORANGE: 'rose orangé'
}

const notes = [{
  id: 1,
  notation: 6,
  vin: 1
},
{
  id: 2,
  notation: 4,
  vin: 1
}
]

const vins = [
  { id: 1, nom: 'Moët et Chandon', typev: TypeVin.CHAMPAGNE, typer: TypeRobe.SCINTILLANTE, idVignoble: users[3].id, image: "https://www.vinatis.com/34990-detail_default/champagne-moet-chandon-brut-imperial-demi-bouteille.png" },
  { id: 2, nom: 'CHATEAU CALET 2012', typev: TypeVin.VIN_ROUGE, typer: TypeRobe.ROUGE_CERISE, idVignoble: users[3].id, image: "https://bwines.ro/wp-content/uploads/2020/10/CALET.jpg" },
  { id: 3, nom: 'CHATEAU SUDUIRAUT 2010', typev: TypeVin.VIN_BLANC, typer: TypeRobe.JAUNE_PAILLE, idVignoble: users[4].id, image: "https://www.bing.com/th?id=OIP.JjrkhgCgH08RXBm-tWHw8gHaHa&w=158&h=160&c=8&rs=1&qlt=90&pid=3.1&rm=2" },
  { id: 4, nom: 'ROSE 2019 - CHATEAU HENRI BONNAUD', typev: TypeVin.VIN_ROSE, typer: TypeRobe.ROSE_SAUMONE, idVignoble: users[5].id, image: "https://images.plugwine.com/2/32574/zoom_20200512071855.327-284481843.png" },
]

const badges = [
  { id: 1, intitule: 'Vin de qualité supérieur' },
  { id: 2, intitule: 'Vin noble' },
  { id: 3, intitule: 'Vin d\'exception' },
  { id: 4, intitule: 'Vigne noble' },
  { id: 5, intitule: 'Vin de restaurant ' },
  { id: 6, intitule: 'Vin collection' },
  { id: 7, intitule: 'Vin Francais' },
  { id: 8, intitule: 'Vin italien' },
  { id: 9, intitule: 'Vin grand chateau' },
  { id: 10, intitule: 'Vin premium ' }
]


const comments = [
  {
    id: '102',
    text: 'Thanks for the comment',
    author: '3',
    post: '10'
  },
  {
    id: '103',
    text: 'Thanks for the comment',
    author: '1',
    post: '10'
  },
  {
    id: '104',
    text: 'Thanks for the comment',
    author: '2',
    post: '11'
  },
  {
    id: '105',
    text: 'Merci du commentaire je prend note.',
    author: '1',
    post: '12'
  },
  {
    id: '106',
    text: 'Merci du commentaire je prend note.',
    author: '1',
    post: '14'
  },
  {
    id: '107',
    text: 'Merci du commentaire je prend note',
    author: '5',
    post: '14'
  },
  {
    id: '108',
    text: 'Merci du commentaire je prend note',
    author: '2',
    post: '13'
  }
]

const db = {
  users,
  posts,
  comments,
  vins,
  notes,
  badges
}

export { db as default }
