const db = require('../models');
const Users = db.users;

const Activities = db.activities;

const Contacts = db.contacts;

const Leads = db.leads;

const Metrics = db.metrics;

const Notes = db.notes;

const ActivitiesData = [
  {
    description:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    scheduled_at: new Date('2023-07-06'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Reckless he is. Matters are worse.',

    scheduled_at: new Date('2023-12-07'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    description: 'Good relations with the Wookiees, I have.',

    scheduled_at: new Date('2023-07-07'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ContactsData = [
  {
    first_name: 'I tell you what',

    last_name: 'Got depression, Smith and Wessen',

    email: 'fermina_bergnaum@bergnaum.biz',

    phone: '838-891-9381',

    address: '165 Keebler Corners, Littleville, MO 25113-5190',

    // type code here for "relation_one" field
  },

  {
    first_name: 'Reminds me of my old girlfriend Olga Goodntight',

    last_name: "Goin' hog huntin'",

    email: 'mel_steuber@mcglynn.info',

    phone: '128.104.4070 x323',

    address: 'Apt. 137 22690 Theron Stream, Krajcikborough, VT 72206-6978',

    // type code here for "relation_one" field
  },

  {
    first_name: 'Come on now',

    last_name: "That's messed up",

    email: 'roderick.marks@oconner.io',

    phone: '1-540-646-9091',

    address: 'Suite 582 29336 Kuvalis Spurs, East Ericside, NJ 52595',

    // type code here for "relation_one" field
  },
];

const LeadsData = [
  {
    name: 'William Harvey',

    status: 'contacted',

    category: 'non-profit',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Werner Heisenberg',

    status: 'contacted',

    category: 'individual',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Hans Bethe',

    status: 'qualified',

    category: 'business',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const MetricsData = [
  {
    name: 'Gustav Kirchhoff',

    value: 84.24,

    recorded_at: new Date('2023-03-20'),

    // type code here for "relation_one" field
  },

  {
    name: 'Max Delbruck',

    value: 61.99,

    recorded_at: new Date('2023-09-27'),

    // type code here for "relation_one" field
  },

  {
    name: 'Euclid',

    value: 59.84,

    recorded_at: new Date('2023-05-27'),

    // type code here for "relation_one" field
  },
];

const NotesData = [
  {
    content: 'That is why you fail.',

    date: new Date('2023-07-22'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Not if anything to say about it I have',

    date: new Date('2023-02-08'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Adventure. Excitement. A Jedi craves not these things.',

    date: new Date('2023-04-26'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

async function associateActivityWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setUser) {
    await Activity0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setUser) {
    await Activity1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setUser) {
    await Activity2.setUser(relatedUser2);
  }
}

async function associateActivityWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setLead) {
    await Activity0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setLead) {
    await Activity1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setLead) {
    await Activity2.setLead(relatedLead2);
  }
}

async function associateContactWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Contact0 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Contact0?.setLead) {
    await Contact0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Contact1 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Contact1?.setLead) {
    await Contact1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Contact2 = await Contacts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Contact2?.setLead) {
    await Contact2.setLead(relatedLead2);
  }
}

// Similar logic for "relation_many"

async function associateLeadWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setUser) {
    await Lead0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setUser) {
    await Lead1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setUser) {
    await Lead2.setUser(relatedUser2);
  }
}

async function associateMetricWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Metric0 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Metric0?.setUser) {
    await Metric0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Metric1 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Metric1?.setUser) {
    await Metric1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Metric2 = await Metrics.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Metric2?.setUser) {
    await Metric2.setUser(relatedUser2);
  }
}

async function associateNoteWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Note0 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Note0?.setUser) {
    await Note0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Note1 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Note1?.setUser) {
    await Note1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Note2 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Note2?.setUser) {
    await Note2.setUser(relatedUser2);
  }
}

async function associateNoteWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Note0 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Note0?.setLead) {
    await Note0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Note1 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Note1?.setLead) {
    await Note1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Note2 = await Notes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Note2?.setLead) {
    await Note2.setLead(relatedLead2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Activities.bulkCreate(ActivitiesData);

    await Contacts.bulkCreate(ContactsData);

    await Leads.bulkCreate(LeadsData);

    await Metrics.bulkCreate(MetricsData);

    await Notes.bulkCreate(NotesData);

    await associateActivityWithUser();

    await associateActivityWithLead();

    await associateContactWithLead();

    // Similar logic for "relation_many"

    await associateLeadWithUser();

    await associateMetricWithUser();

    await associateNoteWithUser();

    await associateNoteWithLead();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('activities', null, {});

    await queryInterface.bulkDelete('contacts', null, {});

    await queryInterface.bulkDelete('leads', null, {});

    await queryInterface.bulkDelete('metrics', null, {});

    await queryInterface.bulkDelete('notes', null, {});
  },
};
