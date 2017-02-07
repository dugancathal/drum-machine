export const audioContext = new AudioContext();

const whiteNoiseBuffer = audioContext.createBuffer(1, 44100, 44100);  // 44100 is a standard sample rate for most sound cards
const noiseBufferOutput = whiteNoiseBuffer.getChannelData(0);
for (var i = 0; i < 44100; i++)
{
  noiseBufferOutput[i] = Math.random() * 2 - 1;
}


export function noteGenerator(audio, frequency, duration = 1) {
  return function () {
    const sineWave = createSineWave(audio, duration);

    sineWave.frequency.value = frequency;

    chain([
      sineWave,
      createAmplifier(audio, 0.2, duration),
      audio.destination]);
  }
}

export function kickGenerator(audio, duration = 2) {
  return function () {
    const sineWave = createSineWave(audio, duration);
    rampDown(audio, sineWave.frequency, 160, duration);
    chain([
      sineWave,
      createAmplifier(audio, 0.4, duration),
      audio.destination]);
  }
}

export function hihatGenerator(audio, duration = 0.5) {
  return function () {
    const noise = audio.createBufferSource();
    const noiseGain = audio.createGain();
    const noiseFilter = audio.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 10000;
    noise.buffer = whiteNoiseBuffer;
    rampDown(audio, noiseGain.gain, 0.7, duration);
    noiseGain.gain.exponentialRampToValueAtTime(0.5, audio.currentTime + 0.05);
    noise.start(audio.currentTime);
    noise.stop(audio.currentTime + duration);
    chain([
      noise,
      noiseFilter,
      noiseGain,
      audio.destination
    ]);
  }
}

export function snareGenerator(audio, duration = 0.25) {
  return function () {
    const noise = audio.createBufferSource();
    const noiseGain = audio.createGain();
    const noiseFilter = audio.createBiquadFilter();
    const oscillator = audio.createOscillator();
    const oscillatorGain = audio.createGain();
    oscillator.type = 'triangle';
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    noise.buffer = whiteNoiseBuffer;
    rampDown(audio, noiseGain.gain, 1, 0.2);
    rampDown(audio, oscillatorGain.gain, 1000, 0.1);

    oscillator.start(audio.currentTime);
    noise.start(audio.currentTime);
    oscillator.stop(audio.currentTime + duration);
    noise.stop(audio.currentTime + duration);
    chain([
      noise,
      noiseFilter,
      noiseGain,
      audio.destination
    ]);
  }
}

function createSineWave(audio, duration) {
  const oscillator = audio.createOscillator();
  oscillator.type = "sine";
  oscillator.start(audio.currentTime);
  oscillator.stop(audio.currentTime + duration);
  return oscillator;
}

function rampDown(audio, value, startValue, duration) {
  value.setValueAtTime(startValue, audio.currentTime);
  value.exponentialRampToValueAtTime(0.01, audio.currentTime + duration);
}

function createAmplifier(audio, startValue, duration) {
  const amplifier = audio.createGain();
  rampDown(audio, amplifier.gain, startValue, duration);
  return amplifier;
}

function chain(soundNodes) {
  for (let i = 0; i < soundNodes.length - 1; i++) {
    soundNodes[i].connect(soundNodes[i + 1]);
  }
}