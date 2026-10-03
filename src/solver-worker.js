importScripts('solver.js');
onmessage = e => {
  try { postMessage({ok: true, result: calculate(e.data)}); }
  catch (err) { postMessage({ok: false, error: err.message}); }
};
