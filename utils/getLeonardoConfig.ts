const finetunedModelsIds = {
  dreamShaperV6: 'b7aa9939-abed-4d4e-96c4-140b8c65dd92',
  dreamShaperV5: 'd2fb9cf9-7999-4ae5-8bfe-f0df2d32abf8', // preferred
  leonardoDiffusion: 'b820ea11-02bf-4652-97ae-9ac0cc00593d', // preferred
  leonardoSignature: '291be633-cb24-434f-898f-e662799936ad',
  leonardoCreative: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3',
  leonardoSelect: 'cd2b2a15-9760-4174-a5ff-4d2925057376',
};

const finetunedModelsDimensions = {
  dreamShaperV6: { width: 640, height: 832 },
  dreamShaperV5: { width: 640, height: 832 },
  leonardoDiffusion: { width: 768, height: 768 },
  leonardoCreative: { width: 768, height: 768 },
  leonardoSelect: { width: 768, height: 768 },
  leonardoSignature: { width: 768, height: 768 },
};

export const finetunedModels = {
  dreamShaperV5: 'dreamShaperV5',
  leonardoDiffusion: 'leonardoDiffusion',
  leonardoCreative: 'leonardoCreative',
  leonardoSelect: 'leonardoSelect',
  leonardoSignature: 'leonardoSignature',
};

const presetStyles = {
  leonardo: 'LEONARDO',
  anime: 'ANIME',
  creative: 'CREATIVE',
  dynamic: 'DYNAMIC',
  general: 'GENERAL',
  illustration: 'ILLUSTRATION',
  photography: 'PHOTOGRAPHY',
  environment: 'ENVIRONMENT',
};

export const getLeonardoConfig = () => {
  const { width, height } = finetunedModelsDimensions.leonardoSignature;
  const modelId = finetunedModelsIds.leonardoSignature;
  return {
    // <3 Please make Alchemy support high prio, dear Leonardo team <3
    alchemy: true,
    height: height,
    width: width,
    modelId,
    presetStyles: presetStyles.general,
  };
};
