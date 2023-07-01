import { Leonardo } from '@leonardo-ai/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getLeonardoConfig } from '../../utils/getLeonardoConfig';
import { awaitImages } from '../../utils/awaitImages';

const sdk = new Leonardo({
  security: {
    bearerAuth: process.env.LEONARDO_KEY,
  },
});

const GenerateImages = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt } = req.body;

  console.log('Prompt', prompt);

  if (!prompt) {
    throw new Error('Prompt is required to generate images');
  }

  const leonardoConfig = getLeonardoConfig();

  try {
    const generationJob = await sdk.generation.createGeneration({
      prompt,
      ...leonardoConfig,
      promptMagic: true,
      num_images: 1, // SDK asks for numImages but API throws: Error: 'Unexpected variable numImages'.
      guidance_scale: 20, // SDK asks for guidanceScale but API throws: Error: 'Unexpected variable guidanceScale'.
      negative_prompt: 'negative prompt', // SDK asks for negativePrompt but API throws: Error: 'Unexpected variable negativePrompt'.
      init_image_id: 'fa2f5d5b-b9f1-4290-b68d-10ab23c2ce41', // // SDK asks for initImageId but API throws: Error: 'Unexpected variable initImageId'
      public: false,
    });

    console.log('generationJob', generationJob);

    const gId =
      generationJob.createGeneration200ApplicationJSONObject?.sdGenerationJob
        ?.generationId;

    if (!gId) throw new Error('No job ID');

    const imageGenerations = await awaitImages(gId);

    return res.status(200).json({ images: imageGenerations });
  } catch (error: any) {
    console.log('the error', error);
    throw new Error(error);
  }
};

export default GenerateImages;
