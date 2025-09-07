async function createDripSubscriber({
  apiKey,
  accountId,
  email,
  firstName,
  tag,
}: {
  apiKey: string;
  accountId: string;
  email: string;
  firstName: string;
  tag: string;
}) {
  try {
    const url = `https://api.getdrip.com/v2/${accountId}/subscribers`;

    const rawBody = {
      subscribers: [
        {
          email,
          time_zone: 'America/Toronto',
          name: firstName,
          tags: [tag],
          custom_fields: {
            tag,
          },
        },
      ],
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${apiKey}:`),
      },
      body: JSON.stringify(rawBody),
    });

    await response.text();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
  }
}

export default createDripSubscriber;
