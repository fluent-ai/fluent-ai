interface IUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface IPrice {
  [key: string]: {
    input: number;
    output: number;
  };
}

export const calculateTokenPrice = (model: string, usage: IUsage) => {
  // Prices in $ per 1K tokens
  const prices: IPrice = {
    'gpt-4': { input: 0.03, output: 0.06 },
    'gpt-4-32k': { input: 0.06, output: 0.12 },
    'gpt-3.5-turbo': { input: 0.0015, output: 0.002 },
    'gpt-3.5-turbo-16k': { input: 0.003, output: 0.004 },
  };

  let inputPrice, outputPrice;

  for (const baseModel in prices) {
    if (model?.startsWith(baseModel)) {
      inputPrice = prices[baseModel].input;
      outputPrice = prices[baseModel].output;
      break;
    }
  }

  if (inputPrice === undefined || outputPrice === undefined) {
    throw new Error(`Unknown model ${model}`);
  }

  const inputCost = (usage.prompt_tokens * inputPrice) / 1000;
  const outputCost = (usage.completion_tokens * outputPrice) / 1000;
  const totalCost = inputCost + outputCost;

  console.log('💸 openAI costs', { inputCost, outputCost, totalCost });

  return totalCost;
};
