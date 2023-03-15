import { TrimSentencePipe } from './trim-sentence.pipe';

describe('TrimSentencePipe', () => {
  it('create an instance', () => {
    const pipe = new TrimSentencePipe();
    expect(pipe).toBeTruthy();
  });
});
