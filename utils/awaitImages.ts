import { Leonardo } from '@leonardo-ai/sdk';

const sdk = new Leonardo({
  security: {
    bearerAuth: process.env.LEONARDO_KEY || '', //
  },
});

export const awaitImages = async (gId: string) => {
  try {
    return new Promise<{ images: any[]; prompt: string }>((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      const intervalId = setInterval(async () => {
        console.log('Checking for images...');
        try {
          const response = await sdk.generation.getGenerationById({ id: gId });

          const generation =
            response.getGenerationById200ApplicationJSONObject?.generationsByPk;

          if (
            generation?.generatedImages &&
            generation?.generatedImages?.length > 0
          ) {
            console.log('Found images!');
            clearInterval(intervalId);
            return resolve({
              images: generation.generatedImages.map(
                (imageGeneration: any) => imageGeneration.url
              ),
              prompt: generation.prompt || '',
            });
          }
          console.log('Not ready yet...');
        } catch (error) {
          console.log('internal error', error);
          clearInterval(intervalId);
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`Waiting for images error: ${error}`);
        }
      }, 5000);
    });
  } catch (error) {
    console.log('awaitImages error', error);
    return undefined;
  }
};
