import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import { Request, Response } from 'express';
import OrchyBase from 'orchy-base-code7';
import SnsSqsSlq from 'sns-sqs-slq-code7';

const orchybase = new OrchyBase(false);
const snsSqs = new SnsSqsSlq();

export async function contact(req: Request, res: Response): Promise<Response> {
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

        const publish = await snsSqs.publishToTopic(
          'sns-contact',
          JSON.stringify(contact),
          'contact',
          'snsContact',
          'arn:aws:sns:us-east-1:303732912389:sns-contact.fifo',
        );

        console.log(publish);
      });

      return res.status(200).send({ ok: true });
    } else {
      // const {} = req.body;
    }
  } catch (err) {
    return res.status(500).send(err);
  }
}
