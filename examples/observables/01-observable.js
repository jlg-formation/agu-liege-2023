const rxjs = require("rxjs");

const { Observable, throwError } = rxjs;

const obs = new Observable((subscriber) => {
  subscriber.next(0);
  const timer = setTimeout(() => {
    subscriber.next(1);
    subscriber.complete();
    console.log("fin");
  }, 1000);

  return () => {
    console.log("unsubscribing");
    clearTimeout(timer);
  };
});

const subscription = obs.subscribe({
  next: (x) => {
    console.log("x: ", x);
  },
  complete: () => {
    console.log("complete");
  },
  error: (err) => {
    console.log("err: ", err.message);
  },
});

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
