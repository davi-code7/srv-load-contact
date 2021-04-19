import OrchyBase from 'orchy-base-code7';
import SnsSqsSlq from 'sns-sqs-slq-code7';

const orchybase = new OrchyBase(false);
const snsSqs = new SnsSqsSlq();

export async function getContact(req, res) {
  try {
    if (process.env.NODE_ENV === 'development') {
      const queues = await orchybase.getQueues(10, {
        schedule: {
          $and: {
            $lt: new Date(),
          },
        },
        state: 'pending',
      });

      queues.forEach(async (queue) => {
        const contact = await orchybase.getContact({
          // @ts-ignore
          id_load: queue.load.id_load,
          state: 'pending',
        });

        console.log(contact);

        await orchybase.updateContact(
          { id_contact: BigInt(contact.id_contact) },
          { state: 'working' },
        );

        const publish = await snsSqs.publishToTopic(
          'sns-contact',
          JSON.stringify(contact),
          'contact',
          'snsContact',
          'arn:aws:sns:us-east-1:742104988707:sns-contact.fifo',
        );

        console.log(publish);
      });

      return res.status(200).send({ ok: true });
    }
    // const {} = req.body;
  } catch (err) {
    return res.status(500).send(err);
  }
}
