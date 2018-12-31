import mongoose from 'mongoose';
import _ from 'lodash';
// import logger from '../logs';

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const EmailTemplate = mongoose.model('EmailTemplate', mongoSchema);

export default async function getEmailTemplate(name, params) {
  const source = await EmailTemplate.findOne({ name });
  if (!source) {
    throw new Error(`No EmailTemplates found.
      Please check that at least one is generated at server startup,
      restart your server and try again.`);
  }

  return {
    message: _.template(source.message)(params),
    subject: _.template(source.subject)(params),
  };
}

export async function insertTemplates() {
  const templates = [
    {
      name: 'welcome',
      subject: 'Welcome to goodfaith.church',
      message: `<%= userName %>,
        <p>
          Thanks for signing up for Good Faith Pardigm!
        </p>
        <p>
          In our books, we teach a complete, historical, understanding of our evolution.
        </p>
         Best Regards, Jason , Good Faith Paradigm 
      `,
    },
  ];

  templates.forEach(async (template) => {
    try {
      await EmailTemplate.updateOne({ name: template.name }, template, { upsert: true });
    } catch (error) {
      console.log('EmailTemplate insertion error:', error);
      throw error;
    }
  });
}
