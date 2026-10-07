importScripts('sales-recipes.js','solver.js','custom-solver.js','drain-data.js','drain-recipes.js','drain-solver.js');
onmessage = e => {
  try { if(e.data.drainMode)self.DRAIN_PROGRESS=message=>postMessage({progress:message});postMessage({ok: true, result: calculate(e.data)}); }
  catch (err) { postMessage({ok: false, error: err.message}); }
};
