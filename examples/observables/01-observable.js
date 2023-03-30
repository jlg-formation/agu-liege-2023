const rxjs = require("rxjs");

const { Observable } = rxjs;

const obs = new Observable((subscriber) => {
  subscriber.next(12);
  subscriber.next("qqq");
  subscriber.next({ a: 12 });
  subscriber.error(new Error("oups... error!"));
});

obs.subscribe({
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
