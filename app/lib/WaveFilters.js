// Band-Pass Butterworth IIR digital filter, generated using filter_gen.py.
// Sampling rate: 125.0 Hz, frequency: [0.5, 44.5] Hz.
// Filter is order 4, implemented as second-order sections (biquads).
// Reference:
// https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.butter.html
// https://courses.ideate.cmu.edu/16-223/f2020/Arduino/FilterDemos/filter_gen.py
export const ECGFilter = (input) => {
  let output = input;

  // Define filter sections with separate state variables
  let z1_1 = 0, z2_1 = 0;
  let z1_2 = 0, z2_2 = 0;
  let z1_3 = 0, z2_3 = 0;
  let z1_4 = 0, z2_4 = 0;

  // Apply each filter section
  let x = output - 0.70682283 * z1_1 - 0.15621030 * z2_1;
  output = 0.28064917 * x + 0.56129834 * z1_1 + 0.28064917 * z2_1;
  z2_1 = z1_1;
  z1_1 = x;

  x = output - 0.95028224 * z1_2 - 0.54073140 * z2_2;
  output = 1.00000000 * x + 2.00000000 * z1_2 + 1.00000000 * z2_2;
  z2_2 = z1_2;
  z1_2 = x;

  x = output - -1.95360385 * z1_3 - 0.95423412 * z2_3;
  output = 1.00000000 * x + -2.00000000 * z1_3 + 1.00000000 * z2_3;
  z2_3 = z1_3;
  z1_3 = x;

  x = output - -1.98048558 * z1_4 - 0.98111344 * z2_4;
  output = 1.00000000 * x + -2.00000000 * z1_4 + 1.00000000 * z2_4;
  z2_4 = z1_4;
  z1_4 = x;
  return output;
}

// Band-Pass Butterworth IIR digital filter, generated using filter_gen.py.
// Sampling rate: 256.0 Hz, frequency: [0.5, 29.5] Hz.
// Filter is order 4, implemented as second-order sections (biquads).
// Reference: 
// https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.butter.html
// https://courses.ideate.cmu.edu/16-223/f2020/Arduino/FilterDemos/filter_gen.py
export const EEGFilter = (input) => {
  let output = input;
  let z1_1 = 0, z2_1 = 0; // filter section state
  let z1_2 = 0, z2_2 = 0; // filter section state
  let z1_3 = 0, z2_3 = 0; // filter section state
  let z1_4 = 0, z2_4 = 0; // filter section state

  // First filter section
  let x1 = output - (-0.95391350 * z1_1) - (0.25311356 * z2_1);
  output = (0.00735282 * x1) + (0.01470564 * z1_1) + (0.00735282 * z2_1);
  z2_1 = z1_1;
  z1_1 = x1;

  // Second filter section
  let x2 = output - (-1.20596630 * z1_2) - (0.60558332 * z2_2);
  output = (1.00000000 * x2) + (2.00000000 * z1_2) + (1.00000000 * z2_2);
  z2_2 = z1_2;
  z1_2 = x2;

  // Third filter section
  let x3 = output - (-1.97690645 * z1_3) - (0.97706395 * z2_3);
  output = (1.00000000 * x3) + (-2.00000000 * z1_3) + (1.00000000 * z2_3);
  z2_3 = z1_3;
  z1_3 = x3;

  // Fourth filter section
  let x4 = output - (-1.99071687 * z1_4) - (0.99086813 * z2_4);
  output = (1.00000000 * x4) + (-2.00000000 * z1_4) + (1.00000000 * z2_4);
  z2_4 = z1_4;
  z1_4 = x4;

  return output;
}

// Band-Pass Butterworth IIR digital filter, generated using filter_gen.py.
// Sampling rate: 500.0 Hz, frequency: [74.5, 149.5] Hz.
// Filter is order 4, implemented as second-order sections (biquads).
// Reference: 
// https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.butter.html
// https://courses.ideate.cmu.edu/16-223/f2020/Arduino/FilterDemos/filter_gen.py

export const EMGFilter = (input) => {
  let output = input;
    let z1_1 = 0, z2_1 = 0; // filter section state
    let z1_2 = 0, z2_2 = 0; // filter section state
    let z1_3 = 0, z2_3 = 0; // filter section state
    let z1_4 = 0, z2_4 = 0; // filter section state

    // First filter section
    let x1 = output - (0.05159732 * z1_1) - (0.36347401 * z2_1);
    output = (0.01856301 * x1) + (0.03712602 * z1_1) + (0.01856301 * z2_1);
    z2_1 = z1_1;
    z1_1 = x1;

    // Second filter section
    let x2 = output - (-0.53945795 * z1_2) - (0.39764934 * z2_2);
    output = (1.00000000 * x2) + (-2.00000000 * z1_2) + (1.00000000 * z2_2);
    z2_2 = z1_2;
    z1_2 = x2;

    // Third filter section
    let x3 = output - (0.47319594 * z1_3) - (0.70744137 * z2_3);
    output = (1.00000000 * x3) + (2.00000000 * z1_3) + (1.00000000 * z2_3);
    z2_3 = z1_3;
    z1_3 = x3;

    // Fourth filter section
    let x4 = output - (-1.00211112 * z1_4) - (0.74520226 * z2_4);
    output = (1.00000000 * x4) + (-2.00000000 * z1_4) + (1.00000000 * z2_4);
    z2_4 = z1_4;
    z1_4 = x4;

    return output;
}

// Band-Pass Butterworth IIR digital filter, generated using filter_gen.py.
// Sampling rate: 75.0 Hz, frequency: [0.5, 19.5] Hz.
// Filter is order 4, implemented as second-order sections (biquads).
// Reference: 
// https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.butter.html
// https://courses.ideate.cmu.edu/16-223/f2020/Arduino/FilterDemos/filter_gen.py

export const EOGFilter = (input) => {
  let output = input;
  let z1_1 = 0, z2_1 = 0; // filter section state
  let z1_2 = 0, z2_2 = 0; // filter section state
  let z1_3 = 0, z2_3 = 0; // filter section state
  let z1_4 = 0, z2_4 = 0; // filter section state

  // First filter section
  let x1 = output - (0.02977423 * z1_1) - (0.04296318 * z2_1);
  output = (0.09797471 * x1) + (0.19594942 * z1_1) + (0.09797471 * z2_1);
  z2_1 = z1_1;
  z1_1 = x1;

  // Second filter section
  let x2 = output - (0.08383952 * z1_2) - (0.46067709 * z2_2);
  output = (1.00000000 * x2) + (2.00000000 * z1_2) + (1.00000000 * z2_2);
  z2_2 = z1_2;
  z1_2 = x2;

  // Third filter section
  let x3 = output - (-1.92167271 * z1_3) - (0.92347975 * z2_3);
  output = (1.00000000 * x3) + (-2.00000000 * z1_3) + (1.00000000 * z2_3);
  z2_3 = z1_3;
  z1_3 = x3;

  // Fourth filter section
  let x4 = output - (-1.96758891 * z1_4) - (0.96933514 * z2_4);
  output = (1.00000000 * x4) + (-2.00000000 * z1_4) + (1.00000000 * z2_4);
  z2_4 = z1_4;
  z1_4 = x4;

  return output;
}
const duration = 5;
export const sampleRate = 125;
export const readingDuration = duration * 1000;