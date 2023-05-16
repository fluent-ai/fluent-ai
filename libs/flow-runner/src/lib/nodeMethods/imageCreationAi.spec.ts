import { Configuration, OpenAIApi } from 'openai';
import { imageCreationAi } from './example';

// Mock the necessary dependencies
jest.mock('openai', () => {
  return {
    Configuration: jest.fn(),
    OpenAIApi: jest.fn().mockImplementation(() => {
      return {
        createImage: jest.fn().mockResolvedValueOnce({
          data: {
            data: [{ url: 'https://example.com/image.jpg' }],
          },
        }),
      };
    }),
  };
});

describe('imageCreationAi', () => {
  it('should create an image when msg.payload is a string', async () => {
    const result = await imageCreationAi({
      globals: { openAiApiKey: 'test-api-key' },
      inputs: {},
      msg: { payload: 'a bird flying in the sky' },
    });

    expect(result).toEqual({
      error: undefined,
      image: { url: 'https://example.com/image.jpg' },
      payload: 'a bird flying in the sky',
    });

    expect(Configuration).toHaveBeenCalledWith({
      apiKey: 'test-api-key',
    });

    expect(OpenAIApi).toHaveBeenCalledWith(
      expect.objectContaining({ apiKey: 'test-api-key' })
    );

    expect(OpenAIApi().createImage).toHaveBeenCalledWith({
      prompt: 'a bird flying in the sky',
      n: 1,
      size: '256x256',
    });
  });

  it('should return an error when msg.payload is missing or not a string', async () => {
    const noPayloadResult = await imageCreationAi({
      globals: { openAiApiKey: 'test-api-key' },
      inputs: {},
      msg: {},
    });

    expect(noPayloadResult).toEqual({
      error: 'msg.payload either doesnt exist or is not a string',
    });

    const nonStringPayloadResult = await imageCreationAi({
      globals: { openAiApiKey: 'test-api-key' },
      inputs: {},
      msg: { payload: 123 },
    });

    expect(nonStringPayloadResult).toEqual({
      error: 'msg.payload either doesnt exist or is not a string',
      payload: 123,
    });
  });

  it('should return an error when openai.createImage throws an error', async () => {
    (OpenAIApi().createImage as jest.Mock).mockRejectedValueOnce(
      new Error('failed to create image')
    );

    const result = await imageCreationAi({
      globals: { openAiApiKey: 'test-api-key' },
      inputs: {},
      msg: { payload: 'a bird flying in the sky' },
    });

    expect(result).toEqual({
      error: 'openAi failed with error : Error: failed to create image',
      payload: 'a bird flying in the sky',
    });
  });
});
