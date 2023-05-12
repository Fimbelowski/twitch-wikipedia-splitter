import ChunkingBehavior from './ChunkingBehavior';

type ChunkingBehaviorUsingRegExp = Exclude<
  ChunkingBehavior,
  ChunkingBehavior.none | ChunkingBehavior.chunkSize
>;

export default ChunkingBehaviorUsingRegExp;
