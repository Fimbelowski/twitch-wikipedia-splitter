import { beforeEach, describe, expect, it } from 'vitest';
import { useInput } from '../../src/store/useInput';
import { setActivePinia, createPinia } from 'pinia';
import { ChunkingBehavior } from '../../src/types/ChunkingBehavior';

describe('useInput.ts', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('updates input', () => {
    const input = useInput();
    const intitialValue = input.input;
    const newValue = 'Lorem ipsum...';

    input.updateInput(newValue);

    expect(input.input).toBe(newValue);
    expect(input.input).not.toBe(intitialValue);
  });

  it('updates removeCitations', () => {
    const input = useInput();
    const initialValue = input.removeCitations;
    const newValue = !initialValue;

    input.updateRemoveCitations(!initialValue);

    expect(input.removeCitations).toBe(newValue);
    expect(input.removeCitations).not.toBe(initialValue);
  });

  it('updates removeLineTerminators', () => {
    const input = useInput();
    const initialValue = input.removeLineTerminators;
    const newValue = !initialValue;

    input.updateRemoveLineTerminators(newValue);

    expect(input.removeLineTerminators).toBe(newValue);
    expect(input.removeLineTerminators).not.toBe(initialValue);
  });

  it('updates removeParentheticals', () => {
    const input = useInput();
    const initialValue = input.removeParentheticals;
    const newValue = !initialValue;

    input.updateRemoveParentheticals(newValue);

    expect(input.removeParentheticals).toBe(newValue);
    expect(input.removeParentheticals).not.toBe(initialValue);
  });

  it('updates maxChunkSize', () => {
    const input = useInput();
    const initialValue = input.maxChunkSize;
    const newValue = 1;

    input.updateMaxChunkSize(newValue);

    expect(input.maxChunkSize).toBe(newValue);
    expect(input.maxChunkSize).not.toBe(initialValue);
  });

  it('updates chunkingBehavior', () => {
    const input = useInput();
    const initialValue = input.chunkingBehavior;
    const newValue = ChunkingBehavior.chunkSize;

    input.updateChunkingBehavior(newValue);

    expect(input.chunkingBehavior).toBe(newValue);
    expect(input.chunkingBehavior).not.toBe(initialValue);
  });

  it('updates balkingDistance', () => {
    const input = useInput();
    const initialValue = input.balkingDistance;
    const newValue = 1;

    input.updateBalkingDistance(newValue);

    expect(input.balkingDistance).toBe(newValue);
    expect(input.balkingDistance).not.toBe(initialValue);
  });
});