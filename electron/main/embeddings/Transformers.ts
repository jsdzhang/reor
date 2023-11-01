import * as lancedb from "vectordb";
import { Pipeline } from "@xenova/transformers";

// import { pipeline } from '@xenova/transformers';

// import pipeline from '@xenova/transformers';
// const requireESM = require('esm')(module);

// const pipe = requireESM('@xenova/transformers');

export const setupPipeline = async (modelName: string) => {
  /*
  just noting for future explorers that we do a dynamic import because transformers.js is an ESM module,
  and this repo is not yet and so doing the import at the top pollutes
  this repo turning it into an ESM repo... super annoying and the whole industry
  is dealing with this problem now as we transition into ESM.
  */
  const { pipeline } = await import("@xenova/transformers");
  return pipeline("feature-extraction", modelName);
};
const pipe: any = null;

// async function initPipe() {
//   const { pipeline } = await import('@xenova/transformers');
//   pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
// }

// initPipe().catch((error) =>
//   console.error('Failed to initialize pipeline:', error),
// );

export async function createEmbeddingFunction(
  modelName: string, // all-MiniLM-L6-v2
  sourceColumn: string
): Promise<lancedb.EmbeddingFunction<string>> {
  let pipe: Pipeline;
  try {
    const { pipeline, env } = await import("@xenova/transformers");
    env.localModelPath = "/Users/sam/Desktop";
    pipe = await pipeline("feature-extraction", modelName);
  } catch (error) {
    console.error("Failed to initialize pipeline", error);
    throw new Error("Pipeline initialization failed");
  }
  return {
    sourceColumn,
    embed: async (batch: string[]): Promise<number[][]> => {
      console.log("CALLING EMBED IN THE ACTUAL PIPELINE!");
      if (pipe === null) {
        throw new Error("Pipeline not initialized");
      }
      try {
        const result: number[][] = await Promise.all(
          batch.map(async (text) => {
            const res = await pipe(text, { pooling: "mean", normalize: true });
            return Array.from(res.data);
          })
        );
        console.log("RESULT IS: ", result);
        // shape of result:
        console.log("SHAPE OF RESULT IS: ", result.length, result[0].length);
        return result;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  };
}

// const TransformersJSEmbedFun: lancedb.EmbeddingFunction<string> = {
//   sourceColumn: "content",
//   embed: async (batch: string[]): Promise<number[][]> => {
//     // // eslint-disable-next-line no-new-func
//     // const TransformersApi = Function('return import("@xenova/transformers")')();
//     // const { pipe } = await TransformersApi;
//     if (pipe === null) {
//       throw new Error("Pipeline not initialized");
//     }
//     try {
//       const result: number[][] = await Promise.all(
//         batch.map(async (text) => {
//           const res = await pipe(text, { pooling: "mean", normalize: true });
//           return Array.from(res.data);
//         })
//       );
//       return result;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   },
// };

// export default TransformersJSEmbedFun;